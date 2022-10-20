import React from 'react';
import Photo from "./jorgemoreno.png";

function ChatCard() {
    return (
        <div className="flex flex-row h-21 items-center border-b-2 border-b-slate-100 hover:bg-slate-100">
            <img
                src={Photo}
                alt="Photo"
                className="max-h-20 max-w-20 mx-2 object-contain shadow rounded-full"
            />
            <div className="pt-5 pb-5 h-36 ml-2 flex flex-col justify-evenly items-start">
                <div className="text-xl font-bold mt-4">
                    Jorge Moreno Latorre
                </div>
                <div className="text-sm mb-4">{"Pasa foto de tus pies"}</div>
            </div>
        </div>
    );
}

export default ChatCard;