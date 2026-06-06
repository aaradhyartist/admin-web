import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Inbox } from 'lucide-react';
import api from '../api';

const getInitial = (name = '') => name.trim().charAt(0).toUpperCase() || '?';
const timeAgo = (d) => {
    const diff = (Date.now() - new Date(d).getTime()) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};

export default function NotificationBell() {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);
    const ref = useRef(null);
    const navigate = useNavigate();

    const fetchNew = useCallback(async () => {
        try {
            const { data } = await api.get('/contact?status=new&limit=5');
            setCount(data?.total || 0);
            setItems(data?.results || []);
        } catch {
            /* silent — header polling shouldn't toast */
        }
    }, []);

    useEffect(() => {
        fetchNew();
        const id = setInterval(fetchNew, 60000);
        return () => clearInterval(id);
    }, [fetchNew]);

    // Close on outside click
    useEffect(() => {
        const onClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const goTo = () => {
        setOpen(false);
        navigate('/contacts?status=new');
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((o) => !o)}
                aria-label="Notifications"
                className="relative p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
                <Bell size={20} />
                {count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-black text-white bg-[#DC2626] rounded-full border-2 border-[#0c0c0c]">
                        {count > 9 ? '9+' : count}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0c0c0c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                        <span className="text-sm font-black text-white">Notifications</span>
                        {count > 0 && (
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.5 rounded-full">
                                {count} new
                            </span>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {items.length ? (
                            items.map((item) => (
                                <button
                                    key={item._id}
                                    onClick={goTo}
                                    className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#DC2626]/10 text-[#DC2626] font-black text-xs flex items-center justify-center shrink-0">
                                        {getInitial(item.name)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-bold text-white truncate">{item.name}</p>
                                        <p className="text-xs text-slate-400 truncate">{item.subject || item.message}</p>
                                        <p className="text-[11px] text-slate-500 mt-0.5">{timeAgo(item.createdAt)}</p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-10 text-slate-500">
                                <Inbox size={28} className="mb-2 text-slate-600" />
                                <p className="text-sm">No new inquiries</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={goTo}
                        className="w-full px-4 py-3 text-xs font-bold text-[#DC2626] hover:bg-white/5 transition-colors border-t border-white/10"
                    >
                        View all inquiries
                    </button>
                </div>
            )}
        </div>
    );
}
