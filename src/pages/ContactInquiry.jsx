import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Trash2, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';

const Inquiries = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inquiries, setInquiries] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
    const [copiedField, setCopiedField] = useState(null);

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
    useEffect(() => {
        fetchInquiries();
    }, [currentPage]);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/contact?page=${currentPage}&limit=8`);
            setInquiries(data.results);

            setTotalPages(data?.totalPages);
            setTotalData(data?.total || 0)
            if (window.innerWidth > 768 && data.results.length && !selectedInquiry) {
                setSelectedInquiry(data.results[0]);
            }
        } catch {
            toast.error('Failed to load inquiries');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await api.delete(`/contact/${deleteModal.id}`);
            setDeleteModal({ isOpen: false, id: null });
            fetchInquiries()
            toast.success("inquiry deleted")
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCopy = (value, field) => {
        navigator.clipboard.writeText(value);
        setCopiedField(field);
        toast.success('Copied');
        setTimeout(() => setCopiedField(null), 1500);
    };

    return (
        <div className="flex h-screen  gap-4 p-4">
            {/* LIST CARD */}
            <div
                className={`w-full md:w-[68%] bg-white border border-slate-200 rounded-lg flex flex-col ${isMobileDetailOpen ? 'hidden md:flex' : ''
                    }`}
            >
                <div className="px-6 py-4 border-b border-slate-200">
                    <h1 className="text-xl font-semibold text-slate-800">
                        Contact Inquiries
                    </h1>
                </div>

                {/* HORIZONTAL SCROLL WRAPPER */}
                <div className="flex-1 overflow-x-auto overflow-y-auto">
                    <table className="min-w-[1100px] w-full border-collapse">
                        <thead className="bg-slate-100 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-base font-semibold text-slate-700">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-base font-semibold text-slate-700">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-base font-semibold text-slate-700">
                                    Mobile
                                </th>
                                <th className="px-6 py-3 text-left text-base font-semibold text-slate-700">
                                    Message
                                </th>
                                <th className="px-6 py-3 text-left text-base font-semibold text-slate-700">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-6 text-base text-slate-400">
                                        Loading…
                                    </td>
                                </tr>
                            ) : (
                                inquiries?.map(item => (
                                    <tr
                                        key={item._id}
                                        onClick={() => {
                                            setSelectedInquiry(item);
                                            setIsMobileDetailOpen(true);
                                        }}
                                        className={`cursor-pointer border-b border-slate-200
                      ${selectedInquiry?._id === item._id
                                                ? 'bg-slate-100'
                                                : 'hover:bg-slate-50'
                                            }
                    `}
                                    >
                                        <td className="px-6 py-4 text-base font-medium text-slate-800 whitespace-nowrap">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4 text-base text-slate-600 whitespace-nowrap">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4 text-base text-slate-600 whitespace-nowrap">
                                            {item.mobile || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-base text-slate-600 max-w-[400px] truncate">
                                            {item.message}
                                        </td>
                                        <td className="px-6 py-4 text-base text-slate-500 whitespace-nowrap">
                                            {new Date(item.createdAt).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-slate-200">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalData={totalData}
                        onPageChange={p => setSearchParams({ page: p })}
                    />
                </div>
            </div>

            {/* DETAIL CARD */}
            <div
                className={`flex-1 bg-white border border-slate-200 rounded-lg ${isMobileDetailOpen ? 'fixed inset-4 md:static' : 'hidden md:block'
                    }`}
            >
                {selectedInquiry ? (
                    <>
                        <div className="px-6 py-4 border-b border-slate-200 flex justify-between">
                            <div>
                                <button
                                    onClick={() => setIsMobileDetailOpen(false)}
                                    className="md:hidden mb-2 text-slate-500"
                                >
                                    <ArrowLeft size={20} />
                                </button>

                                <h2 className="text-lg font-semibold text-slate-800">
                                    {selectedInquiry.name}
                                </h2>

                                <div className="text-base text-slate-600 mt-1">
                                    <div className="flex items-center gap-2">
                                        <span>{selectedInquiry.email}</span>
                                        <button onClick={() => handleCopy(selectedInquiry.email, 'email')}>
                                            {copiedField === 'email' ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>

                                    {selectedInquiry.mobile && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <span>{selectedInquiry.mobile}</span>
                                            <button onClick={() => handleCopy(selectedInquiry.mobile, 'mobile')}>
                                                {copiedField === 'mobile' ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button onClick={() => setDeleteModal({ isOpen: true, id: selectedInquiry?._id })} className="text-slate-400 hover:text-red-500 hover:cursor-pointer">
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <p className="text-base text-slate-500 mb-4">

                                {new Date(selectedInquiry.createdAt).toLocaleString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true // Set to false for 24-hour format
                                })}
                            </p>

                            <h3 className="text-lg font-semibold text-slate-700 mb-4">
                                {selectedInquiry.subject || 'No Subject'}
                            </h3>

                            <p className="text-base text-slate-700 whitespace-pre-wrap">
                                {selectedInquiry.message}
                            </p>

                            <div className="mt-8">
                                {selectedInquiry?.email ? (
                                    <a
                                        href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject || 'Inquiry'}`}
                                        className="inline-flex items-center justify-center px-10 py-3 text-lg font-semibold text-white rounded-lg transition-transform active:scale-95 hover:opacity-90"
                                        style={{
                                            backgroundColor: '#31b8c6',
                                            cursor: 'pointer',
                                            zIndex: 50 // Ensures it's on top of other elements
                                        }}
                                    >
                                        Reply
                                    </a>
                                ) : (
                                    <p className="text-red-500 text-sm">No email address available</p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="p-6 text-base text-slate-400">
                        Select an inquiry
                    </p>
                )}
            </div>
            <DeleteModal
                isOpen={deleteModal.isOpen}
                loading={isDeleting}
                onClose={() => setDeleteModal({ isOpen: false, id: null })}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default Inquiries;
