import pfp from "../assets/pfp.png";
import { Brain } from "lucide-react";
import Chatbot from "./Chatbot";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

export default function ChatBubbleSender({ sender, profile, message, sentTime,image }) {
  const {isChatbotOpen ,setIsChatbotOpen}=useChatStore();
  const timeOnly = new Date(sentTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // const [chatOpen, setChatOpen] = useState(false);
  if(message.image){
    console.log(yes)
  }
  return (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2">
      <div className="max-w-2xl flex items-end gap-2">
        {/* Message bubble + sender info */}
        <div className="text-right">
          {/* Username + time + icon row */}
          <div className="flex items-center justify-end gap-1 mb-1 px-2">
            <p className="text-xs text-muted-foreground">
              {sender} • {timeOnly}
            </p>
            <button className="flex items-center"  onClick={() => setIsChatbotOpen(true)}>
              <Brain className="text-white w-4 h-4" />
            </button>
          </div>

          {/* Chat bubble */}
          
            <div
            className={`rounded-2xl ${
              image 
                ? 'p-1 bg-gradient-to-br from-purple-500 to-pink-500 '
                
                : 'px-4 py-3  bg-gradient-to-br from-purple-500 to-pink-500 text-white'
            }`}
          >
            {image && (
                          <div className={message ? 'mb-2' : ''}>
                            <img 
                              src={image} 
                              alt="Shared" 
                              className="rounded-lg max-w-xs w-full h-auto "
                            />
                          </div>
                        )}
            {message && (
                         <p className={`break-words whitespace-pre-wrap  text-white
      ${image 
        ? 'px-4 py-3  bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl' 
        : ''}
      `}>
                            {message}
                          </p>
                        )}
          </div>



        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
          <img
            src={profile || pfp}
            alt={sender}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

     
    </div>
  );
}
