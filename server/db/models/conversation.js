const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const User = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (userIds) {
  let conversations = await User.findByPk(id, { include: Conversation });
  console.log(conversations);
  return conversations[0];
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
