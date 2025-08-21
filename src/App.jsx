import React, { useState } from 'react';
import { Sparkles, Heart, Sun, RotateCcw } from 'lucide-react';
import { generateMindfulContent } from './services/mistralApi';
import MoodButton from './components/MoodButton';
import './App.css';

function App() {
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

  const resetApp = () => {
    setSelectedMood('');
    setAiResponse('');
  };

  return (
    <div className="app">
      <header className="app-header">
        <Sun size={42} className="header-icon" />
        <h1>Mindful Moments</h1>
        <p>Select your mood for instant mindful guidance</p>
      </header>

      <main className="app-main">
        {!aiResponse ? (
          <>
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
          </>
        ) : (
          <div className="result-section">
            <div className="response-card">
              <Heart className="card-icon" />
              <p className="response-text">{aiResponse}</p>
            </div>
            
            <button className="reset-btn" onClick={resetApp}>
              <RotateCcw size={16} />
              <span>Start Again</span>
            </button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by Mistral AI • Take a breath, you're doing great</p>
      </footer>
    </div>
  );
}

export default App;