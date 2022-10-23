import React from "react"
import ChatCard from "./ChatCard"
import MailIcon from '@mui/icons-material/Mail';
import Icon from '@mui/material/Icon';
import ChatCards from "./ChatCards";

function ChatMenu() {
    return (
        <div className="chatMenu">
            <div className="chatInfo h-24 flex flex-row items-center border-b-2 bg-emerald-100  justify-center fixed top-0 left-0 right-0">
                <Icon aria-label="Back" className="justify-start">
                    <MailIcon />
                </Icon>
                <div className="text-xl font-bold">
                    Chats
                </div>
            </div>
            <ChatCards/>
        </div>
    );
}

export default ChatMenu;
