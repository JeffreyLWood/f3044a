const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const User = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given multiple user Ids

Conversation.findConversation = async function (userIds) {
  let table = {};
  //Make a table where keys are conversation ids and values are user objects
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
  //If a value in table has all of the users in the userIds array then we have a conversation, else return null
  for (let key in table) {
    if (table[key].length === userIds.length) {
      conversation = await Conversation.findByPk(key);
    }
  }
  return conversation;
};

module.exports = Conversation;
