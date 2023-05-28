import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { MdSend } from "react-icons/md";
import Button from "@mui/material/Button/Button";

export const TextInput = ({
  sendMessage,
}: {
  sendMessage(message: string): void;
}) => {
  const [message, setMessage] = useState<string>("");
  return (
    <>
      <TextField
        id="standard-text"
        label="Кат"
        sx={{ width: "100%", border: "none", borderColor: "transparent" }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        onClick={() => sendMessage(message)}
        variant="contained"
        color="primary"
      >
        <MdSend />
      </Button>
    </>
  );
};
