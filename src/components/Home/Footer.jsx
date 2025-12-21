import React from 'react';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
import { href, Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#31b8c6] rounded-xl flex items-center justify-center font-black text-slate-900">
                AA
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                Aaradhy<span className="text-[#31b8c6]">Artist</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-sm">
              We build practical, scalable software for startups and growing businesses —
              focused on clean architecture, performance, and real business outcomes.
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Github size={18} />, href: "https://github.com/yourname" },
                { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/yourname" },
                { icon: <Twitter size={18} />, href: "https://twitter.com/yourname" },
                { icon: <Facebook size={18} />, href: 'https://twitter.com/yourname' }

              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#31b8c6] hover:text-slate-900 transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>


          {/* Services Column */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">
              Services
            </h4>

            <ul className="flex flex-col gap-4 text-sm font-bold">
              {[
                { label: "Web Development", href: "#web-development" },
                { label: "Mobile Apps", href: "#mobile-apps" },
                { label: "Backend & APIs", href: "#backend" },
                { label: "UI/UX Design", href: "#uiux" },
                { label: "Cloud & DevOps", href: "#cloud-devops" }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-[#31b8c6] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Company</h4>
            <ul className="flex flex-col gap-4 text-sm font-bold">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Service", href: "/service" },
                { label: "Contact", href: "/contact" },
              ]
                .map((link) => (
                  <li key={link.label}>
                    <Link to={link?.href} className="hover:text-[#31b8c6] transition-colors">{link.label}</Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Get In Touch</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-[#31b8c6] shrink-0" />
                <span className="text-sm font-medium">Palda Indore, Madhya Pradesh 452001 ,  india</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-[#31b8c6] shrink-0" />
                <span className="text-sm font-medium">{import.meta.env.VITE_APP_WORK_EMAIL}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-[#31b8c6] shrink-0" />
                <span className="text-sm font-medium">+91 {import.meta.env.VITE_APP_MOBILE_NUMBER}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            © {currentYear} {import.meta.env.VITE_APP_NAME}. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;