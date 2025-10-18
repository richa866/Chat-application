import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { GoogleGenAI } from '@google/genai';

const Chatbot = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey });

    const [message, setMessage] = useState('');
    const [aiMessages, setAiMessages] = useState([]);
    const { isChatbotOpen, setIsChatbotOpen } = useChatStore();

    const glassCardStyle = {
        backgroundColor: `hsl(235 30% 12% / 0.6)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid hsl(240 20% 30% / 0.3)`,
    };

    async function submitMessage() {
        if (!message.trim()) return;

        const userMsg = { role: 'user', text: message };
        setAiMessages((prev) => [...prev, userMsg]);
        setMessage('');

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: [{ role: 'user', parts: [{ text: message }] }],
            });

            const aiText = response.text;
            const aiMsg = { role: 'ai', text: aiText };
            setAiMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error('Error generating response:', error);
            const errorMsg = {
                role: 'ai',
                text: 'Sorry, something went wrong. Please try again!',
            };
            setAiMessages((prev) => [...prev, errorMsg]);
        }
    }

    

    return (
        <>
            <div
                style={{ backgroundColor: 'hsl(240 20% 6%)', borderColor: 'hsl(235 30% 25%)' }}
                className={`fixed top-0 right-0 h-full w-full md:w-96 border-l shadow-2xl transition-transform duration-300 ease-in-out z-100 ${
                    isChatbotOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div
                        style={{ ...glassCardStyle, borderBottom: '1px solid hsl(235 30% 25%)' }}
                        className="p-4 border-b"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                style={{
                                    background: `linear-gradient(to bottom right, hsl(320 85% 60%), hsl(280 70% 55%))`,
                                }}
                                className="p-3 rounded-xl"
                            >
                                <Sparkles className="h-6 w-6" style={{ color: 'hsl(0 0% 100%)' }} />
                            </div>
                            <button
                                onClick={() => setIsChatbotOpen(false)}
                                className="p-2 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" style={{ color: 'hsl(240 5% 65%)' }} />
                            </button>
                        </div>

                        <h2 className="text-xl font-semibold mb-1" style={{ color: 'hsl(0 0% 100%)' }}>
                            Hi, User
                        </h2>
                        <p className="text-sm" style={{ color: 'hsl(240 5% 65%)' }}>
                            Can I help you with anything?
                        </p>
                    </div>

                    {/* Message Section */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {aiMessages.length > 0 ? (
                            aiMessages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        style={{
                                            backgroundColor:
                                                msg.role === 'user'
                                                    ? 'hsl(320 85% 60%)'
                                                    : 'hsl(235 30% 12%)',
                                            color: 'hsl(0 0% 100%)',
                                            border: '1px solid hsl(235 30% 25%)',
                                        }}
                                        className="px-3 py-2 rounded-lg max-w-[80%] text-sm"
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                
                            </>
                        )}
                    </div>

                    {/* Input area */}
                    <div
                        style={{
                            borderTop: '1px solid hsl(235 30% 25%)',
                            backgroundColor: 'hsl(240 20% 6%)',
                        }}
                        className="p-4 border-t"
                    >
                        <div
                            style={{
                                backgroundColor: 'hsl(235 30% 12%)',
                                borderColor: 'hsl(235 30% 25%)',
                            }}
                            className="flex items-center gap-2 p-2 rounded-lg border"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-transparent outline-none px-2"
                                style={{
                                    color: 'hsl(0 0% 100%)',
                                    fontSize: '0.875rem',
                                }}
                            />
                            <button
                                onClick={submitMessage}
                                style={{
                                    background: `linear-gradient(to bottom right, hsl(320 85% 60%), hsl(280 70% 55%))`,
                                    color: 'hsl(0 0% 100%)',
                                }}
                                className="p-2 rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isChatbotOpen && (
                <div
                    onClick={() => setIsChatbotOpen(false)}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                />
            )}
        </>
    );
};

export default Chatbot;
