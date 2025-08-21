import React from 'react';

const MoodButton = ({ mood, isSelected, onClick, emoji }) => {
  return (
    <button
      className={`mood-btn ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(mood)}
      aria-label={`Select mood: ${mood}`}
    >
      <span className="emoji">{emoji}</span>
      <span className="mood-text">{mood}</span>
    </button>
  );
};

export default MoodButton;