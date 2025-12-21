import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ArrowRight } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for background blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Service', href: '/service' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={` fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-2' : 'top-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar Container */}
        <div className={`
          relative flex items-center justify-between h-20 px-6 transition-all duration-500 
          ${scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/40 rounded-2xl'
            : 'bg-white/40 backdrop-blur-md border border border-gray-200 rounded-[2rem]'}
        `}>

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to={"/"} className='lex-shrink-0 flex items-center gap-2'>
             <div className="w-10 h-10 bg-[#31b8c6] rounded-xl flex items-center justify-center font-black text-slate-100">
               AA
              </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
              {"Aaradhy" || import.meta.env.VITE_APP_NAME}<span className="text-[#31b8c6]">Artist</span>
            </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10 ">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-bold uppercase tracking-widest transition-colors
      ${isActive ? 'text-[#31b8c6]' : 'text-slate-600 hover:text-[#31b8c6]'}`
                }
              >
                {link.name}
              </NavLink>
            ))}

          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            {/* <button className="text-sm font-bold text-slate-900 px-4">Login</button> */}
            <Link to="/contact" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#31b8c6] transition-all duration-300">
              Contact <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`
          md:hidden absolute left-4 right-4 mt-2 transition-all duration-300 transform origin-top
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
        `}>
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-lg font-bold rounded-xl transition-all
      ${isActive
                    ? 'text-[#31b8c6] bg-slate-50'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#31b8c6]'}`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="h-[1px] bg-slate-100 my-2"></div>
            {/* <button className="w-full py-4 text-[#31b8c6] font-bold">Login</button> */}
            <Link to={"/contact"} className="w-full px-5 py-4 bg-[#31b8c6] text-white rounded-xl font-bold shadow-lg shadow-[#31b8c6]/20">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;