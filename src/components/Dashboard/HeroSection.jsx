import React, { useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';

const HeroSection = ({ 
  searchTerm, 
  setSearchTerm, 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  theme = 'light',
  customTitle,
  customSubtitle
}) => {
  const handleDebouncedChange = useMemo(() => debounce((value) => {
    setSearchTerm(value);
  }, 600), []);

  useEffect(() => {
    return() => {
      handleDebouncedChange.cancel();
    }
  },[])

  // Theme-specific styles
  const themeStyles = {
    light: {
      container: 'bg-gradient-to-br from-blue-50 to-purple-50',
      title: 'text-gray-900',
      subtitle: 'text-gray-600',
      gradient: 'from-purple-600 to-pink-600',
      searchInput: 'bg-white/80 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 shadow-lg',
      searchIcon: 'text-gray-500',
      categoryActive: 'bg-purple-600 text-white shadow-lg',
      categoryInactive: 'bg-white/60 text-gray-700 hover:bg-white/80 hover:text-gray-900 border border-gray-200'
    },
    dark: {
      container: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
      title: 'text-white',
      subtitle: 'text-gray-300',
      gradient: 'from-purple-400 to-pink-400',
      searchInput: 'bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-transparent',
      searchIcon: 'text-gray-400',
      categoryActive: 'bg-purple-600 text-white shadow-lg',
      categoryInactive: 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
    }
  };

  const currentTheme = themeStyles[theme];

  // Function to render custom title with gradient on "Books"
  const renderCustomTitle = () => {
    if (customTitle.includes('Books')) {
      const parts = customTitle.split('Books');
      return (
        <>
          {parts[0]}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient}`}>
            Books
          </span>
          {parts[1]}
        </>
      );
    }
    return customTitle;
  };

  return (
    <div className="relative z-10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto sm:px-1 lg:px-8">
        <div className="text-center mt-10">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 animate-fade-in transition-colors duration-300 ${currentTheme.title}`}>
            {customTitle ? (
              renderCustomTitle()
            ) : (
              <>
                Discover Your Next{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient}`}>
                  Great Read
                </span>
              </>
            )}
          </h2>

          <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${currentTheme.subtitle}`}>
            {customSubtitle ?? 'Explore thousands of books, with one click, and dive into immersive reading experiences'}
          </p>

          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.searchIcon}`} />
              <input
                type="text"
                placeholder="Search for books, authors, or genres..."
                value={searchTerm}
                onChange={(e) => handleDebouncedChange(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${currentTheme.searchInput}`}
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? currentTheme.categoryActive
                    : currentTheme.categoryInactive
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;