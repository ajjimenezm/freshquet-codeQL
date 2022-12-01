import React, { useEffect } from "react";
import ChatCard from "./ChatCard";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import { common } from "@mui/material/colors";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../chatContext/AuthContext";
import { UserContext } from "../../chatContext/UserContext";
import Photo from "./logo192.png";
import { useNavigate } from "react-router-dom";

function ChatMenu() {
  const navigate = useNavigate();
  const currentUser = React.useContext(AuthContext);
  const { dispatch } = React.useContext(UserContext);

  const [chats, setChats] = React.useState<any>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "userChats", currentUser!.uid),
      (doc: any) => {
        setChats(doc.data());
      }
    );
    return unsubscribe;
  }, [currentUser!.uid]);

  const handleSelectChat = (info: any) => {
    dispatch({ type: "CHANGE_USER", payload: info });
    navigate("/chat");
  };

  return (
    <div className="chatMenu">
      <div className="chatInfo fixed top-0 left-0 right-0 ml-4 mr-4 mt-10 flex h-10 flex-row items-center justify-center border-b-2">
        <div className="border-b-2 border-black px-10 pb-4 text-[14px] font-bold">
          Chats
        </div>
      </div>
      <div className="chatCards h-[calc(100vh-55px)] overflow-auto pt-20">
        {Object.entries(chats)
          ?.sort((a: any, b: any) => b[1].date - a[1].date)
          .map((chat: any) => (
            <ChatCard
              key={chat[0]}
              lastMessage={chat[1].lastMessage?.text}
              date={chat[1].date}
              userInfo={chat[1].userInfo}
              handleClick={handleSelectChat}
            />
          ))}
      </div>
    </div>
  );
}

export default ChatMenu;
