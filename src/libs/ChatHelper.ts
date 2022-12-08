/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

const navigateChat = async (
  sellerName: string,
  text: string,
  currentUser: any
) => {
  let userChat: any;
  let combinedId = "";
  let q = query(
    collection(db, "users"),
    where("displayName", "==", sellerName)
  );
  let querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    userChat = doc.id;

    const uid = currentUser!.uid;
    const newId = uid > doc.id! ? uid + doc.id : doc.id + uid;
    combinedId = newId;
  });

  console.log(combinedId);
  let exists = false;
  q = query(collection(db, "chats"));
  querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.id === combinedId) {
      exists = true;
      sendMessage(text, currentUser, combinedId, userChat);
    }
  });
  // const res = await getDoc(doc(db, "chats", combinedId!));
  if (!exists) {
    await setDoc(doc(db, "chats", combinedId!), { messages: [] });

    await updateDoc(doc(db, "userChats", currentUser!.uid), {
      [combinedId! + ".userInfo"]: {
        uid: userChat,
        displayName: sellerName,
      },
      [combinedId! + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", userChat!), {
      [combinedId! + ".userInfo"]: {
        uid: currentUser!.uid,
        displayName: currentUser!.displayName,
      },
      [combinedId! + ".date"]: serverTimestamp(),
    });

    await sendMessage(text, currentUser, combinedId, userChat);
  }
};

const sendMessage = async (
  text: string,
  currentUser: any,
  combinedId: string,
  userChat: any
) => {
  console.log(text);
  if (text != "") {
    await updateDoc(doc(db, "chats", combinedId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser!.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser!.uid), {
      [combinedId + ".lastMessage"]: {
        text,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", userChat), {
      [combinedId + ".lastMessage"]: {
        text,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });
  }
};

async function sendMessageTo(
  text: string,
  sellerName: string,
  currentUser: any
) {
  await navigateChat(sellerName, text, currentUser);
  return true;
}

export default {
  sendMessageTo,
};
