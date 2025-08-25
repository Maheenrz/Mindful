import React, { useState } from 'react';
import { Sparkles, Sun, MessageCircle } from 'lucide-react';
import { generateMindfulContent } from '../services/mistralApi';
import MoodButton from '../components/MoodButton';

function Home({ onNavigateToChat }) {
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
        {/* Top-right chat button */}
        <div className="chat-top-button">
          <button className="chat-top-btn" onClick={onNavigateToChat}>
            <MessageCircle size={18} />
            <span>Chat with AI</span>
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
      </div> {/* CLOSE home-container */}
    </div> // CLOSE home-page
  );
}

export default Home;