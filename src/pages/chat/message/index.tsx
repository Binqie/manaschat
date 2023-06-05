import Avatar from "@mui/material/Avatar";
import { IMessage } from "../messages";

export const MessageLeft = ({ message }: { message: IMessage }) => {
  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        flexDirection: "column",
        // border: "1px solid red",
      }}
    >
      <div
        style={{
          color: "black",
          borderRadius: "5px",
          border: "1px solid gray",
          alignSelf: "flex-start",
          padding: "5px",
          backgroundColor: message.color,
        }}
      >
        <div>{message.authorFullname}</div>
        <div>
          <p style={{ color: "black"}}>{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export const MessageRight = ({ message }: { message: IMessage }) => {
  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        flexDirection: "column",
        // border: "1px solid red",
      }}
    >
      <div
        style={{
          color: "black",
          borderRadius: "5px",
          border: "1px solid gray",
          alignSelf: "flex-end",
          padding: "5px",
          backgroundColor: message.color,
        }}
      >
        <div>Сиз</div>
        <div>
          <p style={{ color: "black" }}>{message.message}</p>
        </div>
      </div>
    </div>
  );
};
