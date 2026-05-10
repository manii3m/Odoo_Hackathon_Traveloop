import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingDown, TrendingUp, AlertTriangle, Calendar } from 'lucide-react';

const PIE_COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'];

export default function BudgetScreen() {
  const { trips, selectedTripId, setSelectedTripId } = useApp();
  const trip = trips.find(t => t.id === selectedTripId) || trips[0];
  if (!trip) return <div className="p-6" style={{ color: '#94A3B8' }}>No trips available</div>;

  const breakdown = useMemo(() => {
    const totals = { transport: 0, stay: 0, activities: 0, meals: 0 };
    trip.stops.forEach(s => { Object.keys(totals).forEach(k => { totals[k] += s.costs[k]; }); });
    return totals;
  }, [trip]);

  const totalEstimated = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const remaining = trip.totalBudget - totalEstimated;
  const pct = Math.min(100, Math.round((totalEstimated / trip.totalBudget) * 100));
  const avgPerDay = useMemo(() => { const days = trip.stops.reduce((s, st) => s + st.days, 0); return days ? Math.round(totalEstimated / days) : 0; }, [trip, totalEstimated]);

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

  const pieData = [
    { name: 'Transport', value: breakdown.transport },
    { name: 'Stay', value: breakdown.stay },
    { name: 'Activities', value: breakdown.activities },
    { name: 'Meals', value: breakdown.meals },
  ];
  const barData = trip.stops.map(s => ({ name: s.city, cost: Object.values(s.costs).reduce((a, b) => a + b, 0) }));
  const budgetColor = pct > 90 ? '#EF4444' : pct > 70 ? '#F59E0B' : '#10B981';

  const summaryCards = [
    { label: 'Total Estimated', value: fmt(totalEstimated), icon: DollarSign, color: '#F59E0B' },
    { label: 'Total Budget', value: fmt(trip.totalBudget), icon: TrendingUp, color: '#10B981' },
    { label: 'Remaining', value: fmt(remaining), icon: remaining >= 0 ? TrendingDown : AlertTriangle, color: remaining >= 0 ? '#3B82F6' : '#EF4444' },
    { label: 'Avg / Day', value: fmt(avgPerDay), icon: Calendar, color: '#8B5CF6' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Budget & Costs</h1>
        <select className="rounded-xl px-4 py-2 text-sm focus:outline-none" style={{ background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' }} value={selectedTripId || ''} onChange={e => setSelectedTripId(Number(e.target.value))}>
          {trips.map(t => <option key={t.id} value={t.id}>{t.coverEmoji} {t.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {summaryCards.map(c => { const Icon = c.icon; return (
          <div key={c.label} className="rounded-2xl p-4" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}20` }}><Icon size={20} style={{ color: c.color }} /></div>
              <div><p className="text-xl font-bold" style={{ color: '#F8FAFC' }}>{c.value}</p><p className="text-xs" style={{ color: '#94A3B8' }}>{c.label}</p></div>
            </div>
          </div>
        ); })}
      </div>

      <div className="rounded-2xl p-5 mb-6" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>Budget Health</span>
          <span className="text-sm font-bold" style={{ color: budgetColor }}>{pct}%</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#1C2537' }}>
          <div className="h-full rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${pct}%`, background: budgetColor }} />
        </div>
        {pct > 90 && (
          <div className="flex items-center gap-2 mt-3 p-3 rounded-xl" style={{ background: '#EF444410', border: '1px solid #EF444430' }}>
            <AlertTriangle size={16} style={{ color: '#EF4444' }} />
            <span className="text-xs" style={{ color: '#EF4444' }}>Warning: Budget 90% se zyada ho gaya!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#F8FAFC' }}>Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
            </Pie><Tooltip contentStyle={{ background: '#1C2537', border: '1px solid #1E2D45', borderRadius: 12, color: '#F8FAFC', fontSize: 12 }} formatter={(v) => fmt(v)} /></PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {pieData.map((d, i) => (<div key={d.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} /><span className="text-xs" style={{ color: '#94A3B8' }}>{d.name}: {fmt(d.value)}</span></div>))}
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#F8FAFC' }}>Cost per City</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1C2537', border: '1px solid #1E2D45', borderRadius: 12, color: '#F8FAFC', fontSize: 12 }} formatter={(v) => fmt(v)} />
              <Bar dataKey="cost" fill="#F59E0B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        <div className="p-4" style={{ borderBottom: '1px solid #1E2D45' }}><h3 className="text-sm font-semibold" style={{ color: '#F8FAFC' }}>Per-Stop Breakdown</h3></div>
        <table className="w-full text-sm">
          <thead><tr style={{ borderBottom: '1px solid #1E2D45' }}>
            {['City', 'Transport', 'Stay', 'Activities', 'Meals', 'Subtotal'].map(h => (<th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: '#94A3B8' }}>{h}</th>))}
          </tr></thead>
          <tbody>{trip.stops.map(s => { const sub = Object.values(s.costs).reduce((a, b) => a + b, 0); return (
            <tr key={s.id} style={{ borderBottom: '1px solid #1E2D4550' }}>
              <td className="px-4 py-3 font-medium" style={{ color: '#F8FAFC' }}>{s.flag} {s.city}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{fmt(s.costs.transport)}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{fmt(s.costs.stay)}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{fmt(s.costs.activities)}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{fmt(s.costs.meals)}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#F8FAFC' }}>{fmt(sub)}</td>
            </tr>); })}</tbody>
        </table>
      </div>
    </div>
  );
}
