import pfp from "../assets/pfp.png";
import { Brain } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

export default function ChatBubbleRev({ receiver, profile, message, sentTime,image }) {
  const { isChatbotOpen, setIsChatbotOpen } = useChatStore();
  const timeOnly = new Date(sentTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Test with a hardcoded image
  const testImage = {pfp};

  return (
    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
      <div className="max-w-2xl flex items-end gap-2">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
          <img
            src={profile || pfp}
            alt={receiver}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = pfp; }}
          />
        </div>

        {/* Message bubble + receiver info */}
        <div className="text-left">
          {/* Receiver name + time + brain icon */}
          <div className="flex items-center gap-1 mb-1 px-2">
            <p className="text-xs text-gray-400">
              {receiver} • {timeOnly}
            </p>
            <button
              className="flex items-center"
              onClick={() => setIsChatbotOpen(true)}
            >
              <Brain className="text-white w-4 h-4" />
            </button>
          </div>

          {/* Chat bubble */}
          <div
            className={`rounded-2xl ${
              image 
                ? 'p-1 bg-[hsl(235,27%,26%)] '
                
                : 'px-4 py-3 bg-[hsl(235,27%,26%)] text-[hsl(0,0%,100%)]'
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
        ? 'px-4 py-3 bg-[hsl(235,27%,26%)] text-[hsl(0, 0%, 100%)] rounded-2xl' 
        : ''}
      `}>
                            {message}
                          </p>
                        )}
          </div>
        </div>
      </div>
    </div>
  );
}