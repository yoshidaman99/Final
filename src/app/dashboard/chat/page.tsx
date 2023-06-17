'use client'
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from '@/app/context/AuthContext';
import ChatBox from "@/app/components/ChatBox_2";
import SendMessage from "@/app/components/UI/SendMessage_2";
import HeaderInfo from '@/app/components/header_info';

const Chat = () => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.scrollTop = 0;
    }
  }, []);

  return (
    <section className="containerWrap">
      <div className="fixed w-full text-right">
        <HeaderInfo title={'Admin Chat'} />
      </div>
      <div>
        <h1 className='pt-14 text-3xl font-bold text-center underline'>MessageBoard</h1>
        <BrowserRouter>
          <AuthProvider>
            <div className="flex-1 scroll-mt-350 px-8">
              <ChatBox />
            </div>
            <div className="containerWrap">
              <SendMessage />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </section>
  );
};

export default Chat;