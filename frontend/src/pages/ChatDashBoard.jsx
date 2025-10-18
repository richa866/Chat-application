import ChatList from "../components/ChatList.jsx";
import ChatSec from "../components/ChatSec.jsx";
import NoUser from "../components/nouser.jsx";
import { useChatStore } from "../store/useChatStore.js";
import backgroundImage from "../assets/backgroundImage.png"
import Chatbot from "../components/Chatbot.jsx";
export default function ChatDashBoard(){
    const {selectedUser,setIsChatbotOpen,isChatbotOpen}=useChatStore();
    return(
 <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backdropFilter: "blur(30px)",
        background: "hsl(235, 20%, 10%)", // very dark purple
      }}
    >
      {/* Gradient blur backgrounds inlined */}
      <div
        style={{
          position: "fixed",
          top: "5rem",
          left: "2.5rem",
          width: "24rem",
          height: "24rem",
          background: "radial-gradient(circle, hsl(270, 70%, 50%) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.3,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "5rem",
          right: "2.5rem",
          width: "24rem",
          height: "24rem",
          background: "radial-gradient(circle, hsl(320, 85%, 60%) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.25,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "24rem",
          height: "24rem",
          background: "radial-gradient(circle, hsl(220, 80%, 55%) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.2,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex max-w-screen h-screen">
        <div className="w-1/4">
          <ChatList />
        </div>
        <div className="w-3/4">
          {selectedUser ? (
            <ChatSec/>
          ) : (
            <NoUser />
          )}
        </div>
      </div>
      {isChatbotOpen && 
      <Chatbot/>}
    </div>







    )

}