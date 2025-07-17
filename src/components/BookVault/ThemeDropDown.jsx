// components/BookVault/ThemeDropdown.jsx
import React, { useState } from 'react';
import { useTheme, themes } from './ThemeProvider';

const ThemeDropdown = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'light', label: 'Light', icon: '☀️' }
  ];

  const currentTheme = themes[theme];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${currentTheme.button} ${currentTheme.text}`}
      >
        <span className="text-sm">
          {themeOptions.find(opt => opt.value === theme)?.icon}
        </span>
        <span className="hidden sm:inline text-sm">Theme</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg z-50 ${currentTheme.card} border`}>
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                toggleTheme(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left rounded-lg transition-all flex items-center gap-2 ${
                theme === option.value 
                  ? 'bg-gradient-to-r from-red-400 to-orange-600 text-white' 
                  : `${currentTheme.text} hover:${currentTheme.cardHover.replace('hover:', '')}`
              }`}
            >
              <span>{option.icon}</span>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
