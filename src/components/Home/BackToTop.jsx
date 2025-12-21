import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0, make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          group flex items-center justify-center w-12 h-12 
          bg-slate-900 text-[#31b8c6] rounded-xl border border-slate-800
          hover:bg-[#31b8c6] hover:text-white hover:shadow-2xl hover:shadow-[#31b8c6]/40
          transition-all duration-500 ease-in-out outline-none
        `}
        aria-label="Back to top"
      >
        <ArrowUp 
          size={24} 
          className="group-hover:-translate-y-1 transition-transform duration-300" 
        />
        
        {/* Subtle Ring Animation */}
        <span className="absolute inset-0 rounded-xl border-2 border-[#31b8c6] animate-ping opacity-20 group-hover:hidden"></span>
      </button>
    </div>
  );
};

export default BackToTop;