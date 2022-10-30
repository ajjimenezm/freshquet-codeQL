import React from "react";
import Message from "./Message";
import OwnMessage from "./OwnMessage";
import { UserContext } from "../../chatContext/UserContext";

function Messages() {

    const {data}  = React.useContext(UserContext);

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
