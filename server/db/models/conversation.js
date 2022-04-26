const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const User = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (userIds) {
  let table = {};

  await Promise.all(
    userIds.map(async (id) => {
      let user = await User.findByPk(id);
      if (!user) {
        return null;
      }
      let convos = await user.getConversations();
      convos.forEach((convo) => {
        if (table[convo.id]) {
          table[convo.id] = [...table[convo.id], user];
        } else {
          table[convo.id] = [user];
        }
      });
    })
  );
  let conversation = null;

  for (let key in table) {
    if (table[key].length === userIds.length) {
      conversation = await Conversation.findByPk(key);
    }
  }
  return conversation;
};

module.exports = Conversation;

// let conversations = [];
// let table = {};
// //Put all conversations by each user in userIds in an array
// userIds.map(async (id) => {
//   table[id] = true;
//   let data = await User.findByPk(id, { include: Conversation });
//   conversations.push(data.conversations);
// });
// //Loop through conversations, if conversations[i].userId is not one of the userIds, remove it from the array
// for (let i = 0; i < conversations.length; i++) {
//   if (!conversations[i].userId.in(table)) {
//     conversations.splice(i, 1);
//   }
// }

// // return conversation or null
// return conversations[0] || null;
