import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, User, Clock, Trash2, Reply, ArrowLeft, ChevronLeft, ChevronRight, Check, Copy, MessageSquare, Smartphone, Phone } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../api';
import Pagination from '../components/Pagination';

const Inquiries = () => {

    const [copied, setCopied] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const [inquiries, setInquiries] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    // Track if we are viewing the detail on mobile
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

    const currentPage = parseInt(searchParams.get('page')) || 1;



    const handleCopy = (email) => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        toast.success('Email copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        fetchInquiries();
    }, [currentPage]);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/contact?page=${currentPage}&limit=8`);
            setInquiries(data.data);
            setTotalPages(data.totalPages);

            // On Desktop: Auto-select first if none selected
            if (window.innerWidth > 768 && data.data.length > 0 && !selectedInquiry) {
                setSelectedInquiry(data.data[0]);
            }
        } catch (error) {
            toast.error("Failed to fetch inquiries");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectInquiry = (item) => {
        setSelectedInquiry(item);
        setIsMobileDetailOpen(true); // Switch to detail view on mobile
    };

    const handleBackToList = () => {
        setIsMobileDetailOpen(false);
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* 1. Header - Hidden on Mobile Detail View to save space */}
            <header className={`px-6 py-5 bg-white border-b border-slate-100 shrink-0 ${isMobileDetailOpen ? 'hidden md:block' : 'block'}`}>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">Inbox</h1>
                <p className="text-sm text-slate-500 font-medium">Visitor messages and inquiries</p>
            </header>

            {/* 2. Main Content Area */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* LEFT: List View */}
                <div className={`w-full md:w-[380px] lg:w-[720px] border-r border-slate-100 flex flex-col shrink-0 bg-white transition-all ${isMobileDetailOpen ? 'hidden md:flex' : 'flex'}`}>
                    <div className="flex-1 overflow-y-auto divide-y divide-slate-50 p-2">
                        {loading ? (
                            <div className="p-10 text-center text-slate-400 font-bold animate-pulse">Loading...</div>
                        ) : (
                            inquiries.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => handleSelectInquiry(item)}
                                    className={`mt-2 p-5 cursor-pointer transition-all border border-gray-200  rounded-lg ${selectedInquiry?._id === item._id
                                        ? 'bg-[#DC2626]/5 border-[#DC2626]'
                                        : ' hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1 ">
                                        <h3 className={`text-sm font-bold ${selectedInquiry?._id === item._id ? 'text-[#DC2626]' : 'text-slate-800'}`}>
                                            {item.name}
                                        </h3>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium mb-1 truncate">{item.email}</p>
                                    <p className="text-xs text-slate-400 line-clamp-1 ">{item.message}</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t border-slate-50">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(p) => setSearchParams({ page: p })}
                        />
                    </div>
                </div>

                <main className={`flex-1 bg-white overflow-y-auto flex flex-col z-20 ${isMobileDetailOpen ? 'fixed inset-0 md:relative' : 'hidden md:flex'}`}>
                    {selectedInquiry ? (
                        <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-2 duration-300">

                            {/* 1. Header Area */}
                            <div className="px-6 py-4 md:px-8 md:py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                                <div className="flex items-center gap-4">
                                    <button onClick={handleBackToList} className="md:hidden p-2 -ml-2 text-slate-400 hover:bg-slate-50 rounded-full">
                                        <ArrowLeft size={20} />
                                    </button>

                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-bold text-slate-900 leading-tight">
                                            {selectedInquiry.name}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                            {/* Email with Copy */}
                                            <div className="flex items-center gap-1.5 group">
                                                <span className="text-xs font-medium text-[#DC2626]">{selectedInquiry.email}</span>
                                                <button
                                                    onClick={() => handleCopy(selectedInquiry.email)}
                                                    className="p-0.5 text-slate-300 hover:text-[#DC2626] transition-colors"
                                                >
                                                    {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                                                </button>
                                            </div>

                                            {/* Mobile Number */}
                                            {selectedInquiry.mobile && (
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    {/* Subtle dot separator for desktop */}
                                                    <div className="w-1 h-1 rounded-full bg-slate-200 hidden md:block"></div>

                                                    <div className="flex items-center gap-1.5 group">
                                                        {/* Mobile Icon */}
                                                        <Phone size={12} className="text-slate-400" />

                                                        <span className="text-xs font-medium text-slate-500">
                                                            {selectedInquiry.mobile}
                                                        </span>

                                                        {/* Optional: Tiny copy button for mobile number */}
                                                        <button
                                                            onClick={() => handleCopy(selectedInquiry.mobile)}
                                                            className="p-0.5 text-slate-300 hover:text-[#DC2626] transition-colors"
                                                            title="Copy Mobile"
                                                        >
                                                            {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} className="opacity-0 group-hover:opacity-100" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* 2. Message Content Area */}
                            <div className="flex-1 px-6 py-4 md:px-12 md:py-6 overflow-y-auto ">
                                <div className="max-w-2xl mx-auto">

                                    {/* Metadata & Date */}
                                    <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-2">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                            <Clock size={12} />
                                            <span>{new Date(selectedInquiry.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">
                                            Inquiry #{selectedInquiry._id.slice(-5)}
                                        </span>
                                    </div>

                                    {/* Subject Line */}
                                    <div className="mb-3">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Subject</p>
                                        <h1 className="text-xl md:text-xl font-black text-slate-700 tracking-tight leading-snug">
                                            {selectedInquiry.subject || "No Subject Provided"}
                                        </h1>
                                    </div>

                                    {/* Message Body */}
                                    <div className="mt-8">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Message</p>
                                        <p className="text-slate-700 leading-relaxed text-base md:text-lg whitespace-pre-wrap font-medium">
                                            {selectedInquiry.message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Bottom Action Bar */}
                            <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-3 items-center justify-center">
                                <a
                                    href={`mailto:${selectedInquiry.email}`}
                                    className="w-full sm:w-auto bg-[#DC2626] text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#28a1ad] transition-all shadow-lg shadow-[#DC2626]/10"
                                >
                                    <Reply size={18} /> Reply via Email
                                </a>
                                {selectedInquiry.mobile && (
                                    <a
                                        href={`tel:${selectedInquiry.mobile}`}
                                        className="w-full sm:w-auto bg-white border border-slate-200 text-slate-600 px-8 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                                    >
                                        Call Sender
                                    </a>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-200">
                            <Mail size={40} strokeWidth={1.5} className="mb-2 opacity-20" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Select an inquiry</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Inquiries;