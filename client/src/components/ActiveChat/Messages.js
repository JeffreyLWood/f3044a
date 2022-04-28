import React from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';
import { useEffect, useState } from 'react';
const Messages = (props) => {
  const { messages, otherUser, userId, sendReadReceipt, conversation } = props;

  let [mostRecentSeenId, setMostRecentSeenId] = useState(null);

  useEffect(() => {
    setMostRecentSeenId(conversation.mostRecentSeenId);
    let lastMessage = messages[messages.length - 1];
    if (!lastMessage?.seen) {
      sendReadReceipt({
        conversationId: messages[0]?.conversationId,
        userId: userId,
      });
    }
  });

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            id={message.id}
            text={message.text}
            time={time}
            mostRecentSeenId={mostRecentSeenId}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
