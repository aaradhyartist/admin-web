import React, { useState } from 'react';
import { ExternalLink, Layout, Smartphone, Database, ArrowRight } from 'lucide-react';
import NewsletterModal from './NewsletterModal';

const WorkShowcase = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = [
    "All",
    "Healthcare",
    "Real Estate",
    "E-Commerce",
    "Education",
    "Finance",
    "Service Business"
  ];

  const templates = [
    {
      title: "Clinic Management System",
      category: "Healthcare",
      desc: "Appointment booking, patient records, and admin dashboard for clinics.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
      tech: "React • Node • MongoDB",
    },
    {
      title: "Real Estate Listing Platform",
      category: "Real Estate",
      desc: "Property listings, agent profiles, and inquiry management system.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      tech: "Next.js • API • Dashboard",
    },
    {
      title: "Online Store Front",
      category: "E-Commerce",
      desc: "Product catalog, cart flow, and admin product management.",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514",
      tech: "React • Stripe Ready",
    },
    {
      title: "Coaching / Institute Website",
      category: "Education",
      desc: "Course listings, inquiry forms, and admin-managed content.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      tech: "CMS • Responsive UI",
    },
    {
      title: "Finance Dashboard",
      category: "Finance",
      desc: "Reports, charts, and secure role-based access control.",
      image: "https://images.unsplash.com/photo-1551288049-bbbda546697a",
      tech: "Secure • Scalable",
    },
    {
      title: "Service Business Website",
      category: "Service Business",
      desc: "Lead generation website with WhatsApp and contact forms.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      tech: "SEO • Fast Load",
    },
  ];
  const filterdTamplates = selectedCategory === "All" ? templates : templates.filter((template) => (template?.category === selectedCategory))

  return (
    <section className="w-full bg-white py-10 lg:py-14 px-0 sm:px-6 md:px-12 lg:px-24 ">
      <div className="mx-auto px-6 lg:px-16">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-[2px] w-10 bg-[#31b8c6]"></div>
              <span className="text-[#31b8c6] text-xs font-black uppercase tracking-[0.4em]">
                Demo Projects
              </span>


            </div>


            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              Web Templates & <br /> <span className="text-[#31b8c6]">Sample Projects.</span>
            </h2>

          </div>

        </div>
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              onClick={() => { setSelectedCategory(cat) }}
              key={cat}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-slate-200 text-slate-600 ${selectedCategory === cat ? "bg-[#31b8c6] text-white " : ""} hover:cursor-pointer hover:bg-slate-200 hover:text-black transition-all`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* The Grid - Highly Dense and Filled */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterdTamplates.map((project, index) => (
            <div key={index} className="group relative bg-slate-50 rounded-[1.5rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200">

              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <button className="bg-white text-slate-900 p-4 rounded-full shadow-xl">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 bg-white rounded-lg text-[#31b8c6] shadow-sm">
                    {project.icon}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {project.category}
                  </span>
                </div>

                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#31b8c6] transition-colors">
                  {project.title}
                </h4>

                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {project.desc}
                </p>
              </div>

              {/* Bottom Accent Bar */}
              <div className="h-1.5 w-0 bg-[#31b8c6] group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Secondary "Filled" Layout Feature */}
        <div className="mt-12 p-10 bg-slate-900 rounded-[2rem] flex flex-col lg:flex-row items-center justify-between gap-8">

          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#31b8c6]/10 flex items-center justify-center text-[#31b8c6] border border-[#31b8c6]/20">
              <Layout size={32} />
            </div>

            <div className="text-white">
              <h4 className="text-lg font-bold tracking-tight">
                Stay Updated with New Templates
              </h4>
              <p className="text-slate-400 text-sm font-medium max-w-sm">
                Get updates when we release new industry-specific templates, case
                studies, and product improvements.
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="hover:cursor-pointer px-8 py-4 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#31b8c6] hover:text-white transition-all whitespace-nowrap"
          >
            Subscribe for Updates
          </button>

        </div>
      </div>

      <NewsletterModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default WorkShowcase;