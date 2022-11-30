import React, { useRef, useEffect } from "react";

function OwnMessage({ message }: any) {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="OwnMessage mb-2 ml-4 mr-4 mt-2 flex justify-end ">
      <div className="OwnMessageContent h-auto w-auto justify-center rounded-xl bg-fresh-verde-oscuro py-1 px-3 ">
        <p className="my-1 text-sm text-white">{message.text}</p>
      </div>
    </div>
  );
}

export default OwnMessage;
