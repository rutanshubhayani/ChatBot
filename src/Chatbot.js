import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const GEMINI_API_KEY = 'AIzaSyB2pgAXCMaIhe1nBmCG2jXoFbaj8VQCZCY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function fetchGeminiResponse(userText) {
  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: userText }
          ]
        }
      ]
    }),
  });
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand.'
  );
}

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your chatbot. How can I help you?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput('');
    setLoading(true);
    // Focus input after sending
    inputRef.current?.focus();
    try {
      const aiText = await fetchGeminiResponse(userMessage.text);
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: aiText }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: 'Sorry, there was an error connecting to Gemini.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Chatbot 🤖</div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-message chatbot-message-${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="chatbot-message chatbot-message-bot">Thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chatbot-input-area" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chatbot-input"
          disabled={loading}
          ref={inputRef}
        />
        <button type="submit" className="chatbot-send-btn" disabled={loading || !input.trim()}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Chatbot; 