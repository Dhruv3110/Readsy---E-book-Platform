// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import BookVault from './components/BookVault/BookVault';
import MainApp from './components/Dashboard/MainApp';
import CombinedAuthPage from './components/LoginRegisterPage/CombinedAuthPage';
import Navigation from './components/Dashboard/Navigation';
import StatsSection from './components/Dashboard/StatsSection';
import Favourites from './components/Favourite/Favourites';
import ProtectedRoute from './components/LoginRegisterPage/ProtectedRoute';
import ThemeProvider from './components/BookVault/ThemeProvider';

const Wrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🆕 Theme state for Navigation
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const handleBackToHome = () => navigate('/');

  const showNavigation = location.pathname !== '/auth' && location.pathname !== '/';

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${
      theme === 'light'
        ? 'from-white via-gray-200 to-white'
        : 'from-slate-900 via-purple-900 to-slate-900'
    }`}>
      {showNavigation && (
        <Navigation
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          theme={theme}
          setTheme={setTheme}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider key="vault">
              <BookVault />
            </ThemeProvider>
          }
        />
        <Route path="/auth" element={<CombinedAuthPage onBackToHome={handleBackToHome} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainApp theme={theme} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favourites theme={theme} />
            </ProtectedRoute>
          }
        />
      </Routes>
      {showNavigation && <StatsSection theme={theme} />}
    </div>
  );
};


const App = () => (
  <Router>
    <Wrapper />
  </Router>
);

export default App;
