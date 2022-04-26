import React from 'react';
import { Box, Typography, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  unreadPreviewText: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: -0.17,
  },
  bubble: {
    color: '#FFF',
    fontWeight: 'bold',
    backgroundColor: '#3A8DFF',
    borderRadius: 20,
    padding: 10,
  },
}));

const ChatContent = ({ conversation, unreadCount }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            unreadCount >= 1 ? classes.unreadPreviewText : classes.previewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      {unreadCount >= 1 ? (
        <Badge className={classes.bubble}>{unreadCount}</Badge>
      ) : null}
    </Box>
  );
};

export default ChatContent;
