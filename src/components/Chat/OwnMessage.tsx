import React, {useRef, useEffect} from "react";

function OwnMessage({message}:any) {
    
    const ref = useRef<any>()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message]);

    return (
        <div className="OwnMessage flex justify-end mb-2 ml-4 mr-4 mt-2 ">
            <div className="OwnMessageContent rounded-xl py-1 px-3 bg-emerald-100 hover:bg-emerald-200 h-auto w-auto justify-center">
                <p className="text-sm mt-1">{message.text}</p>
            </div>
        </div>
    );
}

export default OwnMessage;
