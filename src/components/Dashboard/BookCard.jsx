import React, { useState } from 'react';
import { BookOpen, Share2, Star, Heart } from 'lucide-react';
import BookCategories from './BookCategories';
const BookCard = ({ book, favorites, onToggleFavorite, onShare, theme = 'dark' }) => {
  const [showFullTitle, setShowFullTitle] = useState(false);
  const titleWords = book.title.split(' ');
  const isLongTitle = titleWords.length > 5;
  const displayedTitle = showFullTitle
    ? book.title
    : titleWords.slice(0, 5).join(' ') + (isLongTitle ? '...' : '');

  const isDark = theme === 'dark';

  return (
    <div
      className={`group relative  rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border w-full
        ${isDark
          ? 'bg-white/10 hover:bg-white/20 border-white/20'
          : 'bg-white/70 hover:bg-white/90 border-gray-300'}`}
    >
      {/* Book Cover */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => onToggleFavorite(book.id)}
          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
        >
          <Heart
            className={`w-4 h-4 ${favorites.has(String(book.id)) ? 'fill-red-500 text-red-500' : isDark ? 'text-white' : 'text-black'}`}
          />
        </button>
      </div>

      {/* Book Info */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className={`font-bold group-hover:text-purple-500 transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`}>
          {displayedTitle}
          {isLongTitle && (
            <button
              onClick={() => setShowFullTitle(prev => !prev)}
              className="ml-2 text-purple-500 underline text-xs"
            >
              {showFullTitle ? 'less' : 'more'}
            </button>
          )}
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>by {book.author}</p>
        <BookCategories categories={book?.categories || []} theme={theme}/>
        <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{book.description}</p>
        {/* Categories and Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
    
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => window.open(book.previewUrl, '_blank', 'noopener,noreferrer')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-2 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Read Online
            </button>
            <button
              onClick={() => onShare(book)}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
