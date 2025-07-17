import logo from '../../assets/logo.svg'
const StatsSection = ({ theme }) => {
  const isLight = theme === 'light';

  return (
    <div className={`relative z-10 py-16 backdrop-blur-sm ${
      isLight ? 'bg-white/80 border-t border-gray-200' : 'bg-black/30 border-t border-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-purple-500">75K+</div>
            <div className={isLight ? 'text-gray-700' : 'text-gray-300'}>Books Available</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-500">2M+</div>
            <div className={isLight ? 'text-gray-700' : 'text-gray-300'}>Active Readers</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-500">100K+</div>
            <div className={isLight ? 'text-gray-700' : 'text-gray-300'}>Total Share</div>
          </div>

          {/* Footer */}
          <div className={`col-span-1 md:col-span-3 mt-8 pt-4 ${
            isLight ? 'border-t border-gray-300' : 'border-t border-gray-700'
          }`}>
            {/* <div className="flex-shrink-0 mb-4">
              <h1 className={`text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <span className="text-purple-500">READ</span>SY
              </h1>
            </div> */}
            <div className="flex justify-center overflow-visible h-[120px]">
              <img
                src={logo}
                alt="Logo"
                className={`h-[120px] w-[120px] transition-transform duration-300 hover:scale-110 ${
                  theme === 'light' ? 'filter brightness-90' : 'filter brightness-110'
                }`}
              />
                    </div>
            
            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-4">
              <a 
                href="https://www.linkedin.com/in/dhruv-gupta-794968244" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isLight 
                    ? 'text-gray-600 hover:text-blue-600' 
                    : 'text-gray-400 hover:text-blue-400'
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a 
                href="https://github.com/Dhruv3110" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isLight 
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
                  isLight 
                    ? 'text-gray-600 hover:text-red-600' 
                    : 'text-gray-400 hover:text-red-400'
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </a>
            </div>
            
            <div className={isLight ? 'text-gray-600' : 'text-gray-400'}>
              &copy; 2025 Readsy. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;