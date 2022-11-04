import React, { useEffect } from "react"
import ChatCard from "./ChatCard"
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import { common } from "@mui/material/colors";
import {db} from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../../chatContext/AuthContext';
import { UserContext } from "../../chatContext/UserContext";
import Photo from "./jorgemoreno.png";
import { useNavigate } from "react-router-dom";

function ChatMenu() {
    const navigate = useNavigate();
    const currentUser = React.useContext(AuthContext);
    const {dispatch} = React.useContext(UserContext);


    const [chats, setChats] = React.useState<any>([])
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "userChats", currentUser!.uid), (doc : any) => {
            setChats(doc.data());
        });
        return unsubscribe
    }, [currentUser!.uid])
    
    console.log(currentUser!.uid)
    console.log(Object.entries(chats))
    
    const handleSelectChat = (info:any) => {
        dispatch({type: "CHANGE_USER", payload: info})
        navigate("/chat")
    }

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
                {Object.entries(chats)?.sort((a:any ,b:any) => b[1].date - a[1].date).map((chat : any) => (    
                    <div className="flex flex-row h-21 items-center border-b-2 border-b-slate-100 hover:bg-slate-100" key={chat[0]} onClick={() => handleSelectChat(chat[1].userInfo)}>
                        <img
                            src={Photo}
                            alt="Photo"
                            className="max-h-20 max-w-20 mx-2 object-contain shadow rounded-full"
                            />
                        <div className="pt-5 pb-5 h-36 ml-2 flex flex-col justify-evenly items-start">
                            <div className="text-xl font-bold mt-4">
                                {chat[1].userInfo.displayName}
                            </div>
                        <div className="text-sm mb-4">{chat[1].lastMessage?.text}</div>
                        </div>
                    </div>
                ))}              
            </div>
        </div>
    );
}

export default ChatMenu;
