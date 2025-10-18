import { useEffect, useRef } from "react";
import ChatBubbleSender from "../components/ChatBubble.jsx";
import ChatBubbleRev from "../components/ChatBubRec.jsx";
import ChatNav from "../components/ChatNav.jsx"
import ChatTextBar from "../components/ChatTextBar.jsx";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import backgroundImage from "../assets/backgroundImage.png"



// export default function ChatSec(){
//     const{selectedUser,isMessagesLoading,getMessages,messages,sendMessage,subscribeMessages,unsubscribeMessages}= useChatStore();
//     const{authUser,incomingCall}=useAuthStore();
//     const endref=useRef(null);
//     const messageEndRef=useRef(null);

// useEffect(()=>{
//   if(messageEndRef.current && messages){
// messageEndRef.current.scrollIntoView({behavior:"smooth"})}
// },[messages])

//     useEffect(()=>{
//         endref.current?.scrollIntoView();
//     })
// useEffect(() => {
//   if (selectedUser?._id) {
//     getMessages(selectedUser._id);
//     subscribeMessages();
//     return ()=> unsubscribeMessages();
//   }
// }, [selectedUser?._id, getMessages,subscribeMessages,unsubscribeMessages]);
// //whenever the selected ID changes i will run this useeffect


//     if(isMessagesLoading){
//         return <div>LOADING..</div>
//     }
//      return (
//     <div
//       className="relative flex-1 flex flex-col h-screen w-full overflow-hidden"
//     >

//       <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>

     
//       <div className="relative z-10 flex flex-col h-full bg-white/8 backdrop-blur-xl border border-white/20 shadow-2xl">
//         <div className="border-b border-white/30 shadow-lg">
//         <ChatNav username={selectedUser?.username} profile={selectedUser?.profilePic} id={selectedUser?._id}/>
//         </div>

//         {/* Messages area */}
//         <div ref={messageEndRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
//           {messages.length === 0 ? (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-white/60 text-lg">No messages yet</p>
//             </div>
//           ) : (
//             messages.map((message) =>
//               message.senderId.toString() === authUser._id ? (
//                 <ChatBubbleSender
//                   key={message._id}
//                   sender={authUser?.username}
//                   profile={authUser?.profilePic}
//                   message={message.text}
//                   sentTime={message.createdAt}
//                 />
//               ) : (
//                 <ChatBubbleRev
//                   key={message._id}
//                   receiver={selectedUser?.username}
//                   profile={selectedUser?.profilePic}
//                   message={message.text}
//                   sentTime={message.createdAt}
//                 />
//               ),
//             )
//           )}
//         </div>
 

//         <div ref={endref}></div>

//         {/* Input bar with glassmorphism */}
//         <ChatTextBar />
//       </div>
      
//     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
//       <VideoCall targetUserId={selectedUser?._id} />
//     </div>

//     </div>
//   )
// //     return(
// //         <div className="flex-1 flex flex-col  h-screen w-full">
            
            


            
// //           <div ref={messageEndRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
// //   {messages.length === 0 ? (
// //     <p>No messages yet</p>
// //   ) : (
// //     messages.map((message) =>
// //       message.senderId.toString() === authUser._id ? (
// //         <ChatBubbleSender
// //           key={message._id}
// //           sender={authUser?.username}
// //           profile={authUser?.profilePic}
// //           message={message.text}
// //           sentTime={message.createdAt}
          
// //         />
// //       ) : (
// //         <ChatBubbleRev
// //           key={message._id}
// //           receiver={selectedUser?.username}
// //           profile={selectedUser?.profilePic}
// //           message={message.text}
// //           sentTime={message.createdAt}
          
// //         />
// //       )
// //     )
// //   )}
// // </div>

// //             <div ref={endref}></div>
            
// //                 <ChatTextBar/>
            
// //         </div>
// //     );
// }
export default function ChatSec() {
  const {
    selectedUser,
    isMessagesLoading,
    getMessages,
    messages,
    subscribeMessages,
    unsubscribeMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const endref = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    endref.current?.scrollIntoView();
  });

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeMessages();
      return () => unsubscribeMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeMessages, unsubscribeMessages]);

  if (isMessagesLoading) {
    return <div>LOADING..</div>;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow"
    
     style={{
        backdropFilter: "blur(20px)",
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

      {/* Chat container with glass effect */}
      <div className="relative z-10 flex flex-col overflow-y-auto h-screen backdrop-blur-xl border border-white/20 shadow-2xl pb-17">
        <div className="border-b border-white/30 shadow-lg">
          <ChatNav
            username={selectedUser?.username}
            profile={selectedUser?.profilePic}
            id={selectedUser?._id}
          />
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-7xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-white/60 text-lg">No messages yet</p>
              </div>
            ) : (
              messages.map((message) =>
                message.senderId.toString() === authUser._id ? (
                  <div
                    key={message._id}
                    className="flex justify-end animate-in fade-in slide-in-from-bottom-2"
                  >
                    <div className="max-w-2xl flex items-end gap-2">
                      <ChatBubbleSender
                        sender={authUser?.username}
                        profile={authUser?.profilePic}
                        message={message.text}
                        image={message.image}
                        sentTime={message.createdAt}
                        className="bg-gradient-to-br from-[#d65cff] to-[#ff6ec7] text-white px-4 py-3 rounded-2xl break-words whitespace-pre-wrap"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    key={message._id}
                    className="flex justify-start animate-in fade-in slide-in-from-bottom-2"
                  >
                    <div className="max-w-2xl flex items-end gap-2">
                      <ChatBubbleRev
                        receiver={selectedUser?.username}
                        profile={selectedUser?.profilePic}
                        message={message.text}
                        image={message.image}
                        sentTime={message.createdAt}
                        className="bg-[hsl(235,30%,20%)] text-white px-4 py-3 rounded-2xl break-words whitespace-pre-wrap"
                      />
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>

        <div ref={endref}></div>

     
         {/* Input bar */}
         

        <ChatTextBar />
        
      </div>
    </div>
  );
}
