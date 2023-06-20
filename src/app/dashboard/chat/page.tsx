'use client'
import { AuthProvider } from "@/app/context/AuthContext";
import ChatBox from "@/app/components/ChatBox_2";
import SendMessage from "@/app/components/UI/SendMessage_2";
import HeaderInfo from "@/app/components/header_info";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

const Chat = () => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>

    <div>
      <div className="fixed w-full text-right">
        <HeaderInfo title={"Admin Chat"} />
      </div>
      <div>
        <h1 className="pt-14 text-3xl font-bold text-center underline">
          MessageBoard
        </h1>
        {typeof document !== "undefined" && (
          <BrowserRouter>
            <AuthProvider>
              <div className="flex-1 scroll-mt-350 px-8 pb-24">
              {isClient && 
                <ChatBox />
              }  
              </div>
              <div className="containerWrap">
                <SendMessage />
              </div>
            </AuthProvider>
          </BrowserRouter>
        )}
      </div>
      </div>

    </>
  );
};

export default Chat;