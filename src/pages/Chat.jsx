import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Bot, User } from 'lucide-react';
import { generateChatResponse } from '../services/mistralApi';

function Chat({ onNavigateBack }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm here to listen and offer supportive guidance. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare message history for API
      const messageHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const response = await generateChatResponse([
        ...messageHistory,
        { role: 'user', content: inputMessage }
      ]);

      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "I'm having trouble responding right now. Could you try again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-page"> {/* ADD THIS WRAPPER */}
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-btn" onClick={onNavigateBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="chat-title">
            <Bot size={24} />
            <h2>Mindful Chat</h2>
          </div>
          <div className="header-placeholder"></div>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-content">
                <p>{message.content}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form className="input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Share what's on your mind..."
            disabled={isLoading}
            className="chat-input"
          />
          <button type="submit" disabled={!inputMessage.trim() || isLoading} className="send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div> // CLOSE THE WRAPPER
  );
}

export default Chat;