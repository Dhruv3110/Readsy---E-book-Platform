import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import BookGrid from './BookGrid';

const MainApp = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    'all',
    'fiction',
    'non-fiction',
    'romance',
    'mystery',
    'sci-fi',
    'biography',
    'history',
    'adventure',
    'children',
    'fantasy',
    'psychological',
    'horror',
    'classic',
    'literature',
    'humor',
    'poetry',
  ];


  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  const toggleFavorite = (bookId) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(bookId) ? newFavorites.delete(bookId) : newFavorites.add(bookId);
    setFavorites(newFavorites);
  };

  const handleShare = (book) => {
    const bookUrl = `${window.location.origin}/dashboard?bookId=${book.id}`;
    const text = `Check out "${book.title}" by ${book.author} on our E-Book Platform: ${bookUrl}`;

    if (navigator.share) {
      navigator.share({
        title: book.title,
        text,
        url: bookUrl,
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Book link copied to clipboard!");
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 to-purple-50' 
        : 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    }`}>
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        theme={theme}
      />

      <BookGrid
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onShare={handleShare}
        theme={theme}
      />
    </div>
  );
};

export default MainApp;
