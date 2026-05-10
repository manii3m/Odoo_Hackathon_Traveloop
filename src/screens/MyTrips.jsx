import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Plus, Eye, Pencil, Trash2, MapPin, Calendar, Briefcase } from 'lucide-react';

export default function MyTrips() {
  const { trips, setTrips, navigate, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    let list = trips;
    if (search) list = list.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'Ongoing') list = list.filter(t => t.status === 'ongoing');
    else if (filter === 'Upcoming') list = list.filter(t => t.status === 'upcoming');
    else if (filter === 'Completed') list = list.filter(t => t.status === 'completed');
    else if (filter === 'Drafts') list = list.filter(t => t.stops.length === 0);
    return list;
  }, [trips, search, filter]);

  const handleDelete = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
    showToast('Trip deleted', 'success');
  };

  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>My Trips</h1>
      </div>

      {/* Search & filters — matching wireframe Screen 6 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
          <input className="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none" style={inputStyle} placeholder="Search trips..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 rounded-xl p-1" style={{ background: '#0A0F1E' }}>
          {['All', 'Ongoing', 'Upcoming', 'Completed', 'Drafts'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer" style={{
              background: filter === f ? 'linear-gradient(135deg, #F59E0B, #EF4444)' : 'transparent',
              color: filter === f ? '#fff' : '#94A3B8'
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Trip cards — "Short Glimpse View of the Trip" as in wireframe */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Briefcase size={64} style={{ color: '#1E2D45' }} />
          <h3 className="text-lg font-semibold mt-4" style={{ color: '#94A3B8' }}>No trips found</h3>
          <p className="text-sm mt-1 mb-4" style={{ color: '#475569' }}>Start planning your next yatra</p>
          <button onClick={() => navigate('create-trip')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
            <Plus size={16} /> Create Trip
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map(trip => {
            const totalCost = trip.stops.reduce((s, st) => s + Object.values(st.costs).reduce((a, b) => a + b, 0), 0);
            return (
              <div key={trip.id} className="rounded-2xl p-5 flex items-center gap-5 transition-all duration-300" style={{ background: '#111827', border: '1px solid #1E2D45' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#F59E0B'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1E2D45'}
              >
                <div className="text-4xl">{trip.coverEmoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base" style={{ color: '#F8FAFC' }}>{trip.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-lg" style={{
                      background: trip.status === 'completed' ? '#10B98120' : trip.status === 'ongoing' ? '#3B82F620' : '#F59E0B20',
                      color: trip.status === 'completed' ? '#10B981' : trip.status === 'ongoing' ? '#3B82F6' : '#F59E0B'
                    }}>
                      {trip.status === 'completed' ? '✓ Completed' : trip.status === 'ongoing' ? '● Ongoing' : '◷ Upcoming'}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{trip.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: '#94A3B8' }}>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {trip.startDate} → {trip.endDate}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {trip.stops.length} cities</span>
                    <span className="px-2 py-0.5 rounded-lg" style={{ background: '#F59E0B20', color: '#F59E0B' }}>₹{totalCost.toLocaleString('en-IN')} / ₹{trip.totalBudget.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => navigate('itinerary', { tripId: trip.id })} className="p-2 rounded-lg cursor-pointer transition-colors" style={{ color: '#94A3B8', background: '#1C2537' }} aria-label="View trip"><Eye size={16} /></button>
                  <button onClick={() => navigate('builder', { tripId: trip.id })} className="p-2 rounded-lg cursor-pointer transition-colors" style={{ color: '#94A3B8', background: '#1C2537' }} aria-label="Edit trip"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(trip.id)} className="p-2 rounded-lg cursor-pointer transition-colors" style={{ color: '#EF4444', background: '#EF444410' }} aria-label="Delete trip"><Trash2 size={16} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => navigate('create-trip')}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl cursor-pointer transition-all z-30"
        style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="New trip"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
