// components/BookVault/ThemeProvider.jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const themes = {
  dark: {
    bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    text: 'text-white',
    textMuted: 'text-white/80',
    textLight: 'text-white/70',
    header: 'backdrop-blur border-b border-white/20',
    card: 'bg-white/10 border border-white/20',
    cardHover: 'hover:bg-white/20',
    button: 'bg-white/20 border border-white/30 hover:bg-white/30',
    section: 'bg-white/10 backdrop-blur',
    footer: 'bg-black/30',
    ctaSection: 'bg-black/20',
    mockInterface: 'bg-gray-800',
    mockHeader: 'bg-gray-700',
    mockContent: 'bg-gray-700'
  },
  light: {
    bg: 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100',
    text: 'text-gray-900',
    textMuted: 'text-gray-700',
    textLight: 'text-gray-600',
    header: 'backdrop-blur border-b border-gray-200 bg-white/80',
    card: 'bg-white/80 border border-gray-200 shadow-lg',
    cardHover: 'hover:bg-white/90 hover:shadow-xl',
    button: 'bg-gray-100 border border-gray-300 hover:bg-gray-200',
    section: 'bg-white/50 backdrop-blur',
    footer: 'bg-gray-100',
    ctaSection: 'bg-indigo-50',
    mockInterface: 'bg-gray-100',
    mockHeader: 'bg-gray-200',
    mockContent: 'bg-gray-200'
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = (newTheme) => setTheme(newTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
