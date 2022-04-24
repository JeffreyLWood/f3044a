const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (userIds) {
  const conversations = await User.findOne({
    where: { id: [userIds], include: Conversation },
  });

  let table = {};
  let numberOfUsers = userIds.length;

  const findConversation = (userIds) => {
    for (let i = 0; i < conversations.length; i++) {
      if (userIds[userIds.length - 1] === conversations[i].userId) {
        table[conversations.id] = conversations[i].userId;
      }
      if (table[conversations[i].id].length === numberOfUsers) {
        return table[conversations.id];
      } else {
        userIds.splice(userIds.length - 1, 1);
        findConversation(userIds);
      }
    }
  };

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;

// [username: 'jeff', conversations: [{id:1, userId:1}, {id:1, userId: 5}, {id:1, userId: 6}, {id:2, userId: 1}]
