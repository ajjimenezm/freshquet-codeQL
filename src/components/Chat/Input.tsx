import React from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../chatContext/AuthContext";
import { UserContext } from "../../chatContext/UserContext";
import { ReactComponent as BackArrow } from "../../assets/icons/Flecha.svg";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

function Input() {
  const [text, setText] = React.useState<string>("");

  const currentUser = React.useContext(AuthContext);
  const { data } = React.useContext(UserContext);

  const handleSend = async () => {
    setText("");
    if (text != "") {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser!.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser!.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="input w fixed inset-x-0 bottom-0 left-0 right-0 flex h-14 flex-row border-t-2 bg-white px-4">
      <input
        type={"text"}
        placeholder="Envia un mensaje..."
        value={text}
        onKeyDown={handleKeyDown}
        className="round ml-2 mt-1 h-12 w-full justify-center rounded bg-white px-4  focus:outline-none"
        onChange={(e) => setText(e.target.value)}
      />
      <IconButton aria-label="Send message">
        <BackArrow className=" rotate-180" onClick={() => handleSend()} />
      </IconButton>
    </div>
  );
}

export default Input;
