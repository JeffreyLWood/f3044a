import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  bubble: {
    color: '#FFF',
    fontWeight: 'bold',
    backgroundColor: '#3A8DFF',
    borderRadius: 20,
    padding: 5,
    height: 35,
  },
}));

const ChatContent = ({ conversation, unreadCount, setUnreadCount }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadCount >= 1 ? (
        <Typography className={classes.bubble}>{unreadCount}</Typography>
      ) : null}
    </Box>
  );
};

export default ChatContent;
