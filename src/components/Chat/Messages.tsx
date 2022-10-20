import React from "react";
import Message from "./Message";
import OwnMessage from "./OwnMessage";

function Messages() {
    return (
        <div className="messages bg-slate-200 h-[calc(100%-theme(space.14))] overflow-scroll">
            <Message/>
            <OwnMessage/>
            <Message/>
            <OwnMessage/>
        </div>
    );
}

export default Messages;
