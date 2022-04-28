const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations
User.belongsToMany(Conversation, { through: "conversations_users" });
Conversation.belongsToMany(User, { through: "conversations_users" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
};
