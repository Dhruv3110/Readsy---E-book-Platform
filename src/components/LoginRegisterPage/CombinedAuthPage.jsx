import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/loginUser';
import { registerUser } from '../../utils/registerUser';
import {
  BookOpen, Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check, Settings, Sun, Moon, Monitor, ChevronDown
} from 'lucide-react';
import logo from '../../assets/logo.svg'
import logo1 from '../../assets/logo1.svg';
const CombinedAuthPage = ({ onBackToHome }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agreeToTerms: false, rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('auto');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Theme management
  useEffect(() => {
    const savedTheme = theme;
    applyTheme(savedTheme);
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(selectedTheme === 'dark');
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setShowThemeDropdown(false);
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Monitor }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';

    if (isLogin) {
      if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    } else {
      if (formData.firstName.trim() === '') newErrors.firstName = 'First name is required';
      if (formData.lastName.trim() === '') newErrors.lastName = 'Last name is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Must contain uppercase, lowercase, and number';
      }
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    setIsLoading(true);

    try {
      if (isLogin) {
        const user = await loginUser(formData);
        localStorage.setItem("user", JSON.stringify(user));
        alert(`Welcome back, ${user.firstName}!`);
        navigate('/dashboard');
      } else {
        const { userId } = await registerUser(formData);
        alert('Registration successful!');
      }
    } catch (error) {
      alert(`${isLogin ? 'Login' : 'Registration'} failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const currentThemeIcon = themeOptions.find(option => option.value === theme)?.icon || Monitor;
  const CurrentThemeIcon = currentThemeIcon;

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    } flex items-center justify-center p-4`}>
      <div className="max-w-md w-full">
        <div className={`rounded-2xl shadow-xl p-8 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-100'
        }`}>
          {/* Header with Theme Selector */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onBackToHome} 
              className={`inline-flex items-center transition-colors ${
                isDarkMode 
                  ? 'text-indigo-400 hover:text-indigo-300' 
                  : 'text-indigo-600 hover:text-indigo-700'
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </button>
            
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className={`inline-flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-4 w-4 mr-2" />
                <CurrentThemeIcon className="h-4 w-4 mr-1" />
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {showThemeDropdown && (
                <div className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg z-50 ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                }`}>
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleThemeChange(option.value)}
                        className={`w-full px-4 py-2 text-left flex items-center transition-colors ${
                          theme === option.value 
                            ? (isDarkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-50 text-indigo-600')
                            : (isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700')
                        } ${option.value === 'light' ? 'rounded-t-lg' : ''} ${option.value === 'auto' ? 'rounded-b-lg' : ''}`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="flex items-center overflow-visible h-[40px] mb-3">
                <img
                  src={logo1}
                  alt="Logo"
                  className={`h-[80px] w-[80px] transition-transform duration-300 hover:scale-110 ${
                    theme === 'light' ? 'filter brightness-90' : 'filter brightness-110'
                  }`}
                />
              </div>
              <div className="flex items-center overflow-visible h-[40px]">
                <img
                  src={logo}
                  alt="Logo"
                  className={`h-[120px] w-[120px] transition-transform duration-300 hover:scale-110 ${
                    theme === 'light' ? 'filter brightness-90' : 'filter brightness-110'
                  }`}
                />
              </div>
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {isLogin ? 'Sign in to continue your journey' : 'Join thousands of readers today'}
            </p>
          </div>

          <div onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>First Name</label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      placeholder="First name"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors ${
                        errors.firstName 
                          ? 'border-red-500' 
                          : (isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900')
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`} 
                    />
                  </div>
                  {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    placeholder="Last name"
                    className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                      errors.lastName 
                        ? 'border-red-500' 
                        : (isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900')
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`} 
                  />
                  {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Email Address</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors ${
                    errors.email 
                      ? 'border-red-500' 
                      : (isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900')
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`} 
                />
              </div>
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-colors ${
                    errors.password 
                      ? 'border-red-500' 
                      : (isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900')
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  )}
                </button>
              </div>
              {formData.password && !isLogin && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`h-1 flex-1 rounded ${
                        i < getPasswordStrength() 
                          ? strengthColors[getPasswordStrength() - 1] 
                          : (isDarkMode ? 'bg-gray-600' : 'bg-gray-200')
                      }`} />
                    ))}
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Strength: {strengthLabels[getPasswordStrength() - 1] || 'Very Weak'}
                  </p>
                </div>
              )}
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Confirm Password</label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    placeholder="Confirm password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-colors ${
                      errors.confirmPassword 
                        ? 'border-red-500' 
                        : (isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900')
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`} 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    ) : (
                      <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    )}
                  </button>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isLoading} 
              className={`w-full py-3 rounded-lg font-semibold transition-all hover:shadow-xl disabled:opacity-50 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              }`}
            >
              {isLoading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </div>

          <div className="mt-6 text-center">
            {isLogin ? (
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Don't have an account?{' '}
                <button 
                  onClick={() => setIsLogin(false)} 
                  className={`font-semibold transition-colors ${
                    isDarkMode 
                      ? 'text-indigo-400 hover:text-indigo-300' 
                      : 'text-indigo-600 hover:text-indigo-700'
                  }`}
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Already have an account?{' '}
                <button 
                  onClick={() => setIsLogin(true)} 
                  className={`font-semibold transition-colors ${
                    isDarkMode 
                      ? 'text-indigo-400 hover:text-indigo-300' 
                      : 'text-indigo-600 hover:text-indigo-700'
                  }`}
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedAuthPage;