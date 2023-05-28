import { useEffect, useState } from "react";
import styles from "app/styles/chat.style.module.scss";
import { Box, List, ListItem } from "@mui/material";

interface IMessage {
  message: string;
  username: string;
  __createdtime__: number;
}

const Messages = ({ socket }: { socket: any }) => {
  const [messagesRecieved, setMessagesReceived] = useState<IMessage[]>([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data: IMessage) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  function formatDateFromTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <List sx={{ overflow: "auto" }}>
      {messagesRecieved.map((msg, i) => (
        <ListItem className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </ListItem>
      ))}
    </List>
  );
};

export default Messages;
