import React, { useState } from 'react';
import { Sparkles, Sun, MessageCircle } from 'lucide-react';

// Mock function for demo
const generateMindfulContent = async (prompt) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return "Take a deep breath. Remember, this feeling is temporary and you have the strength to get through it.";
};

// Mock MoodButton component
const MoodButton = ({ mood, emoji, isSelected, onClick }) => (
  <button
    className={`mood-btn ${isSelected ? 'selected' : ''}`}
    onClick={() => onClick(mood)}
  >
    <span className="mood-emoji">{emoji}</span>
    <span className="mood-text">{mood}</span>
  </button>
);

function Home({ onNavigateToChat = () => {} }) {
  const [selectedMood, setSelectedMood] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const moodOptions = [
    { mood: 'Anxious', emoji: '😰', type: 'breathing exercise' },
    { mood: 'Stressed', emoji: '😤', type: 'mindfulness tip' },
    { mood: 'Tired', emoji: '😴', type: 'positive affirmation' },
    { mood: 'Grateful', emoji: '🙏', type: 'gratitude reflection' },
    { mood: 'Unmotivated', emoji: '😑', type: 'inspirational quote' },
    { mood: 'Overwhelmed', emoji: '😵', type: 'simple advice' },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleGenerate = async () => {
    if (!selectedMood) return;
    
    setIsLoading(true);
    setAiResponse('');

    try {
      const moodConfig = moodOptions.find(opt => opt.mood === selectedMood);
      const prompt = `Generate a very short (1-2 sentences) ${moodConfig.type} for someone feeling ${selectedMood}. Be supportive, practical, and kind.`;
      
      const response = await generateMindfulContent(prompt);
      setAiResponse(response);
    } catch (error) {
      setAiResponse("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page"> 
      <div className="home-container">
        {/* Top-right chat button - Fixed responsive positioning */}
        <div className="chat-top-button">
          <button className="chat-top-btn" onClick={onNavigateToChat}>
            <MessageCircle className="chat-icon" />
            <span className="chat-text">Chat with AI</span>
          </button>
        </div>

        <header className="app-header">
          <Sun size={42} className="header-icon" />
          <h1>Mindful Moments</h1>
          <p>Find peace and guidance in every moment</p>
        </header>

        <main className="app-main">
          {!aiResponse ? (
            <>
              {/* Mood Selection Section */}
              <div className="mood-section">
                <h2>How are you feeling today?</h2>
                <div className="mood-grid">
                  {moodOptions.map(({ mood, emoji }) => (
                    <MoodButton
                      key={mood}
                      mood={mood}
                      emoji={emoji}
                      isSelected={selectedMood === mood}
                      onClick={handleMoodSelect}
                    />
                  ))}
                </div>
              </div>

              {/* Generate Button Section */}
              <div className="generate-container">
                <button 
                  className={`generate-btn ${!selectedMood ? 'disabled' : ''}`}
                  onClick={handleGenerate}
                  disabled={!selectedMood || isLoading}
                >
                  {isLoading ? (
                    <div className="loading">
                      <div className="spinner"></div>
                      <span>Creating your moment...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Generate My Moment</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="result-section">
              <div className="response-card">
                <p className="response-text">{aiResponse}</p>
              </div>
              
              <div className="action-buttons">
                <button className="secondary-btn" onClick={() => setAiResponse('')}>
                  Try Another Mood
                </button>
                <button className="primary-btn" onClick={onNavigateToChat}>
                  Continue to Chat
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        .home-page {
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }

        .home-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          position: relative;
        }

        /* Chat button responsive fixes */
        .chat-top-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 50;
        }

        .chat-top-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .chat-icon {
          width: 18px;
          height: 18px;
        }

        .chat-text {
          font-size: 0.875rem;
        }

        /* Header responsive */
        .app-header {
          text-align: center;
          margin-bottom: 2rem;
          padding-top: 2rem;
        }

        .header-icon {
          width: 42px;
          height: 42px;
        }

        .app-header h1 {
          font-size: 2.5rem;
          margin: 1rem 0 0.5rem 0;
        }

        .app-header p {
          font-size: 1.125rem;
        }

        /* Mood section responsive */
        .mood-section h2 {
          text-align: center;
          font-size: 1.875rem;
          margin-bottom: 2rem;
        }

        .mood-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .mood-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          border: 2px solid transparent;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 100px;
        }

        .mood-emoji {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .mood-text {
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Generate button responsive */
        .generate-container {
          text-align: center;
          margin-top: 2rem;
        }

        .generate-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .loading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid currentColor;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Result section responsive */
        .result-section {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .response-card {
          margin-bottom: 2rem;
          padding: 2rem;
          border-radius: 1rem;
        }

        .response-text {
          font-size: 1.125rem;
          line-height: 1.6;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .secondary-btn, .primary-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .home-container {
            padding: 0.75rem;
          }

          .chat-top-button {
            top: 0.75rem;
            right: 0.75rem;
          }

          .chat-top-btn {
            padding: 0.5rem 0.75rem;
          }

          .chat-text {
            display: none;
          }

          .app-header h1 {
            font-size: 2rem;
          }

          .app-header p {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .header-icon {
            width: 36px;
            height: 36px;
          }

          .mood-section h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .mood-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .mood-btn {
            padding: 0.75rem;
            min-height: 80px;
          }

          .mood-emoji {
            font-size: 1.5rem;
          }

          .mood-text {
            font-size: 0.75rem;
          }

          .generate-btn {
            padding: 0.875rem 1.5rem;
            font-size: 0.875rem;
          }

          .generate-btn span:last-child {
            display: none;
          }

          .generate-btn::after {
            content: "Generate";
          }

          .loading span {
            display: none;
          }

          .loading::after {
            content: "Creating...";
          }

          .response-card {
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .response-text {
            font-size: 1rem;
          }

          .action-buttons {
            flex-direction: column;
            gap: 0.75rem;
          }

          .secondary-btn, .primary-btn {
            width: 100%;
            padding: 1rem;
            font-size: 0.875rem;
          }
        }

        /* Small mobile styles */
        @media (max-width: 480px) {
          .mood-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }

          .mood-btn {
            padding: 0.5rem;
            min-height: 70px;
          }

          .mood-emoji {
            font-size: 1.25rem;
            margin-bottom: 0.25rem;
          }

          .mood-text {
            font-size: 0.7rem;
          }
        }

        /* Tablet styles */
        @media (min-width: 769px) and (max-width: 1024px) {
          .mood-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
        }

        /* Large screen styles */
        @media (min-width: 1025px) {
          .mood-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;