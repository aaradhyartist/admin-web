import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Inbox, Users, CalendarDays, Clock, ArrowRight, RefreshCw, Mail, TrendingUp } from 'lucide-react';
import api from '../api';
import TrendChart from '../components/TrendChart';

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const getInitial = (s = '') => s.trim().charAt(0).toUpperCase() || '?';

// Bucket items by day for the last `days` days → [{ label, value }]
const dailySeries = (items, days = 14) => {
  const buckets = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(base.getTime() - i * 86400000);
    buckets.push({
      key: day.getTime(),
      label: day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      value: 0,
    });
  }
  items.forEach((it) => {
    const d = new Date(it.createdAt);
    d.setHours(0, 0, 0, 0);
    const b = buckets.find((x) => x.key === d.getTime());
    if (b) b.value += 1;
  });
  return buckets;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({ totalContacts: 0, totalSubs: 0, week: 0, today: 0 });
  const [contactSeries, setContactSeries] = useState([]);
  const [subSeries, setSubSeries] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const [c, n] = await Promise.all([
        api.get('/contact?page=1&limit=100'),
        api.get('/newsletter?page=1&limit=100'),
      ]);
      const cResults = c?.data?.results || [];
      const nResults = n?.data?.results || [];

      const DAY = 86400000;
      const now = Date.now();
      const startToday = new Date();
      startToday.setHours(0, 0, 0, 0);

      const week = cResults.filter((i) => now - new Date(i.createdAt).getTime() <= 7 * DAY).length;
      const today = cResults.filter((i) => new Date(i.createdAt) >= startToday).length;

      setContacts(cResults.slice(0, 6));
      setSubscribers(nResults.slice(0, 6));
      setContactSeries(dailySeries(cResults, 14));
      setSubSeries(dailySeries(nResults, 14));
      setStats({
        totalContacts: c?.data?.total ?? cResults.length,
        totalSubs: n?.data?.total ?? nResults.length,
        week,
        today,
      });
    } catch (err) {
      console.error('Dashboard load failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const statCards = [
    { label: 'Total Inquiries', value: stats.totalContacts, icon: <Inbox size={22} /> },
    { label: 'New This Week', value: stats.week, icon: <CalendarDays size={22} /> },
    { label: 'Today', value: stats.today, icon: <Clock size={22} /> },
    { label: 'Subscribers', value: stats.totalSubs, icon: <Users size={22} /> },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#DC2626] text-[10px] font-black uppercase tracking-[0.3em]">Overview</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 font-medium text-sm mt-1">Live contact &amp; newsletter activity.</p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:border-[#DC2626]/50 transition-colors"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((s, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#DC2626]/40 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center mb-4">
              {s.icon}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            <h3 className="text-3xl font-black text-white mt-1">
              {loading ? <span className="inline-block w-12 h-8 rounded bg-white/10 animate-pulse" /> : s.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-white">Inquiries</h2>
              <p className="text-xs text-slate-400 font-medium">Last 14 days</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          {loading ? (
            <div className="h-[200px] rounded-xl bg-white/5 animate-pulse" />
          ) : (
            <TrendChart data={contactSeries} color="#DC2626" />
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-white">Subscriber Growth</h2>
              <p className="text-xs text-slate-400 font-medium">Last 14 days</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          {loading ? (
            <div className="h-[200px] rounded-xl bg-white/5 animate-pulse" />
          ) : (
            <TrendChart data={subSeries} color="#10b981" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Recent Inquiries</h2>
            <Link to="/contacts" className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-5 py-3 text-[11px] font-black text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="px-5 py-3 text-[11px] font-black text-slate-400 uppercase tracking-wider">Subject</th>
                  <th className="px-5 py-3 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}><td colSpan={3} className="px-5 py-3"><div className="h-7 rounded bg-white/5 animate-pulse" /></td></tr>
                  ))
                ) : contacts.length ? (
                  contacts.map((item) => (
                    <tr key={item._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#DC2626]/10 text-[#DC2626] font-black text-xs flex items-center justify-center shrink-0">
                            {getInitial(item.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white truncate">{item.name}</p>
                            <p className="text-xs text-slate-400 truncate">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {item.subject ? (
                          <span className="text-xs font-bold text-[#DC2626] bg-[#DC2626]/10 px-2.5 py-1 rounded-full">{item.subject}</span>
                        ) : <span className="text-slate-500 text-sm">—</span>}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-400 whitespace-nowrap text-right">{fmtDate(item.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={3}>
                    <div className="flex flex-col items-center justify-center text-center py-14 text-slate-500">
                      <Inbox size={36} className="mb-3 text-slate-600" />
                      <p className="font-bold text-slate-300">No inquiries yet</p>
                    </div>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Subscribers */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Recent Subscribers</h2>
            <Link to="/newsletter" className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1">
              All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="p-3 flex-1">
            {loading ? (
              <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-12 rounded-xl bg-white/5 animate-pulse" />)}</div>
            ) : subscribers.length ? (
              <div className="space-y-1">
                {subscribers.map((s) => (
                  <div key={s._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center shrink-0">
                      <Mail size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{s.email}</p>
                      <p className="text-[11px] text-slate-500">{fmtDate(s.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-14 text-slate-500">
                <Users size={36} className="mb-3 text-slate-600" />
                <p className="font-bold text-slate-300">No subscribers yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
