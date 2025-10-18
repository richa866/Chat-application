import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const ChatBubble = ({ message }) => {
  const { text, sender, timestamp, isOutgoing, avatar } = message;

  return (
    <div className={`flex w-full mb-4 ${isOutgoing ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-xs lg:max-w-md ${
          isOutgoing ? "flex-row-reverse space-x-reverse space-x-2" : "flex-row space-x-2"
        } items-end`}
      >
        {/* Avatar */}
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={avatar} alt={sender} />
          <AvatarFallback className="text-xs bg-gray-700 text-gray-300">
            {sender ? sender.charAt(0).toUpperCase() : "?"}
          </AvatarFallback>
        </Avatar>

        {/* Message Container */}
        <div className={`flex flex-col ${isOutgoing ? "items-end" : "items-start"} space-y-1`}>
          {/* Sender Name */}
          <span
            className={`text-sm font-semibold ${
              isOutgoing ? "text-gray-300 text-right" : "text-gray-300 text-left"
            }`}
          >
            {sender}
          </span>

          {/* Chat Bubble */}
          <div
            className={`rounded-2xl p-3 px-4 transition-transform duration-200 hover:scale-[1.02] cursor-pointer ${
              isOutgoing
                ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                : "bg-gray-700 text-gray-100 border border-gray-600"
            }`}
          >
            <p className="text-sm leading-relaxed">{text}</p>
          </div>

          {/* Timestamp */}
          <span className="text-xs text-gray-500 px-1">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};


// ChatBubble Demo Component
// const ChatBubbleDemo = () => {
//   return (
//     <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 min-h-screen">
//       <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-700/50 p-6">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-white">Chat Messages</h2>
//           <p className="text-gray-400 text-sm mt-1">
//             Responsive chat bubbles with dreamy aesthetics
//           </p>
//         </div>

//         {/* Render Messages */}
//         <div className="space-y-2">
//           {sampleMessages.map((message) => (
//             <ChatBubble key={message.id} message={message} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export default ChatBubble;
