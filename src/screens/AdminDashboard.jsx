import { useApp } from '../context/AppContext';
import { ADMIN_MONTHLY_DATA, ADMIN_CITY_PIE, ADMIN_USERS, ACTIVITY_DATABASE } from '../data/seedData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Map, MapPin, Clock, Eye, Ban } from 'lucide-react';

const PIE_COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899'];

export default function AdminDashboard() {
  const { showToast } = useApp();
  const kpis = [
    { label: 'Total Users', value: '12,470', icon: Users, color: '#F59E0B' },
    { label: 'Total Trips', value: '38,920', icon: Map, color: '#10B981' },
    { label: 'Popular City', value: 'Goa', icon: MapPin, color: '#3B82F6' },
    { label: 'Avg Duration', value: '7.5 days', icon: Clock, color: '#8B5CF6' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Admin Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map(k => { const Icon = k.icon; return (
          <div key={k.label} className="rounded-2xl p-4" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${k.color}20` }}><Icon size={20} style={{ color: k.color }} /></div>
              <div><p className="text-xl font-bold" style={{ color: '#F8FAFC' }}>{k.value}</p><p className="text-xs" style={{ color: '#94A3B8' }}>{k.label}</p></div>
            </div>
          </div>
        ); })}
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#F8FAFC' }}>Trips per Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ADMIN_MONTHLY_DATA}><XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: '#1C2537', border: '1px solid #1E2D45', borderRadius: 12, color: '#F8FAFC', fontSize: 12 }} /><Bar dataKey="trips" fill="#F59E0B" radius={[6, 6, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#F8FAFC' }}>Top 5 Indian Destinations</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={ADMIN_CITY_PIE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">{ADMIN_CITY_PIE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}</Pie><Tooltip contentStyle={{ background: '#1C2537', border: '1px solid #1E2D45', borderRadius: 12, color: '#F8FAFC', fontSize: 12 }} /></PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center">{ADMIN_CITY_PIE.map((d, i) => (<div key={d.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} /><span className="text-xs" style={{ color: '#94A3B8' }}>{d.name}</span></div>))}</div>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        <div className="p-4" style={{ borderBottom: '1px solid #1E2D45' }}><h3 className="text-sm font-semibold" style={{ color: '#F8FAFC' }}>Recent Users</h3></div>
        <table className="w-full text-sm">
          <thead><tr style={{ borderBottom: '1px solid #1E2D45' }}>{['Name', 'Email', 'City', 'Trips', 'Joined', 'Status', 'Actions'].map(h => (<th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: '#94A3B8' }}>{h}</th>))}</tr></thead>
          <tbody>{ADMIN_USERS.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #1E2D4550' }}>
              <td className="px-4 py-3 font-medium" style={{ color: '#F8FAFC' }}>{u.name}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{u.email}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{u.city}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{u.trips}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{u.joined}</td>
              <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: u.status === 'Active' ? '#10B98120' : '#EF444420', color: u.status === 'Active' ? '#10B981' : '#EF4444' }}>{u.status}</span></td>
              <td className="px-4 py-3"><div className="flex gap-1"><button onClick={() => showToast(`Viewing ${u.name}`, 'info')} className="p-1.5 rounded-lg cursor-pointer" style={{ color: '#94A3B8' }} aria-label={`View ${u.name}`}><Eye size={14} /></button><button onClick={() => showToast(`${u.name} suspended`, 'warning')} className="p-1.5 rounded-lg cursor-pointer" style={{ color: '#F59E0B' }} aria-label={`Suspend ${u.name}`}><Ban size={14} /></button></div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        <div className="p-4" style={{ borderBottom: '1px solid #1E2D45' }}><h3 className="text-sm font-semibold" style={{ color: '#F8FAFC' }}>Popular Activities</h3></div>
        <table className="w-full text-sm">
          <thead><tr style={{ borderBottom: '1px solid #1E2D45' }}>{['Activity', 'Type', 'Cost', 'Duration'].map(h => (<th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: '#94A3B8' }}>{h}</th>))}</tr></thead>
          <tbody>{ACTIVITY_DATABASE.map(a => (
            <tr key={a.id} style={{ borderBottom: '1px solid #1E2D4550' }}>
              <td className="px-4 py-3 font-medium" style={{ color: '#F8FAFC' }}>{a.name}</td>
              <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: '#F59E0B20', color: '#F59E0B' }}>{a.type}</span></td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>₹{a.cost}</td>
              <td className="px-4 py-3" style={{ color: '#94A3B8' }}>{a.duration}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
