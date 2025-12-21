import React from 'react';
import { Code2, Database, Smartphone, Share2, Cloud, ArrowUpRight, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const modules = [
    {
      title: "Custom Software",
      description: "We build software tailored to your business needs — websites, dashboards, and tools that actually work.",
      icon: <Code2 size={24} />,
      tag: "Development"
    },
    {
      title: "Web & SaaS Apps",
      description: "Scalable web platforms that grow with your business, from first launch to thousands of users.",
      icon: <Database size={24} />,
      tag: "Product"
    },
    {
      title: "Mobile Apps",
      description: "iOS and Android apps that run smoothly and delight your users.",
      icon: <Smartphone size={24} />,
      tag: "Mobile"
    },
    {
      title: "API & Integrations",
      description: "Connect your tools and systems seamlessly so your business runs without friction.",
      icon: <Share2 size={24} />,
      tag: "Connectivity"
    },
    {
      title: "Automation Tools",
      description: "Automate repetitive tasks and workflows to save time and reduce errors.",
      icon: <Cpu size={24} />,
      tag: "Efficiency"
    }
  ];


  return (
    <section className="w-full bg-white py-24 px-0 sm:px-6 md:px-12 lg:px-24  border-b border-slate-100">
      <div className="w-full px-6 lg:px-16">

        {/* Header - Compact but Powerful */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#31b8c6]"></div>
              <span className="text-[#31b8c6] text-[10px] font-black uppercase tracking-[0.3em]">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              What We Build for Your <span className="text-[#31b8c6]"> Business.</span>
            </h2>
          </div>
          <Link to="/service" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#31b8c6] transition-colors flex items-center gap-2">
            View All Services <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Services Grid - 4 Columns on XL screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((item, index) => (
            <div
              key={index}
              className="group p-8 bg-slate-50 rounded-[2rem] border  border-gray-300 hover:border-[#31b8c6] hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                {/* Header: Icon and Tag */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#31b8c6] shadow-sm group-hover:bg-[#31b8c6] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Minimal Footer */}
              <div className="mt-6 flex items-center gap-2 text-[#31b8c6] hover:cursor-pointer group-hover:opacity-100 transition-opacity">
                <span className="text-[15px] hover:text-gray-400 font-black uppercase tracking-tighter">Details</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}

          {/* Compact CTA Card */}
          <div className="p-8 bg-slate-900 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group cursor-pointer min-h-[280px] ">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Want a software solution that fits your business?
              </h3>
              <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest bg-[#31b8c6] text-white px-5 py-3 rounded-xl hover:scale-105 transition-transform">
                Contact Us
              </Link>
            </div>
            {/* Visual background element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#31b8c6]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;