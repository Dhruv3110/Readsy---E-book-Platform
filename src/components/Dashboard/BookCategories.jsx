import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Tag } from 'lucide-react';

const BookCategories = ({ categories = [], theme = 'light' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle empty or undefined categories
  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-500 uppercase px-2 py-1 rounded-md bg-gray-200">
          No Categories
        </span>
      </div>
    );
  }

  // If only one category, show it directly
  if (categories.length === 1) {
    return (
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-white uppercase px-2 py-1 rounded-md bg-purple-600 transition-all duration-300 hover:bg-purple-700 hover:scale-105">
          {categories[0]}
        </span>
      </div>
    );
  }

  // Multiple categories - show dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 text-xs text-white uppercase px-3 py-1.5 rounded-md bg-purple-600 transition-all duration-300 hover:bg-purple-700 "
      // hover:scale-105 hover:shadow-lg
      >
        <Tag className="w-3 h-3" />
        <span className="font-medium">{categories.length} Categories</span>
        <ChevronDown 
          className={`w-3 h-3 transition-all duration-300 ${
            isOpen ? 'rotate-180 scale-110' : 'group-hover:translate-y-0.5'
          }`} 
        />
      </button>

      {/* Animated Dropdown */}
      <div 
        className={`absolute top-full left-0 mt-2 min-w-48 rounded-lg shadow-xl border z-50 ${
          isOpen ? 'block' : 'hidden'
        } ${
          theme === 'light'
          ? 'bg-white border-gray-200 shadow-gray-200'
          : 'bg-gray-800 border-gray-600 shadow-gray-900'
        }`}
      >
        <div className="p-2">
          <div className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Book Categories
          </div>
          
          <div className="grid grid-cols-2">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200
                  ${theme === 'light'
                    ? 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                    : 'text-gray-300 hover:bg-purple-900/30 hover:text-purple-300'
                  }`}
                style={{
                  animationDelay: `${idx * 50}ms`,
                  animation: isOpen ? 'slideInUp 0.3s ease-out forwards' : 'none'
                }} 
              >

                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span className="capitalize">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated arrow pointing to button */}
        <div className={`absolute -top-1 left-6 w-2 h-2 rotate-45 ${
          theme === 'light' ? 'bg-white border-l border-t border-gray-200' : 'bg-gray-800 border-l border-t border-gray-600'
        }`}></div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};


export default BookCategories;