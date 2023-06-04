import { useEffect, useState } from "react";
import styles from "app/styles/chat.style.module.scss";
import { Box, List, ListItem } from "@mui/material";

interface IMessage {
  authorFullname: string;
  authorId: number;
  chatId: string;
  color: string;
  createdAt: string;
  id: number;
  message: string;
}

const Messages = ({ messages }: { messages: IMessage[] }) => {
  // const [messagesRecieved, setMessagesReceived] =
  //   useState<IMessage[]>(messages);

  function formatDate(d: string) {
    const date = new Date(d);
    return date.toLocaleString();
  }

  console.log("messages component", messages);
  // console.log("messages received", messagesRecieved);

  return (
    <List sx={{ overflow: "auto" }}>
      {messages?.map((msg, i) => (
        <ListItem className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta} style={{ color: msg.color }}>
              {msg.authorFullname}
            </span>
            <span className={styles.msgMeta}>{formatDate(msg.createdAt)}</span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </ListItem>
      ))}
    </List>
  );
};

export default Messages;
