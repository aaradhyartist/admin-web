import React from 'react';
import { MessageSquare, PenTool, Code2, Rocket } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Consultation",
      desc: "We understand your business needs and goals to find the right solution.",
      icon: <MessageSquare size={24} />,
    },
    {
      number: "02",
      title: "Planning & Design",
      desc: "We create intuitive designs and clear plans so your software is easy to use and maintain.",
      icon: <PenTool size={24} />,
    },
    {
      number: "03",
      title: "Development & Testing",
      desc: "We build your software carefully, ensuring it works smoothly and reliably.",
      icon: <Code2 size={24} />,
    },
    {
      number: "04",
      title: "Launch & Support",
      desc: "We deploy your solution and provide ongoing help to keep it running and improving.",
      icon: <Rocket size={24} />,
    },
  ];

  return (
    <section className="w-full bg-white py-24 px-0 sm:px-6 md:px-12 lg:px-24 border-b border-slate-100">
      <div className="mx-auto px-6 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-[#31b8c6]"></div>
            <span className="text-[#31b8c6] text-xs font-black uppercase tracking-[0.4em]">How We Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
            OUR STEP-BY-STEP <span className="text-[#31b8c6]">PROCESS.</span>
          </h2>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Horizontal line behind steps */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-slate-100 z-0">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-[#31b8c6]/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group flex flex-col items-center lg:items-start">
                
                {/* Icon & Number */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full bg-white border-2 flex items-center justify-center text-slate-400 border-[#31b8c6] group-hover:text-[#31b8c6] transition-all duration-500 shadow-xl shadow-slate-100 group-hover:shadow-[#31b8c6]/20 group-hover:-translate-y-2 relative z-10">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center border-2 border-white group-hover:bg-[#31b8c6] z-20">
                    {step.number}
                  </div>
                </div>

                {/* Text */}
                <div className="text-center lg:text-left relative z-10 bg-white">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3 group-hover:text-[#31b8c6] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium lg:pr-4">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
