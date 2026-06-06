import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Trash2, Copy, Check, Mail, Phone, Inbox, Calendar, Eye, X, Search, Send, Loader2, Download } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../api';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';
import { exportToCsv, csvDate } from '../utils/exportCsv';

const getInitial = (name = '') => name.trim().charAt(0).toUpperCase() || '?';
const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const STATUS_TABS = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'replied', label: 'Replied' },
    { key: 'closed', label: 'Closed' },
];

const STATUS_STYLES = {
    new: 'text-[#DC2626] bg-[#DC2626]/10 border-[#DC2626]/20',
    replied: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    closed: 'text-slate-400 bg-white/5 border-white/10',
};

const StatusBadge = ({ status = 'new' }) => (
    <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${STATUS_STYLES[status] || STATUS_STYLES.new}`}>
        {status}
    </span>
);

const Inquiries = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [inquiries, setInquiries] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [loading, setLoading] = useState(true);
    const [viewItem, setViewItem] = useState(null);
    const [copiedField, setCopiedField] = useState(null);

    // Filters — honor ?status= from the URL (e.g. coming from the notifications bell)
    const initialStatus = STATUS_TABS.some((t) => t.key === searchParams.get('status'))
        ? searchParams.get('status')
        : 'all';
    const [statusFilter, setStatusFilter] = useState(initialStatus);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');

    // Reply composer
    const [replyText, setReplyText] = useState('');
    const [sendingReply, setSendingReply] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
    const [exporting, setExporting] = useState(false);

    const fetchInquiries = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: currentPage, limit: '10' });
            if (statusFilter !== 'all') params.set('status', statusFilter);
            if (search) params.set('search', search);
            const { data } = await api.get(`/contact?${params.toString()}`);
            setInquiries(data.results);
            setTotalPages(data?.totalPages);
            setTotalData(data?.total || 0);
        } catch {
            toast.error('Failed to load inquiries');
        } finally {
            setLoading(false);
        }
    }, [currentPage, statusFilter, search]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    // Debounce the search box
    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput.trim()), 400);
        return () => clearTimeout(t);
    }, [searchInput]);

    // Reset to page 1 when filters change
    useEffect(() => {
        if (currentPage !== 1) setSearchParams({ page: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter, search]);

    // Keep the open modal in sync with refreshed list data
    useEffect(() => {
        if (viewItem) {
            const fresh = inquiries.find((i) => i._id === viewItem._id);
            if (fresh) setViewItem(fresh);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inquiries]);

    const openItem = (item) => {
        setViewItem(item);
        setReplyText('');
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await api.delete(`/contact/${deleteModal.id}`);
            if (viewItem?._id === deleteModal.id) setViewItem(null);
            setDeleteModal({ isOpen: false, id: null });
            fetchInquiries();
            toast.success('Inquiry deleted');
        } catch (error) {
            console.error('Delete failed', error);
            toast.error('Failed to delete');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleExport = async () => {
        setExporting(true);
        try {
            const params = new URLSearchParams({ page: '1', limit: '10000' });
            if (statusFilter !== 'all') params.set('status', statusFilter);
            if (search) params.set('search', search);
            const { data } = await api.get(`/contact?${params.toString()}`);
            const rows = data?.results || [];
            if (!rows.length) {
                toast.error('Nothing to export');
                return;
            }
            exportToCsv(
                `contacts-${statusFilter}-${new Date().toISOString().slice(0, 10)}.csv`,
                [
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'mobile', label: 'Mobile' },
                    { key: 'subject', label: 'Subject' },
                    { key: 'message', label: 'Message' },
                    { key: 'status', label: 'Status' },
                    { key: 'createdAt', label: 'Submitted At', format: csvDate },
                ],
                rows
            );
            toast.success(`Exported ${rows.length} inquiries`);
        } catch (error) {
            console.error('Export failed', error);
            toast.error('Export failed');
        } finally {
            setExporting(false);
        }
    };

    const handleCopy = (value, field) => {
        navigator.clipboard.writeText(value);
        setCopiedField(field);
        toast.success('Copied');
        setTimeout(() => setCopiedField(null), 1500);
    };

    const handleSendReply = async () => {
        if (!replyText.trim()) return toast.error('Write a reply first');
        setSendingReply(true);
        try {
            const { data } = await api.put(`/contact/${viewItem._id}/reply`, {
                replyMessage: replyText.trim(),
            });
            toast.success('Reply sent');
            setReplyText('');
            if (data?.data) setViewItem(data.data);
            fetchInquiries();
        } catch (error) {
            console.error('Reply failed', error);
            toast.error('Failed to send reply');
        } finally {
            setSendingReply(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        if (!viewItem || newStatus === viewItem.status) return;
        setUpdatingStatus(true);
        try {
            const { data } = await api.patch(`/contact/${viewItem._id}/status`, { status: newStatus });
            if (data?.data) setViewItem(data.data);
            fetchInquiries();
            toast.success(`Marked as ${newStatus}`);
        } catch (error) {
            console.error('Status update failed', error);
            toast.error('Failed to update status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <span className="text-[#DC2626] text-[10px] font-black uppercase tracking-[0.3em]">Inbox</span>
                    <h1 className="text-2xl font-black text-white tracking-tight">Contact Inquiries</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-300 bg-white/10 px-3 py-1.5 rounded-full">
                        {totalData} total
                    </span>
                    <button
                        onClick={handleExport}
                        disabled={exporting}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:border-[#DC2626]/50 transition-colors disabled:opacity-50"
                    >
                        {exporting ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
                    {STATUS_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setStatusFilter(tab.key)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                                statusFilter === tab.key
                                    ? 'bg-[#DC2626] text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="relative sm:ml-auto sm:w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search name, email, subject…"
                        className="w-full pl-9 pr-9 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DC2626]/50 transition-colors"
                    />
                    {searchInput && (
                        <button
                            onClick={() => setSearchInput('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>
            </div>

            {/* Table card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full min-w-[900px] text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="px-5 py-3.5 text-[11px] font-black text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3.5 text-[11px] font-black text-slate-400 uppercase tracking-wider">Email</th>
                                <th className="px-5 py-3.5 text-[11px] font-black text-slate-400 uppercase tracking-wider">Subject</th>
                                <th className="px-5 py-3.5 text-[11px] font-black text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3.5 text-[11px] font-black text-slate-400 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-3.5 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {loading ? (
                                [...Array(6)].map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan={6} className="px-5 py-3">
                                            <div className="h-8 rounded-lg bg-white/5 animate-pulse" />
                                        </td>
                                    </tr>
                                ))
                            ) : inquiries?.length ? (
                                inquiries.map((item) => (
                                    <tr
                                        key={item._id}
                                        onClick={() => openItem(item)}
                                        className="group cursor-pointer hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#DC2626]/10 text-[#DC2626] font-black text-sm flex items-center justify-center shrink-0">
                                                    {getInitial(item.name)}
                                                </div>
                                                <span className="font-bold text-white group-hover:text-[#DC2626] transition-colors">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-300 whitespace-nowrap">{item.email}</td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            {item.subject ? (
                                                <span className="text-xs font-bold text-slate-300 bg-white/5 px-2.5 py-1 rounded-full">
                                                    {item.subject}
                                                </span>
                                            ) : (
                                                <span className="text-slate-500 text-sm">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-400 whitespace-nowrap">{fmtDate(item.createdAt)}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); openItem(item); }}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                                    title="View"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setDeleteModal({ isOpen: true, id: item._id }); }}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#DC2626] transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="flex flex-col items-center justify-center text-center py-16 text-slate-500">
                                            <Inbox size={40} className="mb-3 text-slate-600" />
                                            <p className="font-bold text-slate-300">
                                                {search || statusFilter !== 'all' ? 'No matching inquiries' : 'No inquiries yet'}
                                            </p>
                                            <p className="text-sm">
                                                {search || statusFilter !== 'all'
                                                    ? 'Try a different filter or search term.'
                                                    : 'Submissions from the contact form will appear here.'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-white/10">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalData={totalData}
                        onPageChange={(p) => setSearchParams({ page: p })}
                    />
                </div>
            </div>

            {/* ---------- DETAIL MODAL ---------- */}
            {viewItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setViewItem(null)}
                >
                    <div
                        className="w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-12 h-12 rounded-full bg-[#DC2626]/10 text-[#DC2626] font-black text-lg flex items-center justify-center shrink-0">
                                    {getInitial(viewItem.name)}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2.5">
                                        <h2 className="text-lg font-black text-white truncate">{viewItem.name}</h2>
                                        <StatusBadge status={viewItem.status} />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-400">
                                        <button onClick={() => handleCopy(viewItem.email, 'email')} className="flex items-center gap-1.5 hover:text-white transition-colors">
                                            <Mail size={14} /> <span className="truncate max-w-[200px]">{viewItem.email}</span>
                                            {copiedField === 'email' ? <Check size={13} className="text-[#DC2626]" /> : <Copy size={13} />}
                                        </button>
                                        {viewItem.mobile && (
                                            <button onClick={() => handleCopy(viewItem.mobile, 'mobile')} className="flex items-center gap-1.5 hover:text-white transition-colors">
                                                <Phone size={14} /> {viewItem.mobile}
                                                {copiedField === 'mobile' ? <Check size={13} className="text-[#DC2626]" /> : <Copy size={13} />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setViewItem(null)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Calendar size={14} />
                                    {new Date(viewItem.createdAt).toLocaleString('en-GB', {
                                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
                                    })}
                                </div>
                                {/* Status switcher */}
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Status</span>
                                    <select
                                        value={viewItem.status || 'new'}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        disabled={updatingStatus}
                                        className="bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-white px-3 py-2 focus:outline-none focus:border-[#DC2626]/50 cursor-pointer disabled:opacity-50"
                                    >
                                        <option value="new" className="bg-[#0c0c0c]">New</option>
                                        <option value="replied" className="bg-[#0c0c0c]">Replied</option>
                                        <option value="closed" className="bg-[#0c0c0c]">Closed</option>
                                    </select>
                                </div>
                            </div>
                            {viewItem.subject && (
                                <span className="inline-block text-xs font-black uppercase tracking-widest text-[#DC2626] bg-[#DC2626]/10 border border-[#DC2626]/20 px-3 py-1.5 rounded-full mb-5">
                                    {viewItem.subject}
                                </span>
                            )}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                <p className="text-[15px] leading-relaxed text-slate-200 whitespace-pre-wrap">{viewItem.message}</p>
                            </div>

                            {/* Previous reply */}
                            {viewItem.adminReply?.replied && (
                                <div className="mt-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                                        <Check size={14} /> Replied
                                        {viewItem.adminReply.repliedAt && (
                                            <span className="text-slate-500 font-medium">
                                                · {new Date(viewItem.adminReply.repliedAt).toLocaleString('en-GB', {
                                                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true,
                                                })}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">{viewItem.adminReply.replyMessage}</p>
                                </div>
                            )}

                            {/* Reply composer */}
                            <div className="mt-5">
                                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
                                    {viewItem.adminReply?.replied ? 'Send another reply' : 'Reply by email'}
                                </label>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={4}
                                    placeholder={`Hi ${viewItem.name?.split(' ')[0] || ''}, thanks for reaching out…`}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DC2626]/50 transition-colors resize-y custom-scrollbar"
                                />
                            </div>
                        </div>

                        {/* Modal actions */}
                        <div className="px-6 py-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleSendReply}
                                disabled={sendingReply || !replyText.trim()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] hover:bg-[#b91c1c] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-colors"
                            >
                                {sendingReply ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                {sendingReply ? 'Sending…' : 'Send Reply'}
                            </button>
                            {viewItem?.mobile && (
                                <a
                                    href={`https://wa.me/91${viewItem.mobile}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-xl font-bold text-sm hover:border-[#DC2626] hover:text-[#DC2626] transition-colors"
                                >
                                    <FaWhatsapp size={16} /> WhatsApp
                                </a>
                            )}
                            <button
                                onClick={() => setDeleteModal({ isOpen: true, id: viewItem._id })}
                                className="ml-auto inline-flex items-center gap-2 px-5 py-3 text-slate-400 hover:text-white hover:bg-[#DC2626] rounded-xl font-bold text-sm transition-colors"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
