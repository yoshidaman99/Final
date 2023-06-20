import Message from "@/app/components/Message";
import { collection, query, onSnapshot, orderBy, limit, getDocs, where, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "@/firebase/firebaseApp";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

function getUserIDFromArray(cookies: any): any {
  for (const key in cookies) {
    if (key === 'user' && cookies.hasOwnProperty(key)) {
      const user = cookies[key];
      if (user.hasOwnProperty('id')) {
        return user.id;
      }
    }
  }
  return null;
}

const ChatBox = (): JSX.Element => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ user: string; createdAt: any; message: string; name: string }[]>([]);
  const [userID, setUserID] = useState("");

  const [cookies]: any = useCookies(["cookies"]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestId = searchParams.get("id");

  const fetchChatlog = async (requestId: string | null) => {
    if (requestId) {
      try {
        const adminChatQuery = query(collection(db, "admin_chat"), where("requestId", "==", requestId), where("archive", "==", false));
        const adminChatSnapshot = await getDocs(adminChatQuery);

        if (!adminChatSnapshot.empty) {
          const adminChatDoc = adminChatSnapshot.docs[0];
          const adminChatId = adminChatDoc.id;

          const chatlogCollectionRef = collection(db, "admin_chat", adminChatId, "Chatlog");
          const chatlogSnapshot = await getDocs(query(chatlogCollectionRef, orderBy('createdAt')));

          const chatlogData: { user: string; createdAt: any; message: string; name: string }[] = [];
          chatlogSnapshot.forEach((doc) => {
            const data = doc.data();
            const { user, createdAt, message, name } = data;
            chatlogData.push({ user, createdAt, message, name });
          });

          setMessages(chatlogData);
        } else {
          console.log("No admin chat found for the provided requestId");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No requestId found in the URL query parameter");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let id = getUserIDFromArray(cookies);
    setUserID(id);
    fetchChatlog(requestId);
  }, [requestId, cookies]); // Include 'cookies' in the dependency array

  useEffect(scrollToBottom, [messages]);

  return (
    <>
      {messages.map((message) => (
        <Message key={message.user} message={{ uid: message.user, name: message.name, text: message.message, date: message.createdAt }} currentUser={{ uid: userID }} />
      ))}
      <div ref={messagesEndRef}></div>
    </>
  );
};

export default ChatBox;