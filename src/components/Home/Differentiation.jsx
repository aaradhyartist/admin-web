import React from 'react';
import { Rocket, Users, ShieldCheck, Zap, Layers, LifeBuoy, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Differentiation = () => {
 const secondaryPoints = [
  {
    title: "Experienced Team",
    desc: "Work with skilled engineers who deliver reliable solutions.",
    icon: <Users size={20} />
  },
  {
    title: "Transparent Pricing",
    desc: "Clear, upfront costs with no hidden fees.",
    icon: <ShieldCheck size={20} />
  },
  {
    title: "Post-Launch Support",
    desc: "Ongoing help to maintain and improve your software after launch.",
    icon: <LifeBuoy size={20} />
  }
];


  return (
    <section className="w-full bg-[#31b8c6] py-24 px-0 sm:px-6 md:px-12 lg:px-24 lg:py-32 overflow-hidden relative">
      {/* Subtle Background Pattern to add texture to the cyan */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="w-full px-6 lg:px-16 relative z-10">
        
        {/* Header - White text for high contrast */}
        <div className="max-w-4xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-white"></div>
            <span className="text-white text-xs font-black uppercase tracking-[0.4em]">Why We Are Different</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase">
           We Build Software That <br />
            <span className="text-slate-900/40">Actually Works</span>
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: The "Scalability" Card (Dark/Modern) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-[3rem] p-10 lg:p-14 text-white flex flex-col justify-between group shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 border border-white/10">
                <Zap size={16} className="text-[#31b8c6]" />
                <span className="text-[10px] font-black uppercase tracking-widest">Performance Focus</span>
              </div>
              <h3 className="text-3xl font-bold mb-6">Reliable & Scalable Systems</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                We build software that grows with your business. From handling more users to heavy workloads, our systems stay fast and stable.
              </p>
              <ul className="space-y-4">
                {["Stable infrastructure", "Automatic error handling", "Smooth user experience"].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#31b8c6] flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Stacked White Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Speed Card */}
            <div className="bg-white rounded-[2.5rem] p-8 flex items-center justify-between group hover:translate-y-[-5px] transition-transform duration-300 shadow-xl">
              <div className="max-w-[70%]">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Faster Launches</h3>
                <p className="text-slate-500 text-sm font-medium">Get your software live quicker with our proven development approach.</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#31b8c6]/10 flex items-center justify-center text-[#31b8c6]">
                <Rocket size={32} />
              </div>
            </div>

            {/* List of points Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 space-y-8 shadow-xl">
              {secondaryPoints.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 text-[#31b8c6]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Final White-Button CTA */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6">
           <p className="text-white font-bold">Ready to see how we can help?</p>
           <Link to="/contact" className="px-10 py-5 bg-white text-[#31b8c6] rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3 group">
             Get Your Proposal<ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;