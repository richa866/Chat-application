import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Mic, Smile, Send } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

export default function ChatTextBar() {
  const { sendMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);

  const fileInpRef = useRef();

  const handleEmoji = (e) => {
    setInput((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      console.log("Invalid file type:", file?.type);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      console.log("Image read as:", result); // Debug: Check base64 string
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInpRef.current) fileInpRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !imagePreview) return;

    const messageData = { text: input.trim(), image: imagePreview };
    console.log("Sending Message:", messageData); // Debug: Log what’s sent

    try {
      await sendMessage(messageData);
      setInput("");
      setImagePreview(null);
      if (fileInpRef.current) fileInpRef.current.value = "";
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[hsl(235,30%,12%)] border-t border-[hsla(235,30%,25%,0.5)] backdrop-blur-xl px-4 py-3">
      {imagePreview && (
        <div className="glass-card relative z-10 px-6 py-4 border-t border-border/50 mt-3">
          <div className="max-w-7xl mx-auto">
            <div className="mb-3 relative inline-block">
              <img
                src={imagePreview}
                alt="Selected"
                className="rounded-lg max-w-xs w-full h-auto border-2 border-primary/50"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="flex flex-1 items-center relative"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
            className="flex-1 px-4 py-2.5 rounded-full bg-[hsla(235,30%,18%,0.5)] border border-[hsla(235,30%,25%,0.3)] text-white placeholder-gray-400 focus:outline-none pr-12"
          />

          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setOpenEmoji((prev) => !prev)}
            className="absolute right-12 text-gray-400 hover:text-white transition"
          >
            <Smile className="w-5 h-5" />
          </button>

          {openEmoji && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker onEmojiClick={handleEmoji} theme="dark" />
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInpRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </form>

        {/* Attach / Send Buttons */}
        <div className="flex gap-2">
          {/* Attach Image */}
          <button
            type="button"
            onClick={() => fileInpRef.current?.click()}
            className={`p-2.5 rounded-full transition-colors ${
              imagePreview
                ? "bg-fuchsia-600 text-white"
                : "bg-[hsl(235,30%,18%)] text-gray-400 hover:text-white"
            }`}
          >
            <span className="material-icons text-[20px]">attach_file</span>
          </button>

          {/* Send Button */}
          <button
            type="submit"
            onClick={handleSendMessage}
            className="p-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-110 transition-transform flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}