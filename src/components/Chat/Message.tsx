import React from "react";

function Message() {
    return (
        <div className="message flex mb-2 ml-4 mr-4 mt-2 ">
            <div className="messageContent rounded-xl py-1 px-3 bg-white hover:bg-slate-100 h-auto w-auto justify-center">
                <p className="text-sm mt-1">Hello</p>
            </div>
        </div>
    );
}

export default Message;