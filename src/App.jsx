import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  const handleNavigateToChat = () => {
    setCurrentPage('chat');
    navigate('/chat');
  };

  const handleNavigateBack = () => {
    setCurrentPage('home');
    navigate('/');
  };

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/" 
          element={<Home onNavigateToChat={handleNavigateToChat} />} 
        />
        <Route 
          path="/chat" 
          element={<Chat onNavigateBack={handleNavigateBack} />} 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;