import React, { useEffect } from "react"
import ChatCard from "./ChatCard"
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import { common } from "@mui/material/colors";
import {db} from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../../chatContext/AuthContext';

function ChatMenu() {
    const currentUser = React.useContext(AuthContext);

    const [chats, setChats] = React.useState<any>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "userChats", currentUser!.uid), (doc) => {
            setChats(doc.data())
        });
        return unsubscribe
    }, [currentUser!.uid])
    
    console.log(currentUser!.uid)
    console.log(Object.entries(chats))

    return (
        <div className="chatMenu">
            <div className="chatInfo h-24 flex flex-row border-b-2 bg-emerald-100 items-center justify-center fixed top-0 left-0 right-0">
                <IconButton aria-label="" className="justify-center">
                    <MailIcon/>
                </IconButton>
                <div className="text-xl font-bold">
                    Chats
                </div>
            </div>
            <div className="chatCards pt-20 h-[calc(100vh-55px)] overflow-auto">              
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
            </div>
        </div>
    );
}

export default ChatMenu;
