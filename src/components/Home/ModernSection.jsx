import React from 'react';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

const ModernHero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
          alt="Modern Office" 
          className="w-full h-full object-cover"
        />
        {/* Dark to Light Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-[#31b8c6]/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-[#31b8c6] animate-pulse"></span>
            Innovative Software for 2025
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            Innovate. Scale. <br />
            <span className="text-[#31b8c6]">Transform.</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
            Empower your business with cutting-edge software solutions. We bridge the gap between 
            complex technology and seamless user experiences.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="group px-8 py-4 bg-[#31b8c6] hover:bg-[#28a7b4] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#31b8c6]/30">
              Get Started 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold transition-all">
              Learn More
            </button>
          </div>

          {/* Features / Benefits */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 text-white/80">
              <CheckCircle2 className="text-[#31b8c6]" size={24} />
              <span className="text-lg font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <CheckCircle2 className="text-[#31b8c6]" size={24} />
              <span className="text-lg font-medium">High Performance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </section>
  );
};

export default ModernHero;