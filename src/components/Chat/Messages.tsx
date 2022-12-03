import React, { useEffect } from "react";
import Message from "./Message";
import OwnMessage from "./OwnMessage";
import { UserContext } from "../../chatContext/UserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../chatContext/AuthContext";

function Messages() {
  const [messages, setMessages] = React.useState<any>([]);

  const { data } = React.useContext(UserContext);
  const currentUser = React.useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub;
    };
  }, [data.chatId]);

  return (
    <div className="messages z-30 h-full overflow-auto pb-20">
      {messages.map((m: any) =>
        m.senderId === currentUser!.uid ? (
          <OwnMessage message={m} key={m.id} />
        ) : (
          <Message message={m} key={m.id} />
        )
      )}
    </div>
  );
}

export default Messages;
