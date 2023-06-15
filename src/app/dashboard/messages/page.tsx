import ChatBox from "@/app/components/ChatBox"
import SendMessage from "@/app/components/UI/SendMessage"
import { AuthProvider } from '@/app/context/AuthContext';
import HeaderInfo from '@/app/components/header_info';

const App = () => {
  return (
    <section className="containerWrap">
    <div className="fixed w-full text-right"><HeaderInfo title={''} bg_color='bg-[#F9DBBB]' text_color='text-[#2E3840]' /></div>
        <div>
        <h1 className='pt-14 text-3xl font-bold text-center underline'>MessageBoard</h1>
        <AuthProvider>
        <div className="flex-1 scroll-mt-350 px-8">
        <ChatBox />
        </div>
        <div  className="containerWrap">
        <SendMessage />
        </div>
        </AuthProvider>
        </div>
    </section>
  );
};

export default App;

