import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ProfessionalServiceHero = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-slate-50 flex items-center overflow-hidden lg:px-16 lg:pt-20 sm:pt-20">

      {/* --- THE TEXT CONTENT (Z-INDEX 20 TO STAY ABOVE IMAGE) --- */}
      <div className="relative z-20 w-full  mx-auto px-8  lg:px-24 lg:px-24 grid lg:grid-cols-2">
        <div className="">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-[2px] w-10 bg-[#31b8c6]"></div>
            <span className="text-[#31b8c6] text-xs font-black uppercase tracking-[0.4em]">  Our Services</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Software Services<span className="text-slate-300"> Built for Growth.</span>
          </h2>


          <p className="text-slate-600 text-xl font-medium leading-relaxed mb-10 max-w-lg mt-5">
            We design, build, and maintain modern web applications
            that are fast, secure, and easy to scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <a
              href={`https://wa.me/91${import.meta.env.VITE_APP_ADMIN_WHATSAPP_NUMBER}?text=Hello,%20I%E2%80%99m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20the%20next%20steps.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#31b8c6] transition-all flex items-center gap-3"
            >
              Chat on WhatsApp <ArrowRight size={18} />
            </a>

            <div className="flex items-center gap-3 px-2">
              <CheckCircle2 className="text-[#31b8c6]" size={20} />
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Direct With Developer
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* --- THE IMAGE WITH GRADIENT MASK (RIGHT SIDE) --- */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10">
        <div className="relative w-full h-full">
          {/* The Image */}
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80"
            alt="Corporate Engineering"
            className="w-full h-full object-cover grayscale-[30%]"
          />


          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent"></div>

          {/* Subtle Right-side fade (Optional: if you want it to fade out on the far right too) */}
          <div className="absolute inset-0 bg-gradient-to-l from-slate-50/20 to-transparent"></div>
        </div>
      </div>

    </section>
  );
};

export default ProfessionalServiceHero;