'use client'
'use client'
import { useEffect } from "react";
import  { StaticRouter }  from "react-router-dom/server";
import { AuthProvider } from '@/app/context/AuthContext';
import ChatBox from "@/app/components/ChatBox_2";
import SendMessage from "@/app/components/UI/SendMessage_2";
import HeaderInfo from '@/app/components/header_info';

const Chat = (req : any ) => {
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
        <StaticRouter location={req.url}>
          <AuthProvider>
            <div className="flex-1 scroll-mt-350 px-8">
              <ChatBox />
            </div>
            <div className="containerWrap">
              <SendMessage />
            </div>
          </AuthProvider>
        </StaticRouter>
      </div>
    </section>
  );
};

export default Chat;