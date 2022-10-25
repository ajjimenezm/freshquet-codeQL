import React from "react";
import Message from "./Message";
import OwnMessage from "./OwnMessage";

function Messages() {
    return (
        <div className="messages bg-slate-200  h-[calc(100vh-205px)] overflow-auto">
            <Message/>
            <OwnMessage/>
            <Message/>
            <OwnMessage/>
            <Message/>
            <OwnMessage/>
            <Message/>
            <OwnMessage/>
            <Message/>
            <OwnMessage/>
            <Message/>
            <OwnMessage/>
            <Message/>
            <OwnMessage/>
            <Message/>
            <OwnMessage/>
        </div>
    );
}

export default Messages;
