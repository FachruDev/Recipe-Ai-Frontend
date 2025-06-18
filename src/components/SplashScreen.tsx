import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [opacity, setOpacity] = useState(1);
  const [logoScale, setLogoScale] = useState(0.5);
  const [logoRotate, setLogoRotate] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Logo entrance animation
    const logoTimer = setTimeout(() => {
      setLogoScale(1);
      setLogoRotate(360);
    }, 200);

    // Text entrance animation
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 800);

    // Loading progress animation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Start fade out animation
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 800);
    }, duration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-orange-400 to-red-500 flex flex-col items-center justify-center z-50 transition-opacity duration-700 ease-out"
      style={{ opacity }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-white/5 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with advanced animations */}
        <div 
          className="mb-8 relative"
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
            transition: 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          }}
        >
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse"></div>
          
          {/* Main logo */}
          <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <svg 
              className="w-14 h-14 text-orange-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 5a1 1 0 01-1 1H8a1 1 0 110-2h4a1 1 0 011 1zm-1 4a1 1 0 100-2H8a1 1 0 100 2h4z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Rotating border */}
          <div className="absolute -inset-2 border-4 border-white/50 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute -inset-4 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
        </div>

        {/* Text content with slide-up animation */}
        <div 
          className={`text-center transition-all duration-1000 ease-out ${
            textVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-5xl font-bold text-white mb-2 tracking-wide">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>R</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>e</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>c</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>i</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>p</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>e</span>
            <span className="inline-block animate-bounce mx-2" style={{ animationDelay: '0.6s' }}>A</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.7s' }}>I</span>
          </h1>
          
          <p className="text-xl text-white/90 font-light mb-8 tracking-wide">
            Your Smart Recipe Assistant
          </p>
        </div>

        {/* Enhanced loading bar */}
        <div className="w-64 mt-8">
          <div className="flex justify-between text-white/80 text-sm mb-2">
            <span>Loading...</span>
            <span>{Math.round(loadingProgress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-white to-yellow-200 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${loadingProgress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => {
          // Predefined positions to avoid hydration mismatch
          const positions = [
            { top: '25%', left: '15%', duration: '2.3s' },
            { top: '45%', left: '85%', duration: '3.1s' },
            { top: '65%', left: '25%', duration: '2.7s' },
            { top: '35%', left: '75%', duration: '2.9s' },
            { top: '55%', left: '45%', duration: '3.2s' },
            { top: '75%', left: '65%', duration: '2.5s' }
          ];
          
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full animate-ping"
              style={{
                top: positions[i].top,
                left: positions[i].left,
                animationDelay: `${i * 0.5}s`,
                animationDuration: positions[i].duration
              }}
            ></div>
          );
        })}
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 fill-white/10"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="animate-pulse"></path>
        </svg>
      </div>
    </div>
  );
}