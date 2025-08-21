import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../auth/Auth';
import { supabase } from '../lib/supabaseClient';
import { PaperAirplaneIcon, ChevronLeftIcon } from '../components/Icons';
import { Profile, Message, Database } from '../types/database';

type ConversationParticipant = Profile & { last_message: string; last_message_time: string };

const MessagesPage: React.FC = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<ConversationParticipant[]>([]);
    const [activeConversation, setActiveConversation] = useState<ConversationParticipant | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showChatView, setShowChatView] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);
    
    // Fetch conversations
    useEffect(() => {
        if (!user) return;
        
        const fetchConversations = async () => {
             const { data, error } = await supabase.rpc('get_conversations', { p_user_id: user.id });
             if (error) {
                 console.error("Error fetching conversations:", error);
             } else {
                 setConversations(data || []);
                 if (data && data.length > 0) {
                    // setActiveConversation(data[0]); // Don't auto-select on mobile
                 }
             }
        };
        fetchConversations();
    }, [user]);

    // Fetch messages for active conversation
    useEffect(() => {
        if (!activeConversation || !user) return;

        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .or(`(sender_id.eq.${user.id},receiver_id.eq.${activeConversation.id}),(sender_id.eq.${activeConversation.id},receiver_id.eq.${user.id})`)
                .order('created_at', { ascending: true });
            
            if (error) console.error("Error fetching messages:", error);
            else setMessages(data as Message[]);
        };
        fetchMessages();

    }, [activeConversation, user]);

    // Listen for new messages in real-time
    useEffect(() => {
        if (!activeConversation || !user) return;

        const channel = supabase
            .channel(`messages:${user.id}:${activeConversation.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `receiver_id=eq.${user.id},sender_id=eq.${activeConversation.id}`
                },
                (payload) => {
                    setMessages(currentMessages => [...currentMessages, payload.new as Message]);
                }
            ).subscribe();
        
        return () => {
            supabase.removeChannel(channel);
        };

    }, [activeConversation, user]);


    const handleSelectConversation = (participant: ConversationParticipant) => {
        setActiveConversation(participant);
        if (window.innerWidth < 768) {
            setShowChatView(true);
        }
    };
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !activeConversation || !user) return;

        const messageToSend: Database['public']['Tables']['messages']['Insert'] = {
            sender_id: user.id,
            receiver_id: activeConversation.id,
            content: newMessage,
        };

        const { data, error } = await supabase.from('messages').insert(messageToSend).select().single();
        if (error) {
            console.error("Error sending message:", error);
        } else {
            setMessages(current => [...current, data as Message]);
            setNewMessage('');
        }
    };

    if (!user) {
        return <div className="p-8">Please log in to view your messages.</div>
    }

    return (
        <div className="h-[calc(100vh-10rem)] flex bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Conversations Sidebar */}
            <aside className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out ${showChatView && 'hidden md:flex'}`}>
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-neutral-dark">Conversations</h1>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map(convo => (
                        <ConversationItem 
                            key={convo.id}
                            participant={convo}
                            isActive={activeConversation?.id === convo.id}
                            onSelect={() => handleSelectConversation(convo)}
                        />
                    ))}
                </div>
            </aside>
            
            {/* Chat Window */}
            <main className={`flex-1 flex flex-col transition-transform duration-300 ease-in-out ${!showChatView && 'hidden md:flex'}`}>
                {activeConversation ? (
                    <>
                        <header className="flex items-center p-4 border-b border-gray-200 bg-gray-50">
                             <button onClick={() => setShowChatView(false)} className="md:hidden mr-4 p-1 rounded-full hover:bg-gray-200">
                                <ChevronLeftIcon className="h-6 w-6" />
                            </button>
                            <img src={`https://i.pravatar.cc/150?u=${activeConversation.id}`} alt={activeConversation.company_name || 'User'} className="h-10 w-10 rounded-full mr-3" />
                            <div>
                                <h2 className="text-lg font-bold text-neutral-dark">{activeConversation.company_name}</h2>
                                <p className="text-sm text-gray-500 capitalize">{activeConversation.role}</p>
                            </div>
                        </header>
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-100 space-y-4">
                           {messages.map(msg => <MessageBubble key={msg.id} message={msg} currentUserId={user.id} />)}
                           <div ref={messagesEndRef} />
                        </div>
                        <footer className="p-4 bg-white border-t border-gray-200">
                           <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                                <input 
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 block w-full border-gray-300 rounded-full py-2 px-4 focus:ring-primary focus:border-primary"
                                />
                                <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus disabled:bg-gray-400" disabled={!newMessage.trim()}>
                                    <PaperAirplaneIcon className="h-6 w-6 transform rotate-90" />
                                </button>
                           </form>
                        </footer>
                    </>
                ) : (
                    <div className="hidden md:flex items-center justify-center h-full text-gray-500">
                        <p>Select a conversation to start chatting.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

interface ConversationItemProps {
    participant: ConversationParticipant;
    isActive: boolean;
    onSelect: () => void;
}
const ConversationItem: React.FC<ConversationItemProps> = ({ participant, isActive, onSelect }) => {
    return (
        <div onClick={onSelect} className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-blue-50' : ''}`}>
            <img src={`https://i.pravatar.cc/150?u=${participant.id}`} alt={participant.company_name || 'User'} className="h-12 w-12 rounded-full mr-4"/>
            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-neutral-dark truncate">{participant.company_name}</h3>
                    <p className="text-xs text-gray-400">{new Date(participant.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <p className="text-sm text-gray-500 truncate">{participant.last_message}</p>
            </div>
        </div>
    )
}

interface MessageBubbleProps {
    message: Message;
    currentUserId: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, currentUserId }) => {
    const isCurrentUser = message.sender_id === currentUserId;
    return (
        <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isCurrentUser ? 'bg-primary text-white rounded-br-lg' : 'bg-white text-neutral-dark rounded-bl-lg'}`}>
                <p className="text-sm">{message.content}</p>
            </div>
        </div>
    )
}

export default MessagesPage;