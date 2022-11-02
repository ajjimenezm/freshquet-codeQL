import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { AuthContext } from '../../chatContext/AuthContext';
import { UserContext } from '../../chatContext/UserContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuid } from 'uuid';

function Input() {
    const [text, setText] = React.useState<string>("");
    const [inputText, setInputText] = React.useState<string>("");

    const currentUser = React.useContext(AuthContext);
    const {data} = React.useContext(UserContext);

    
    const handleSend = async () => {
        setText("");
        if (text != ""){
            await updateDoc(doc(db, "chats", data.chatId),{
                messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser!.uid,
                date: Timestamp.now()  
                })
            })

            await updateDoc(doc(db, "userChats", currentUser!.uid),{
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp(),
            })

            
            await updateDoc(doc(db, "userChats", data.user.uid),{
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp(),
            })
        }
        setText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === "Enter"){
            handleSend();
        }
    }



    return (
        <div className="input h-14 bg-emerald-100 border-t-2 w flex flex-row inset-x-0 fixed bottom-14 left-0 right-0 ">
            <input type={"text"} placeholder='Send a message...' value={text} onKeyDown={handleKeyDown} className="w-full ml-2 mt-1 round h-12 bg-emerald-100 border-2 border-emerald-100 focus:outline-none focus:border-emerald-300 hover:border-emerald-300 px-4 justify-center rounded-3xl" onChange={e=>setText(e.target.value)}/>
            <IconButton aria-label="Send message" >
                <SendIcon onClick={()=> handleSend()}/>
            </IconButton>
        </div>
    );
}

export default Input;
