import React from "react";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import Photo from "./jorgemoreno.png";
import Messages from "./Messages";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../chatContext/UserContext";

function Chat() {
    const navigate = useNavigate();
    const {data}  = React.useContext(UserContext);
    return (
        <div className="chat">
            <div className="chatInfo h-24 flex flex-row items-center border-b-2 bg-emerald-100  justify-center">
                <IconButton aria-label="Back" className="justify-start" onClick={() =>navigate("/chatmenu")}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <img src={Photo} alt="Photo" className="max-h-20 max-w-20 mx-2 object-contain shadow rounded-full"/>
                <div className="text-xl font-bold">
                    {data.user?.displayName}
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    );
}

export default Chat;
