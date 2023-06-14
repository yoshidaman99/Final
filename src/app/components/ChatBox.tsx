'use client'
import Message from "@/app/components/Message";
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from '@/firebase/firebaseApp';
import { useCookies } from "react-cookie";


const ChatBox = (): JSX.Element => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<{ id: string; createdAt: any; content: string; name: string }[]>([]);
    const [userID, setUserID] = useState('');

    const [cookies] : any =  useCookies(["cookies"]);
  
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(scrollToBottom, [messages]);
  
    useEffect(() => {
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt"),
        limit(50)
      );

      const { id } = cookies.user;

      setUserID(id);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages: { id: string; createdAt: any; content: string; name: string }[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const { id = doc.get('uid'), createdAt = doc.get('createdAt'), content = doc.get('text'), name = doc.get('name') } = data;
          messages.push({ id, createdAt, content, name });
        });
        setMessages(messages);
      });
  
      return () => unsubscribe();
    }, [cookies.user]); // Include cookies.user in the dependency array
  
    return (
        <div className="pb-44 pt-20 containerWrap">
          {messages.map((message) => (
            <Message
                  key={message.id}
                  message={{
                      uid: message.id,
                      name: message.name,
                      text: message.content,
                  }} currentUser={{
                      uid: userID
                  }}            />
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      );
    };
    
export default ChatBox;