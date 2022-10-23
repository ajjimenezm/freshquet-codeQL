import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

function Input() {
    return (
        <div className="input h-14 bg-emerald-100 border-t-2 w flex flex-row inset-x-0 fixed bottom-14 left-0 right-0 ">
            <input type={"text"} placeholder='Send a message...' className="w-full ml-2 mt-1 round h-12 bg-emerald-100 border-2 border-emerald-100 focus:outline-none focus:border-emerald-300 hover:border-emerald-300 px-4 justify-center rounded-3xl"/>
            <IconButton aria-label="Send message" >
                <SendIcon />
            </IconButton>
        </div>
    );
}

export default Input;
