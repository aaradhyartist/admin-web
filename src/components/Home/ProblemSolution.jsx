import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const ProblemAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

 const data = [
  { 
    q: "Manual work slowing your business",
    a: "We automate repetitive tasks and data entry so your team can focus on real work instead of wasting hours on manual processes."
  },
  { 
    q: "Apps that break as you grow",
    a: "We build and improve software that stays fast and stable as your users, data, and features increase."
  },
  { 
    q: "No clear admin or dashboard",
    a: "We create custom admin panels and dashboards that help you manage users, track activity, and understand your business better."
  },
  { 
    q: "Security and performance problems",
    a: "We focus on secure development and performance best practices to keep your application safe, reliable, and fast."
  }
];


  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Managed Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-[#31b8c6]"></div>
            <span className="text-[#31b8c6] text-xs font-black uppercase tracking-[0.4em]">Your Challenges</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
           We Help You Solve  <br />
             <span className="text-[#31b8c6]">Them?</span>
          </h2>
        </div>
        
        <div className="border-t border-gray-800">
          {data.map((item, i) => {
            const isOpen = openIndex === i;
            
            return (
              <div key={i} className="border-b border-gray-800 transition-colors duration-500">
                <button 
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full py-10 flex items-start justify-between group outline-none"
                >
                  {/* Grid layout ensures '01' and 'Question' are perfectly spaced */}
                  <div className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr] items-start text-left gap-4">
                    <span className={`text-sm md:text-base font-mono mt-1.5 transition-colors duration-500 ${isOpen ? 'text-[#31b8c6]' : 'text-gray-600'}`}>
                      0{i + 1}
                    </span>
                    <h4 className={`text-xl md:text-3xl font-bold transition-all duration-500 tracking-tight pr-4 ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                      {item.q}
                    </h4>
                  </div>

                  {/* Icon remains fixed at the top right of the row */}
                  <div className={`hover:cursor-pointer mt-1 p-2 rounded-full border transition-all duration-500 shrink-0 ${isOpen ? 'border-[#31b8c6] bg-[#31b8c6] rotate-180' : 'border-gray-700 rotate-0'}`}>
                    {isOpen ? <Minus size={20} className="text-gray-900" /> : <Plus size={20} className="text-gray-400" />}
                  </div>
                </button>

                {/* Answer Section */}
                <div 
                  className="overflow-hidden transition-all duration-700 ease-in-out"
                  style={{ 
                    maxHeight: isOpen ? '250px' : '0px', 
                    opacity: isOpen ? '1' : '0' 
                  }}
                >
                  {/* We match the grid of the button so the text starts at the exact same 'X' position as the question */}
                  <div className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr] gap-4 pb-12">
                    <div></div> {/* Empty div to skip the '01' column */}
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-4xl border-l border-gray-800 pl-8">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemAccordion;