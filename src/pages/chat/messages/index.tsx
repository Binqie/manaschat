import { useEffect, useState } from "react";
import styles from "app/styles/chat.style.module.scss";
import { Box, List, ListItem } from "@mui/material";
import { GetUserIdByCookies } from "shared/lib/getUserIdByCookies";
import { MessageLeft, MessageRight } from "../message";

export interface IMessage {
  authorFullname: string;
  authorId: number;
  chatId: string;
  color: string;
  // createdAt: string;
  // id: number;
  message: string;
}

const Messages = ({ messages }: { messages: IMessage[] }) => {
  function formatDate(d: string) {
    const date = new Date(d);
    return date.toLocaleString();
  }

  console.log("messages component", messages);

  return (
    <List sx={{ overflow: "auto" }}>
      {messages?.map(
        (message, index) =>
          message.authorId === GetUserIdByCookies() ? (
            <MessageRight message={message} key={index} />
          ) : (
            <MessageLeft message={message} key={index} />
          )
        // <ListItem key={i}>
        //   <div style={{ display: "flex", justifyContent: "space-between" }}>
        //     <span style={{ color: msg.color }}>{msg.authorFullname}</span>
        //     {/* <span className={styles.msgMeta}>{formatDate(msg.createdAt)}</span> */}
        //   </div>
        //   <p>{msg.message}</p>
        //   <br />
        // </ListItem>
      )}
    </List>
  );
};

export default Messages;
