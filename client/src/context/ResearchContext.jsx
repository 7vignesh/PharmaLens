/**
 * PharmaLens Research Context
 * ============================
 * Global state management for research operations.
 * Manages privacy mode toggle and research state.
 */

import { createContext, useState, useCallback } from 'react';

export const ResearchContext = createContext();

export const ResearchProvider = ({ children }) => {
  // Privacy mode: 'secure' (local) or 'cloud' (GPT-4)
  const [privacyMode, setPrivacyMode] = useState('cloud');
  
  // Current research state
  const [currentResearch, setCurrentResearch] = useState(null);
  
  // Research history
  const [researchHistory, setResearchHistory] = useState([]);
  
  /**
   * Add completed research to history
   */
  const addToHistory = useCallback((research) => {
    setResearchHistory(prev => [
      { ...research, timestamp: new Date().toISOString() },
      ...prev.slice(0, 9) // Keep last 10
    ]);
  }, []);
  
  /**
   * Clear research history
   */
  const clearHistory = useCallback(() => {
    setResearchHistory([]);
  }, []);
  
  const value = {
    privacyMode,
    setPrivacyMode,
    currentResearch,
    setCurrentResearch,
    researchHistory,
    addToHistory,
    clearHistory
  };
  
  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
};
