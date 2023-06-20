import React from "react";

interface MessageDate {
  seconds: number;
  nanoseconds: number;
}

interface MessageProps {
  message: {
    uid: string;
    name: string;
    text: string;
    date?: MessageDate;
  };
  currentUser: {
    uid: string;
  };
}

const Message: React.FC<MessageProps> = ({ message, currentUser }) => {


  const timestamp = {
    seconds : message.date?.seconds,
    nanoseconds : message.date?.nanoseconds,
  }
  let formattedDate;
  if (timestamp.seconds !== undefined && timestamp.nanoseconds !== undefined) {
  const dateObject = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  formattedDate = dateObject.toLocaleString();
  }

  return (
        <div className="my-2">
        <div className={`flex ${message.uid === currentUser.uid ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-4 rounded-lg ${message.uid === currentUser.uid ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
            <div className="text-sm font-semibold mb-1">{message.name}</div>
            <div className="text-sm">{message.text}</div>
            <div className={` text-xs mt-2 float-right ${message.uid === currentUser.uid ? " text-slate-100" : "text-gray-600"}`}> {formattedDate}</div>
            </div>
        </div>
        </div>
  );
};

export default Message;