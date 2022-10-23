import React from "react"
import ChatCard from "./ChatCard"

function ChatCards() {
    return (
        <div className="chatCards h-[calc(100vh-55px)] overflow-auto">
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
                <ChatCard/>
            </div>
    );
}

export default ChatCards;