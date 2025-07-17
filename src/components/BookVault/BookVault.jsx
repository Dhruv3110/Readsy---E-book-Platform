// components/BookVault/BookVault.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, themes } from './ThemeProvider';
import ThemeDropdown from './ThemeDropDown';
import logo from '../../assets/logo.svg'
import { BookOpen, Heart, Moon, Search, Smartphone } from 'lucide-react';

const BookVault = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const showLogin = () => navigate('/auth');
  const showHome = () => navigate('/');

  return (
    <div className={`min-h-screen ${currentTheme.bg} relative overflow-x-hidden font-sans`}>
      {/* Header */}
      <header className={`fixed w-full z-50 ${currentTheme.header} transition-all duration-300`}>
        <nav className="max-w-screen-xl mx-auto px-3 sm:px-5 flex justify-between items-center h-[70px] overflow-visible">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className={`h-[120px] w-[120px] transition-transform duration-300 hover:scale-110 ${
                theme === 'light' ? 'filter brightness-90' : 'filter brightness-110'
              }`}
            />
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeDropdown />
            
            {/* Mobile: Icon buttons */}
            <div className="flex md:hidden items-center gap-2">
              <button 
                onClick={showLogin} 
                className={`p-2 ${currentTheme.text} hover:scale-110 transition-all rounded-full ${currentTheme.button}`}
                title="Login"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button 
                onClick={showLogin} 
                className="p-2 text-white hover:scale-110 transition-all rounded-full bg-gradient-to-r from-red-400 to-orange-600 shadow-lg"
                title="Register"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </button>
            </div>

            {/* Desktop: Text buttons */}
            <div className="hidden md:flex gap-4">
              <button onClick={showLogin} className={`px-6 py-3 ${currentTheme.text} font-semibold rounded-full transition-all text-center inline-block ${currentTheme.button}`}>
                Login
              </button>
              <button onClick={showLogin} className="px-6 py-3 text-white font-semibold rounded-full transition-all text-center inline-block bg-gradient-to-r from-red-400 to-orange-600 shadow-lg hover:-translate-y-1">
                Register
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={`pt-40 pb-24 text-center ${currentTheme.text}`}>
        <div className="max-w-screen-xl mx-auto px-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fadeInUp">Your Digital Reading Universe</h1>
          <p className={`text-lg sm:text-xl md:text-2xl mb-8 animate-fadeInUp delay-300 ${currentTheme.textMuted}`}>
            Discover, collect, and enjoy thousands of e-books in one beautiful platform
          </p>
          <div className="animate-fadeInUp delay-600">
            <button onClick={showLogin} className="px-6 py-3 text-white font-semibold rounded-full transition-all text-center inline-block bg-gradient-to-r from-red-400 to-orange-600 shadow-lg hover:-translate-y-1">
              Start Reading Today
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 ${currentTheme.section}`}>
        <div className={`max-w-screen-xl mx-auto px-5 ${currentTheme.text}`}>
          <h2 className="text-3xl sm:text-4xl text-center mb-16 font-semibold">Why Choose Readsy?</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [<BookOpen className='w-10 h-10'/>, "Vast Library", "Access thousands of e-books across all genres, from bestsellers to indie gems"],
              [<Smartphone className='w-10 h-10'/>, "Multi-Device", "Read on your phone, tablet, or computer"],
              [<Moon className='w-10 h-10'/>, "Themes", "Comfortable reading in any lighting with our adaptive display technology"]
            ].map(([icon, title, desc], i) => (
              <div key={i} className={`${currentTheme.card} rounded-2xl p-8 text-center hover:-translate-y-2 ${currentTheme.cardHover} transition-all`}>
                <span className="flex text-4xl justify-center mb-4 ">{icon}</span>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className={currentTheme.textMuted}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className={`py-24 ${currentTheme.text} text-center`}>
        <div className="max-w-screen-xl mx-auto px-5">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-16">Experience Readsy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Screenshot 1 */}
            <div className={`screenshot ${currentTheme.card} rounded-xl p-6 hover:scale-105 transition-all`}>
              <div className={`mock-interface ${currentTheme.mockInterface} rounded-md p-4 mb-4`}>
                <div className={`mock-header ${currentTheme.mockHeader} h-8 rounded flex items-center px-2 mb-4`}>
                  <div className="mock-dots flex gap-1">
                    <Search className={` transform mt-1  w-4 h-4 ${currentTheme.searchIcon}`} />
                    <p>Search for books, authors, or genres...</p>
                  </div>
                </div>
                <div className={`mock-content grid grid-cols-3 gap-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'} text-sm`}>
                  {['Fiction', 'Sci-Fi', 'Mystery', 'Romance', 'History', 'Many More'].map((genre, i) => (
                    <div key={i} className={`mock-book flex items-center justify-center h-14 rounded bg-gradient-to-r ${i === 1 ? 'from-red-500 to-red-700' : i === 2 ? 'from-green-500 to-green-700' : 'from-blue-500 to-blue-700'}`}>
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-xl mb-2">Browse by Category</h3>
              <p className={currentTheme.textMuted}>Explore our organized collection with intuitive category browsing</p>
            </div>

            {/* Screenshot 2 */}
            <div className={`screenshot ${currentTheme.card} rounded-xl p-6 hover:scale-105 transition-all`}>
              <div className={`mock-interface ${currentTheme.mockInterface} rounded-md p-4 mb-4 text-left ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                <h4 className="text-lg mb-2">Chapter 1: The Beginning</h4>
                <p className="mb-2">It was the best of times, it was the worst of times...</p>
              </div>
              <h3 className="text-xl mb-2">Read & Share Seamlessly</h3>
              <p className={currentTheme.textMuted}>
                Dive into books with a clean, distraction-free reading experience and instantly share your favorite titles with friends.
              </p>
            </div>
            {/* Screenshot 3 */}
            <div className={`screenshot ${currentTheme.card} rounded-xl p-6 hover:scale-105 transition-all`}>
              <div className={`mock-interface ${currentTheme.mockInterface} rounded-md p-4 mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                <div className="flex items-center mb-4">
                  <Heart className="w-10 h-10 fill-red-600 mr-4"/>
                  <div>
                    <h4 className="mb-1">Your Favourite Books</h4>
                  </div>
                </div>
                <div className={`${currentTheme.mockContent} h-0.5 w-full mb-4`}></div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-green-600 h-16 rounded"></div>
                  <div className="flex-1 bg-yellow-500 h-16 rounded"></div>
                  <div className="flex-1 bg-purple-600 h-16 rounded"></div>
                </div>
              </div>
              <h3 className="text-xl mb-2">Save What You Love</h3>
              <p className={currentTheme.textMuted}>
                Easily mark your favorite books and access them anytime on your personal favourites page.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 text-center ${currentTheme.ctaSection} ${currentTheme.text}`}>
        <div className="max-w-screen-xl mx-auto px-5">
          <h2 className="text-3xl sm:text-4xl mb-6">Ready to Start Your Reading Journey?</h2>
          <p className={`text-base sm:text-lg ${currentTheme.textMuted} mb-6`}>
            Join thousands of readers who have already discovered their new favorite books
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={showLogin} className="px-6 py-3 text-white font-semibold rounded-full transition-all text-center inline-block bg-gradient-to-r from-red-400 to-orange-600 shadow-lg hover:-translate-y-1">
              Create Free Account
            </button>
            <button onClick={showLogin} className={`px-6 py-3 ${currentTheme.text} font-semibold rounded-full transition-all text-center inline-block ${currentTheme.button}`}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${currentTheme.footer} text-center pb-5 ${currentTheme.textLight}`}>
        <div className="flex justify-center overflow-visible h-[95px]">
          <img
            src={logo}
            alt="Logo"
            className={`h-[120px] w-[120px] transition-transform duration-300 hover:scale-110 ${
              theme === 'light' ? 'filter brightness-90' : 'filter brightness-110'
            }`}
          />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-5 mt-6">
          <a 
            href="https://www.linkedin.com/in/dhruv-gupta-794968244" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`transition-colors duration-300 ${
              theme === 'light'
                ? 'text-gray-600 hover:text-blue-600' 
                : 'text-gray-400 hover:text-blue-400'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
            </svg>
          </a>
          
          <a 
            href="https://github.com/Dhruv3110" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`transition-colors duration-300 ${
              theme === 'light'
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          
          <a 
            href="mailto:dhruvgupta.dg31@gmail.com" 
            className={`transition-colors duration-300 ${
              theme === 'light'
                ? 'text-gray-600 hover:text-red-600' 
                : 'text-gray-400 hover:text-red-400'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
            </svg>
          </a>
        </div>

        <p className="text-sm px-2">&copy; 2025 Readsy. All rights reserved. | Your gateway to infinite stories.</p>
      </footer>
    </div>
  );
};

export default BookVault;