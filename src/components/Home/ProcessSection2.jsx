import React, { useState } from 'react';
import { MessageSquare, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      title: "Requirement & Consultation",
      subtitle: "Discovery Phase",
      desc: "We don't just take orders; we consult. We analyze your business logic, identify technical debt, and define a roadmap that aligns with your long-term ROI.",
      icon: <MessageSquare size={24} />,
      color: "bg-blue-500"
    },
    {
      id: "02",
      title: "Planning & UI/UX",
      subtitle: "Design & Architecture",
      desc: "Before a single line of code is written, we architect the system and design intuitive user journeys that ensure high adoption rates for your software.",
      icon: <PenTool size={24} />,
      color: "bg-purple-500"
    },
    {
      id: "03",
      title: "Development & Testing",
      subtitle: "Engineering Excellence",
      desc: "Our engineers build using modern stacks (React, Node, Cloud Native). We use test-driven development to ensure stability from day one.",
      icon: <Code2 size={24} />,
      color: "bg-[#31b8c6]"
    },
    {
      id: "04",
      title: "Deployment & Support",
      subtitle: "Launch & Optimization",
      desc: "We handle the CI/CD pipeline and cloud deployment. Post-launch, we provide 24/7 monitoring and iterative updates to keep you ahead.",
      icon: <Rocket size={24} />,
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Heading Section */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-[#31b8c6]"></div>
            <span className="text-[#31b8c6] text-xs font-black uppercase tracking-[0.4em]">Efficiency</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase">
            A Better Way <br /> To <span className="text-[#31b8c6]">Build Software.</span>
          </h2>
        </div>

        {/* Interactive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100">
          
          {/* Left Side: Navigation List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-4 p-6 rounded-3xl transition-all duration-300 text-left ${
                  activeStep === index 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-400' 
                  : 'hover:bg-slate-50 text-slate-500'
                }`}
              >
                <span className={`text-sm font-mono ${activeStep === index ? 'text-[#31b8c6]' : 'text-slate-300'}`}>
                  {step.id}
                </span>
                <span className="font-bold uppercase tracking-tight text-lg leading-none">
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Right Side: Display Content */}
          <div className="w-full lg:w-2/3 bg-slate-50 rounded-[2rem] p-8 md:p-12 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            {/* Background Icon Decoration */}
            <div className="absolute -bottom-10 -right-10 text-slate-200/50 scale-[4] rotate-12">
              {steps[activeStep].icon}
            </div>

            <div className="relative z-10 animate-fadeIn">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#31b8c6]/20 bg-[#31b8c6]`}>
                {steps[activeStep].icon}
              </div>
              
              <span className="text-[#31b8c6] font-black uppercase tracking-widest text-xs">
                {steps[activeStep].subtitle}
              </span>
              
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-6 tracking-tight">
                {steps[activeStep].title}
              </h3>
              
              <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                {steps[activeStep].desc}
              </p>

              <button className="mt-10 flex items-center gap-2 font-black text-slate-900 uppercase text-sm group">
                Learn more about this phase 
                <ArrowRight size={18} className="text-[#31b8c6] group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;