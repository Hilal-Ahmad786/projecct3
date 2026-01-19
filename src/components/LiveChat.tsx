'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveChatProps {
  provider?: 'custom' | 'tawk' | 'crisp' | 'intercom';
  tawkPropertyId?: string;
  crispWebsiteId?: string;
  intercomAppId?: string;
  welcomeMessage?: string;
  agentName?: string;
  agentAvatar?: string;
  primaryColor?: string;
}

export default function LiveChat({
  provider = 'custom',
  tawkPropertyId,
  crispWebsiteId,
  intercomAppId,
  welcomeMessage = "Hi there! How can we help you today?",
  agentName = "Support Team",
  agentAvatar = "/images/support-avatar.jpg",
  primaryColor = "#1f2937",
}: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    sender: 'user' | 'agent';
    timestamp: Date;
  }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load third-party chat widgets
  useEffect(() => {
    if (provider === 'tawk' && tawkPropertyId) {
      loadTawk(tawkPropertyId);
    } else if (provider === 'crisp' && crispWebsiteId) {
      loadCrisp(crispWebsiteId);
    } else if (provider === 'intercom' && intercomAppId) {
      loadIntercom(intercomAppId);
    }
  }, [provider, tawkPropertyId, crispWebsiteId, intercomAppId]);

  // Initialize with welcome message
  useEffect(() => {
    if (provider === 'custom' && messages.length === 0) {
      setMessages([{
        id: 1,
        text: welcomeMessage,
        sender: 'agent',
        timestamp: new Date(),
      }]);
    }
  }, [provider, welcomeMessage, messages.length]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Thanks for your message! One of our team members will get back to you shortly. In the meantime, feel free to explore our services or check our FAQ.",
        sender: 'agent',
        timestamp: new Date(),
      }]);
    }, 2000);
  };

  // If using third-party provider, don't render custom chat
  if (provider !== 'custom') {
    return null;
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
          isOpen ? 'hidden' : ''
        }`}
        style={{ backgroundColor: primaryColor }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-4 text-white flex items-center justify-between"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{agentName}</p>
                  <p className="text-xs text-white/70">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-gray-900 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-2 rounded-full bg-gray-900 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Third-party chat widget loaders
function loadTawk(propertyId: string) {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://embed.tawk.to/${propertyId}/default`;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.head.appendChild(script);
}

function loadCrisp(websiteId: string) {
  if (typeof window === 'undefined') return;

  (window as unknown as { $crisp?: unknown[]; CRISP_WEBSITE_ID?: string }).$crisp = [];
  (window as unknown as { CRISP_WEBSITE_ID: string }).CRISP_WEBSITE_ID = websiteId;

  const script = document.createElement('script');
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  document.head.appendChild(script);
}

function loadIntercom(appId: string) {
  if (typeof window === 'undefined') return;

  const w = window as unknown as {
    Intercom?: (command: string, settings?: object) => void;
    intercomSettings?: object;
  };

  w.intercomSettings = { app_id: appId };

  const script = document.createElement('script');
  script.innerHTML = `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${appId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`;
  document.head.appendChild(script);
}
