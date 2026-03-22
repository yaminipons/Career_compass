import { useState, useRef, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const suggestions = [
  "What skills do I need to become a Data Scientist?",
  "How do I prepare for UPSC?",
  "Suggest projects for a Full Stack Developer",
  "What is the salary of an AI Engineer in India?",
  "How to switch from Mechanical to Software Engineer?",
  "Best free courses for learning Python?"
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none w-fit shadow-sm">
      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.*)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.*)/gm, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold mr-2 flex-shrink-0 mt-1">
          🤖
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
        }`}
        dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
      />
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm ml-2 flex-shrink-0 mt-1">
          👤
        </div>
      )}
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm **CareerBot** 🤖 — your personal AI Career Mentor!\n\nI can help you with:\n• Career path guidance\n• Skills and courses to learn\n• Project ideas for your portfolio\n• Entrance exam preparation\n• Salary insights for India\n\nWhat would you like to explore today? 🚀"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage || loading) return;

    setInput('');
    setError('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await API.post('/chatbot/chat', {
        message: userMessage,
        history: history
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.reply
      }]);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Chat cleared! I'm ready to help you again. What career questions do you have? 🚀"
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            ←
          </button>
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h1 className="font-bold text-gray-800 dark:text-white">CareerBot</h1>
            <p className="text-xs text-green-500 font-medium">● Online — AI Career Mentor</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-sm text-gray-400 hover:text-red-500 transition px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900"
        >
          🗑 Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full">

        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold mr-2 flex-shrink-0 mt-1">
              🤖
            </div>
            <TypingIndicator />
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 text-sm my-2">{error}</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions — show only at start */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4 max-w-3xl mx-auto w-full">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 text-center">
            Try asking:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-full hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about careers..."
            rows={1}
            className="flex-1 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : '➤'}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>

    </div>
  );
}