"use client"
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useState, FormEvent } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { db } from '@/firebase/firebaseApp';
import { Cookies } from 'react-cookie';
import { useLocation } from "react-router-dom";


function checkBusinessHours( role : string ) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();

  if( role != 'student'){
    return true;
  }

  // Check if it's Saturday or Sunday
  if (currentDay === 0 || currentDay === 6) {
    return false;
  }

  // Check if it's before 7 AM or after 5 PM
  if (currentHour < 7 || currentHour >= 17) {
    return false;
  }

 

  // It's within business hours
  return true;
}

function getUserNameFromArray(cookies: any): any {
  for (const key in cookies) {
    if (key === 'user' && cookies.hasOwnProperty(key)) {
      const user = cookies[key];
      if (user.hasOwnProperty('name')) {
        return user.name;
      }
    }
  }
  return null;
}

function getUserRoleFromArray(cookies: any): any {
  for (const key in cookies) {
    if (key === 'user' && cookies.hasOwnProperty(key)) {
      const user = cookies[key];
      if (user.hasOwnProperty('role')) {
        return user.role;
      }
    }
  }
  return null;
}


const SendMessage = (): JSX.Element => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();
  const location = useLocation();

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Enter valid message!");
      return;
}



    try {
      const cookies = new Cookies();

      let updateRole = getUserRoleFromArray(cookies) as string;
      const searchParams = new URLSearchParams(location.search);
      const requestId = searchParams.get("id");

      if (requestId) {
        try {
          const adminChatQuery = query(collection(db, "admin_chat"), where("requestId", "==", requestId));
          const adminChatSnapshot = await getDocs(adminChatQuery);

          if (!adminChatSnapshot.empty) {
            const adminChatDoc = adminChatSnapshot.docs[0];
            const adminChatId = adminChatDoc.id;

            // Create a reference to the child collection
            const childCollectionRef = collection(db, "admin_chat", adminChatId, "Chatlog");

            const { uid, displayName } = currentUser;
            await addDoc(childCollectionRef, {
              message: value,
              name: displayName,
              createdAt: serverTimestamp(),
              user: uid,
            });

            if(!checkBusinessHours(updateRole)){
              await addDoc(childCollectionRef, {
                message: "Hello! This is an automated message. We'll tackle your question or concern our hours: Monday to Friday, 9am - 5pm. Expect a reply within 24 hours. Thank you!",
                name: displayName,
                createdAt: serverTimestamp(),
                user: 'System',
              });
            }
 

            const notification = {
                id: uid,
                name: displayName,
                date: serverTimestamp(),
                view: false,
            };

            // Specify the collection where you want to add the document
            const collectionRef = collection(db, "notification");

            // Add the document to the collection
            const docRef = await addDoc(collectionRef, notification);



            window.location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("No requestId found in the URL query parameter");
      }
    } catch (error) {
      console.log(error);
    }



    setValue("");
  };

  return (
    <div className="bg-gray-200 fixed bottom-12 py-8 px-4 shadow-lg left-0 right-0 containerWrap z-0">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex pl-96">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-9 text-black focus:outline-none bg-gray-100 px-3 rounded-r-none flex-grow"
          type="text"
        />
        <button
          type="submit"
          className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm hover:bg-orange-300 hover:text-slate-900 hover:font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;