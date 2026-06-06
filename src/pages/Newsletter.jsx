import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Mail, Users, RotateCcw, Download, Send, Inbox, Loader2 } from 'lucide-react';
import Pagination from '../components/Pagination';
import toast from 'react-hot-toast';
import DeleteModal from '../components/DeleteModal';
import api from '../api';
import { DateHelper } from '../utils/dateTimeHelper';
import { exportToCsv, csvDate } from '../utils/exportCsv';

const NewsletterAdminPage = () => {
    const [tab, setTab] = useState('active'); // 'active' | 'trash'
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        useTemplate: false,
        sendToAll: false,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalData, setTotalData] = useState(0);

    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
    const [isDeleting, setIsDeleting] = useState(false);
    const [emails, setEmails] = useState([]);

    const fetchEmails = useCallback(async () => {
        setIsLoading(true);
        try {
            const endpoint = tab === 'trash' ? '/newsletter/trash' : '/newsletter';
            const { data } = await api.get(`${endpoint}?page=${currentPage}&limit=10`);
            setEmails(data?.results || []);
            setTotalPages(data?.totalPages || 0);
            setTotalData(data?.total || 0);
        } catch (error) {
            toast.error('Failed to fetch subscribers');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [tab, currentPage]);

    useEffect(() => {
        fetchEmails();
    }, [fetchEmails]);

    // Reset page + selection when switching tabs
    useEffect(() => {
        setCurrentPage(1);
        setSelectedEmails([]);
    }, [tab]);

    const toggleSelect = (email) => {
        setSelectedEmails((prev) =>
            prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
        );
    };

    const allSelected = emails.length > 0 && emails.every((e) => selectedEmails.includes(e.email));
    const toggleSelectAll = () => {
        setSelectedEmails(allSelected ? [] : emails.map((e) => e.email));
    };

    const handleMoveToTrash = async (id) => {
        try {
            await api.patch(`/newsletter/trash/${id}`);
            toast.success('Moved to trash');
            fetchEmails();
        } catch {
            toast.error('Failed to move to trash');
        }
    };

    const handleRestore = async (id) => {
        try {
            await api.patch(`/newsletter/restore/${id}`);
            toast.success('Restored');
            fetchEmails();
        } catch {
            toast.error('Failed to restore');
        }
    };

    const handlePermanentDelete = async () => {
        setIsDeleting(true);
        try {
            await api.delete(`/newsletter/permanent/${deleteModal.id}`);
            toast.success('Permanently deleted');
            setDeleteModal({ id: null, isOpen: false });
            fetchEmails();
        } catch {
            toast.error('Failed to delete');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleExport = async () => {
        setExporting(true);
        try {
            const { data } = await api.get('/newsletter?page=1&limit=10000');
            const rows = data?.results || [];
            if (!rows.length) {
                toast.error('Nothing to export');
                return;
            }
            exportToCsv(
                `subscribers-${new Date().toISOString().slice(0, 10)}.csv`,
                [
                    { key: 'email', label: 'Email' },
                    { key: 'isBlocked', label: 'Status', format: (v) => (v ? 'Blocked' : 'Active') },
                    { key: 'createdAt', label: 'Subscribed At', format: csvDate },
                ],
                rows
            );
            toast.success(`Exported ${rows.length} subscribers`);
        } catch {
            toast.error('Export failed');
        } finally {
            setExporting(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if ((selectedEmails.length === 0 && !formData.sendToAll) || !formData.subject) {
            toast.error('Select recipients and add a subject');
            return;
        }
        setIsSending(true);
        try {
            await api.post('/newsletter/sendmail', { ...formData, emails: selectedEmails });
            toast.success('Mail sent successfully');
            setFormData({ subject: '', message: '', useTemplate: false, sendToAll: false });
            setSelectedEmails([]);
        } catch {
            toast.error('Failed to send email');
        } finally {
            setIsSending(false);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const recipientCount = formData.sendToAll ? totalData : selectedEmails.length;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="text-[#DC2626] text-[10px] font-black uppercase tracking-[0.3em]">Audience</span>
                    <h1 className="text-2xl font-black text-white tracking-tight">Newsletter</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-300 bg-white/10 px-3 py-1.5 rounded-full">
                        {totalData} {tab === 'trash' ? 'in trash' : 'subscribers'}
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* LEFT: list */}
                <div className="lg:col-span-7 flex flex-col">
                    <div className="border border-white/10 rounded-2xl bg-white/5 flex flex-col overflow-hidden">
                        {/* tabs */}
                        <div className="px-4 py-3 border-b border-white/10 flex items-center gap-1">
                            <button
                                onClick={() => setTab('active')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                                    tab === 'active' ? 'bg-[#DC2626] text-white' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Subscribers
                            </button>
                            <button
                                onClick={() => setTab('trash')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                                    tab === 'trash' ? 'bg-[#DC2626] text-white' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Trash
                            </button>
                        </div>

                        {/* table */}
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full min-w-[520px] text-left">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10">
                                        {tab === 'active' && (
                                            <th className="px-4 py-3 w-10">
                                                <input
                                                    type="checkbox"
                                                    checked={allSelected}
                                                    onChange={toggleSelectAll}
                                                    className="h-4 w-4 cursor-pointer accent-[#DC2626]"
                                                />
                                            </th>
                                        )}
                                        <th className="px-4 py-3 text-[11px] font-black text-slate-400 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-[11px] font-black text-slate-400 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {isLoading ? (
                                        [...Array(6)].map((_, i) => (
                                            <tr key={i}><td colSpan={4} className="px-4 py-3"><div className="h-7 rounded bg-white/5 animate-pulse" /></td></tr>
                                        ))
                                    ) : emails.length ? (
                                        emails.map((item) => (
                                            <tr key={item._id} className="hover:bg-white/5 transition-colors">
                                                {tab === 'active' && (
                                                    <td className="px-4 py-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedEmails.includes(item.email)}
                                                            onChange={() => toggleSelect(item.email)}
                                                            className="h-4 w-4 cursor-pointer accent-[#DC2626]"
                                                        />
                                                    </td>
                                                )}
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center shrink-0">
                                                            <Mail size={14} />
                                                        </div>
                                                        <span className="text-sm font-medium text-white truncate">{item.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">{DateHelper(item?.createdAt)}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        {tab === 'trash' && (
                                                            <button
                                                                onClick={() => handleRestore(item._id)}
                                                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                                                title="Restore"
                                                            >
                                                                <RotateCcw size={16} />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() =>
                                                                tab === 'trash'
                                                                    ? setDeleteModal({ id: item._id, isOpen: true })
                                                                    : handleMoveToTrash(item._id)
                                                            }
                                                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#DC2626] transition-colors"
                                                            title={tab === 'trash' ? 'Delete permanently' : 'Move to trash'}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={4}>
                                            <div className="flex flex-col items-center justify-center text-center py-14 text-slate-500">
                                                <Inbox size={34} className="mb-2 text-slate-600" />
                                                <p className="font-bold text-slate-300">
                                                    {tab === 'trash' ? 'Trash is empty' : 'No subscribers yet'}
                                                </p>
                                            </div>
                                        </td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-t border-white/10">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalData={totalData}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT: compose */}
                <div className="lg:col-span-5">
                    <div className="border border-white/10 rounded-2xl bg-white/5 flex flex-col overflow-hidden">
                        <div className="px-5 py-4 border-b border-white/10">
                            <h2 className="font-black text-white">Send Newsletter</h2>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {recipientCount} recipient{recipientCount === 1 ? '' : 's'} selected
                            </p>
                        </div>

                        <div className="p-5 space-y-4">
                            <label className="flex items-center gap-2.5 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.sendToAll}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, sendToAll: e.target.checked }))}
                                    className="h-4 w-4 cursor-pointer accent-[#DC2626]"
                                />
                                <span className="text-sm text-slate-200 font-bold">Send to all subscribers</span>
                            </label>

                            <input
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DC2626]/50 transition-colors"
                            />

                            <textarea
                                rows={7}
                                name="message"
                                placeholder="Write your message…"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DC2626]/50 transition-colors resize-y custom-scrollbar"
                            />

                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.useTemplate}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, useTemplate: e.target.checked }))}
                                    className="h-4 w-4 cursor-pointer accent-[#DC2626]"
                                />
                                <span className="text-sm text-slate-300 font-medium">Wrap in branded template</span>
                            </label>

                            <button
                                onClick={handleSend}
                                disabled={isSending}
                                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#DC2626] hover:bg-[#b91c1c] disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-colors"
                            >
                                {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                {isSending ? 'Sending…' : 'Send Mail'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteModal
                isOpen={deleteModal.isOpen}
                loading={isDeleting}
                onClose={() => setDeleteModal({ isOpen: false, id: null })}
                onConfirm={handlePermanentDelete}
            />
        </div>
    );
};

export default NewsletterAdminPage;
