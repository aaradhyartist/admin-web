import React from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Compact Box: Reduced padding from p-20 to p-10/12 */}
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 shadow-2xl">

          {/* Animated Background Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#31b8c6] opacity-20 blur-[80px] group-hover:opacity-30 transition-opacity duration-700"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600 opacity-10 blur-[80px]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Left Side: Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                <Sparkles size={14} className="text-[#31b8c6]" />
                <span className="text-[#31b8c6] text-[10px] font-black uppercase tracking-[0.3em]">
                  Limited Spots
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight uppercase">
                Ready to Build <br />
                <span className="text-[#31b8c6]">Your Next Project?</span>
              </h2>

              <p className="mt-4 text-slate-400 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                Let’s turn your idea into software that works. Join 50+ businesses who trusted us to deliver solutions that actually perform.
              </p>
            </div>

            {/* Right Side: Action - Minimized height impact */}
            <div className="flex flex-col items-center lg:items-end shrink-0">
              <Link to={"/contact"} className="group relative px-8 py-5 bg-[#31b8c6] hover:bg-white text-slate-900 font-black uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center gap-3 hover:-translate-y-1 shadow-lg shadow-[#31b8c6]/20">
                <span className="flex items-center gap-2">
                  Start Project <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700"></div>
                  ))}
                </div>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tight">
                  50+ businesses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;