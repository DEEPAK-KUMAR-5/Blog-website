import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, X, Send, ArrowLeft, Search } from 'lucide-react';

const ChatDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState("inbox"); // 'inbox' or 'chat'
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [conversations, setConversations] = useState([]);
    
    const { socket, onlineUsers } = useSocket();
    const { user, API } = useAuth();
    const scrollRef = useRef();

    // 1. Fetch Inbox Conversations when drawer opens
    useEffect(() => {
        if (isOpen && view === "inbox") {
            const fetchConversations = async () => {
                try {
                    const res = await API.get("/api/v1/messages/conversations");
                    setConversations(res.data.data);
                } catch (error) {
                    console.error("Failed to fetch conversations", error);
                }
            };
            fetchConversations();
        }
    }, [isOpen, view, API]);

    // 2. Fetch Chat History when a user is selected
    useEffect(() => {
        if (view === "chat" && selectedUser) {
            const fetchMessages = async () => {
                try {
                    const res = await API.get(`/api/v1/messages/${selectedUser._id}`);
                    setChatHistory(res.data.data);
                } catch (error) {
                    console.error("Failed to fetch messages", error);
                }
            };
            fetchMessages();
        }
    }, [view, selectedUser, API]);

    // 3. Auto-scroll
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    // 4. Listen for Socket events
    useEffect(() => {
        if (!socket) return;
        socket.on("newMessage", (msg) => {
            if (view === "chat" && msg.senderId === selectedUser?._id) {
                setChatHistory((prev) => [...prev, msg]);
            }
        });
        return () => socket.off("newMessage");
    }, [socket, selectedUser, view]);

    // Listen for custom event from BlogDetail
    useEffect(() => {
        const handleOpenChat = (e) => {
            setSelectedUser(e.detail);
            setView("chat");
            setIsOpen(true);
        };
        window.addEventListener("openChat", handleOpenChat);
        return () => window.removeEventListener("openChat", handleOpenChat);
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        try {
            const res = await API.post(`/api/v1/messages/send/${selectedUser._id}`, { message });
            setChatHistory([...chatHistory, res.data.data]);
            setMessage("");
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-80 md:w-[380px] h-[550px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
                    
                    {/* Header */}
                    <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            {view === "chat" && (
                                <button onClick={() => setView("inbox")} className="text-slate-400 hover:text-white">
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            {view === "chat" && selectedUser ? (
                                <div className="flex items-center gap-2">
                                    <img src={selectedUser.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-white text-sm">{selectedUser.name}</p>
                                        {onlineUsers?.includes(selectedUser._id) && <p className="text-[10px] text-cyan-400">Online</p>}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="text-cyan-400" size={20} />
                                    <span className="font-semibold text-white">Messages</span>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* INBOX VIEW */}
                    {view === "inbox" && (
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {conversations.length > 0 ? (
                                conversations.map((conv) => {
                                    // Find the OTHER participant (not the logged in user)
                                    const otherUser = conv.participants.find(p => p._id !== user._id);
                                    if(!otherUser) return null;

                                    return (
                                        <div 
                                            key={conv._id} 
                                            onClick={() => { setSelectedUser(otherUser); setView("chat"); }}
                                            className="p-4 border-b border-slate-800/50 hover:bg-slate-800/50 cursor-pointer flex items-center gap-3 transition-colors"
                                        >
                                            <div className="relative">
                                                <img src={otherUser.avatar} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
                                                {onlineUsers?.includes(otherUser._id) && (
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 border-2 border-slate-900 rounded-full"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-medium text-white text-sm">{otherUser.name}</p>
                                                <p className="text-xs text-slate-400 truncate">
                                                    {conv.lastMessage?.message || "Started a conversation"}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="p-8 text-center text-slate-500 text-sm flex flex-col items-center">
                                    <MessageSquare size={32} className="mb-3 opacity-50" />
                                    <p>No conversations yet.</p>
                                    <p className="text-xs mt-1">Visit a blog post to message the author!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CHAT VIEW */}
                    {view === "chat" && (
                        <>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-900/50">
                                {chatHistory.length > 0 ? chatHistory.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                                            msg.senderId === user._id 
                                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none' 
                                            : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                                        }`}>
                                            {msg.message}
                                        </div>
                                    </div>
                                )) : (
                                     <p className="text-center text-slate-500 text-xs mt-4">Say hello!</p>
                                )}
                                <div ref={scrollRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-800/80 flex gap-2">
                                <input 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message..."
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                                <button type="submit" disabled={!message.trim()} className="p-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition-all">
                                    <Send size={18} />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}

            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105 transition-all active:scale-95 text-white"
            >
                <MessageSquare size={24} />
            </button>
        </div>
    );
};

export default ChatDrawer;