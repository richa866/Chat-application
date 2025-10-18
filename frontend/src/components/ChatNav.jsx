import { useAuthStore } from "../store/useAuthStore";
import pfp from "../assets/pfp.png";
import { Trash2 ,MoreVertical} from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";

export default function ChatNav({ username, profile, id }) {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
  const { onlineUsers,authUser } = useAuthStore();
  const {clearChat,selectedUser}=useChatStore();
  const isOnline = onlineUsers?.includes(id);

 const handleClearMessage= async () => {
  try {
    console.log(selectedUser?._id);
    await clearChat(id,authUser._id);
  } catch (error) {
    console.error("Failed to clear chat:", error);
  }
 }

  return (
    <div
      className="glass-card relative z-10 px-6 py-4 border-b border-border/30"
      style={{
        backdropFilter: "blur(20px)",
        background: "hsl(235, 20%, 10%)", // very dark purple
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - User info */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border/30">
            <img
              src={profile || pfp}
              alt={username}
              className="w-full h-full object-cover"
            />
            {isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-hsl(235,20%,10%)" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-white font-semibold text-lg">{username}</h2>
            <p className="text-pink-600 text-sm">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-2">
         
          
          <div className="relative" ref={dropdownRef}>
  <button 
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className="p-2 hover:bg-[hsl(235_30%_20%_/_0.3)] rounded-lg transition-colors"
  >
    <MoreVertical className="w-5 h-5 text-[hsl(0_0%_100%)]" />
  </button>
  {isDropdownOpen && (
    
    <div className="absolute right-0 top-full mt-2 w-48 bg-[hsl(240_20%_6%)] border border-[hsl(235_30%_25%)] rounded-lg shadow-lg z-50 overflow-hidden">
      <button
        onClick={() => {
          handleClearMessage();
          setIsDropdownOpen(false);
        }}
        
        className="w-full px-4 py-2 text-left text-[hsl(0_84.2%_60.2%)] hover:bg-[hsl(235_30%_20%_/_0.5)] transition-colors flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Clear all messages
      </button>
    </div>
  )}
</div>
        </div>
      </div>
    </div>
  );
}
