import React from 'react';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
}));

const Chat = ({ conversation, setActiveChat, setConversations }) => {
  const classes = useStyles();
  const { otherUser } = conversation;
  let [unreadCount, setUnreadCount] = useState(null);

  useEffect(() => {
    setUnreadCount(conversation.unreadCount);
  }, [conversation.unreadCount]);

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);

    setConversations((prev) =>
      prev.map((convo) => {
        if (convo.id === conversation.id) {
          const convoCopy = { ...convo };
          convoCopy.unreadCount = 0;
          return convoCopy;
        } else {
          return convo;
        }
      })
    );
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent
        conversation={conversation}
        unreadCount={unreadCount}
        setUnreadCount={setUnreadCount}
      />
    </Box>
  );
};

export default Chat;
