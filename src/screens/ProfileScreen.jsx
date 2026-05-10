import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Globe, Calendar, Compass, Award, TrendingUp } from 'lucide-react';

export default function ProfileScreen() {
  const { currentUser, trips, navigate } = useApp();

  const states = new Set();
  let totalDays = 0;
  const pinnedTrips = trips.filter(t => t.status === 'completed');
  const plannedTrips = trips.filter(t => t.status === 'upcoming');
  const ongoingTrips = trips.filter(t => t.status === 'ongoing');
  trips.forEach(t => { t.stops.forEach(s => states.add(s.state)); const d = (new Date(t.endDate) - new Date(t.startDate)) / 86400000; totalDays += Math.max(0, d); });

  const [tab, setTab] = useState('pinpointed');

  const tabs = [
    { id: 'pinpointed', label: 'Completed Trips', count: pinnedTrips.length },
    { id: 'planned', label: 'Planned Trips', count: plannedTrips.length },
    { id: 'ongoing', label: 'Ongoing', count: ongoingTrips.length },
  ];

  const currentList = tab === 'pinpointed' ? pinnedTrips : tab === 'planned' ? plannedTrips : ongoingTrips;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>My Profile</h1>

      {/* Profile card — matching wireframe Screen 7 */}
      <div className="rounded-2xl p-6 mb-6" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)', color: '#fff' }}>
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold" style={{ color: '#F8FAFC' }}>{currentUser.name}</h2>
            <p className="text-sm" style={{ color: '#94A3B8' }}>{currentUser.email}</p>
            <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#94A3B8' }}>
              <MapPin size={12} /> {currentUser.city}, {currentUser.state}
            </p>
            <p className="text-sm mt-2" style={{ color: '#94A3B8' }}>{currentUser.bio}</p>
          </div>
          <button onClick={() => navigate('settings')} className="px-4 py-2 rounded-xl text-sm font-medium cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Trips', value: trips.length, icon: Compass, color: '#F59E0B' },
          { label: 'States Visited', value: states.size, icon: Globe, color: '#10B981' },
          { label: 'Days Travelled', value: totalDays, icon: Calendar, color: '#3B82F6' },
          { label: 'Traveller Level', value: trips.length >= 5 ? 'Pro' : 'Explorer', icon: Award, color: '#8B5CF6' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
              <Icon size={24} className="mx-auto mb-2" style={{ color: s.color }} />
              <p className="text-xl font-bold" style={{ color: '#F8FAFC' }}>{s.value}</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Trip tabs — Pinpointed / Planned / Pending as in wireframe */}
      <div className="flex gap-1 rounded-xl p-1 mb-4" style={{ background: '#0A0F1E' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer" style={{
            background: tab === t.id ? '#F59E0B' : 'transparent', color: tab === t.id ? '#fff' : '#94A3B8'
          }}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Trip list */}
      <div className="flex flex-col gap-3">
        {currentList.length === 0 ? (
          <div className="text-center py-10"><p className="text-sm" style={{ color: '#475569' }}>No trips in this category</p></div>
        ) : currentList.map(trip => {
          const totalCost = trip.stops.reduce((s, st) => s + Object.values(st.costs).reduce((a, b) => a + b, 0), 0);
          return (
            <div key={trip.id} onClick={() => navigate('itinerary', { tripId: trip.id })} className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all" style={{ background: '#111827', border: '1px solid #1E2D45' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#F59E0B'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1E2D45'}
            >
              <div className="text-3xl">{trip.coverEmoji}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm" style={{ color: '#F8FAFC' }}>{trip.name}</h3>
                <p className="text-xs" style={{ color: '#94A3B8' }}>{trip.stops.map(s => s.city).join(' → ')}</p>
                <p className="text-xs mt-1" style={{ color: '#475569' }}>{trip.startDate} · ₹{totalCost.toLocaleString('en-IN')}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
