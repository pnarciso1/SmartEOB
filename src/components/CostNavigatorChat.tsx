import React, { useState } from 'react';
import { MessageCircleQuestion, Send, Loader2, Bot, User } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'agent';
  content: string;
}

export function CostNavigatorChat({ memberId }: { memberId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'agent', content: 'Hi! I am your Pre-Service Cost Navigator. Planning a procedure? Ask me what it will cost based on your specific plan rules!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/v1/member/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, message: userMessage })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      setMessages(prev => [...prev, { role: 'agent', content: json.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'agent', content: "I'm sorry, I'm having trouble connecting to your plan documents right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center justify-center z-50"
      >
        <MessageCircleQuestion className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-5">
      {/* Chat Header */}
      <div className="bg-primary text-white p-4 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(false)}>
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-sm">Plan Cost Navigator</h3>
        </div>
        <button className="text-white/70 hover:text-white">✕</button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'agent' && (
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-3 h-3 text-accent" />
              </div>
            )}
            <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-sm' 
                : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="w-3 h-3 text-accent" />
            </div>
            <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about plan coverage..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent focus:bg-white transition-colors"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isTyping}
          className="bg-accent hover:bg-accent/90 disabled:bg-gray-300 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
}