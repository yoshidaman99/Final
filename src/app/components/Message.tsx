import React from "react";

interface MessageProps {
  message: {
    uid: string;
    name: string;
    text: string;
  };
  currentUser: {
    uid: string;
  };
}

const Message: React.FC<MessageProps> = ({ message, currentUser }) => {
    console.log(message.uid)
    console.log(currentUser.uid);
  return (
        <div className="my-2">
        <div className={`flex ${message.uid === currentUser.uid ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-4 rounded-lg ${message.uid === currentUser.uid ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
            <div className="text-sm font-semibold mb-1">{message.name}</div>
            <div className="text-sm">{message.text}</div>
            </div>
        </div>
        </div>
  );
};

export default Message;