import {
  Menu, X, Heart, Home, LogOut, Settings,
  ChevronDown, Sun, Moon
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import logo from "../../assets/logo.svg"
const Navigation = ({ isMenuOpen, setIsMenuOpen, theme, setTheme }) => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const navLinks = [
    { name: "Home", icon: <Home className="w-5 h-5 mr-2" />, path: "/dashboard" },
    { name: "Favorites", icon: <Heart className="w-5 h-5 mr-2" />, path: "/favorites" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("bookCache");
    sessionStorage.removeItem("favoriteBooksCache");
    localStorage.removeItem("user");
    navigate('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ${
      theme === 'light'
        ? 'bg-white/80 border-black/10'
        : 'bg-black/30 border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover animation */}
          {/* logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className={`h-[120px] w-[120px] transition-transform duration-300 hover:scale-110 ${
                theme === 'light' ? 'filter brightness-90' : 'filter brightness-110'
              }`}
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden min-[769px]:flex space-x-5 items-center">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`group relative px-3 py-2 rounded-md text-sm font-medium 
                            flex items-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-black '
                    : 'text-gray-300 hover:text-white '
                }`}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {link.icon}
                </span>
                {link.name}
                {/* Animated underline */}
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full`}></div>
              </Link>
            ))}

            {/* Settings Dropdown */}
            <div
              className={`relative pl-4 transition-all duration-300 ${
                theme === 'light' ? 'border-l border-black/10' : 'border-l border-white/10'
              }`}
              ref={settingsRef}
            >
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`group relative px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-black '
                    : 'text-gray-300 hover:text-white '
                }`}
              >
                <Settings className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                Settings
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-all duration-300 ${
                    isSettingsOpen ? 'rotate-180 scale-110' : 'group-hover:translate-y-0.5'
                  }`}
                />
                {/* Animated underline */}
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full`}></div>
              </button>

              {/* Dropdown with smooth animation */}
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 border transition-all duration-300 transform origin-top ${
                isSettingsOpen 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              } ${
                theme === 'light'
                  ? 'bg-white text-gray-800 border-gray-200'
                  : 'bg-black/90 text-gray-300 border-white/20'
              }`}>
                <button
                  onClick={toggleTheme}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center transition-all duration-200 transform hover:scale-105 hover:translate-x-1 ${
                    theme === 'light'
                      ? 'hover:bg-gray-100 text-gray-700 hover:text-black'
                      : 'hover:bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4 mr-2 transition-transform duration-300 hover:rotate-12" />
                      Dark Theme
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 mr-2 transition-transform duration-300 hover:rotate-90" />
                      Light Theme
                    </>
                  )}
                </button>

                <hr className={`my-1 transition-colors duration-300 ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`} />

                <button
                  onClick={() => {
                    setIsSettingsOpen(false);
                    handleLogout();
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center transition-all duration-200 transform hover:scale-105 hover:translate-x-1 ${
                    theme === 'light'
                      ? 'hover:bg-gray-100 text-gray-700 hover:text-black'
                      : 'hover:bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <LogOut className="w-4 h-4 mr-2 transition-transform duration-300 hover:translate-x-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button with animation */}
          <div className="min-[769px]:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-all duration-300 transform hover:scale-110 hover:rotate-3 ${
                theme === 'light'
                  ? 'text-gray-700 hover:text-black hover:bg-gray-100/50'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Menu"
            >
              <div className="relative">
                <Menu className={`w-6 h-6 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <X className={`w-6 h-6 absolute top-0 left-0 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown with smooth slide animation */}
        <div className={`min-[769px]:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`mt-2 pb-4 border-t transition-all duration-300 ${
            theme === 'light' ? 'border-black/10' : 'border-white/10'
          } space-y-1`}>
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`group px-4 py-2 text-sm font-medium flex items-center transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-black hover:bg-gray-100/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                } `}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {link.icon}
                </span>
                {link.name}
              </Link>
            ))}

            {/* Mobile Settings */}
            <div className={`pt-2 mt-2 border-t transition-all duration-300 ${
              theme === 'light' ? 'border-black/10' : 'border-white/10'
            }`}>
              <div className="px-4 py-2">
                <span className={`text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Settings
                </span>
              </div>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  toggleTheme();
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-black hover:bg-gray-100/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-5 h-5 mr-2 transition-transform duration-300 hover:rotate-12" />
                    Dark Theme
                  </>
                ) : (
                  <>
                    <Sun className="w-5 h-5 mr-2 transition-transform duration-300 hover:rotate-90" />
                    Light Theme
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                  theme === 'light'
                    ? 'text-gray-700 hover:text-black hover:bg-gray-100/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={{ 
                  animationDelay: `${navLinks.length * 100 + 200}ms`,
                  animation: isMenuOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                }}
              >
                <LogOut className="w-5 h-5 mr-2 transition-transform duration-300 hover:translate-x-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;