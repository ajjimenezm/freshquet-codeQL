import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import IconButton from "@mui/material/IconButton";
import Photo from "./logo192.png";
import Messages from "./Messages";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../chatContext/UserContext";

function Chat() {
  const navigate = useNavigate();
  const { data } = React.useContext(UserContext);
  return (
    <div className="chat">
      <div className="chatInfo flex h-24 flex-row items-center justify-center border-b-2  bg-emerald-100">
        <IconButton
          aria-label="Back"
          className="justify-start"
          onClick={() => navigate("/chatmenu")}
        >
          <ArrowBackOutlinedIcon />
        </IconButton>
        <img
          src={Photo}
          alt="Photo"
          className="max-w-20 mx-2 max-h-20 rounded-full object-contain shadow"
        />
        <div className="text-xl font-bold">{data.user?.displayName}</div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
