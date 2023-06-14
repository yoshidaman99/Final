"use client"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, FormEvent } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { db } from '@/firebase/firebaseApp';
import { Cookies } from 'react-cookie';

const SendMessage = (): JSX.Element => {
const [value, setValue] = useState("");
const { currentUser } = UserAuth();

const handleSendMessage = async (e: FormEvent) => {

const cookies = new Cookies();

function getUserNameFromArray(cookies: any): any {
    for (const key in cookies) {
      if (key === 'user' && cookies.hasOwnProperty(key)) {
        const user = cookies[key];
        if (user.hasOwnProperty('name')) {
          console.log(user.name);
          return user.name;
        }
      }
    }
    return null;
}

e.preventDefault();
if (value.trim() === "") {
    alert("Enter valid message!");
    return;
  }
  
  try {

    const updatedName = getUserNameFromArray(cookies) as string;

    const { uid, displayName, photoURL } = currentUser;
    await addDoc(collection(db, "messages"), {
      text: value,
      name: displayName,
      createdAt: serverTimestamp(),
      uid,
    });
  } catch (error) {
    console.log(error);
  }
  setValue("");

};

return (
<div className="bg-gray-200 fixed bottom-12 py-8 shadow-lg left-0 right-0 containerWrap z-0">
  <form onSubmit={handleSendMessage} className="px-2 containerWrap flex pl-96">
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-9 text-black focus:outline-none bg-gray-100 px-3 rounded-r-none flex-grow"
      type="text"
    />
    <button
      type="submit"
      className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm"
    >
      Send
    </button>
  </form>
</div>
);
};

export default SendMessage;