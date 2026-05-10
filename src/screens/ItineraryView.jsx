import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, Share2, Pencil, Calendar } from 'lucide-react';

export default function ItineraryView() {
  const { trips, selectedTripId, navigate, showToast } = useApp();
  const trip = trips.find(t => t.id === selectedTripId);
  const [view, setView] = useState('timeline');

  if (!trip) return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <p style={{ color: '#94A3B8' }}>No trip selected</p>
      <button onClick={() => navigate('trips')} className="mt-3 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>Go to My Trips</button>
    </div>
  );

  const totalCost = trip.stops.reduce((s, st) => s + Object.values(st.costs).reduce((a, b) => a + b, 0), 0);
  const totalDays = trip.stops.reduce((s, st) => s + st.days, 0);
  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

  const typeBadgeColor = (type) => {
    const map = { Sightseeing: '#3B82F6', Culture: '#8B5CF6', Experience: '#10B981', Food: '#F59E0B', Adventure: '#EF4444', History: '#94A3B8', Nightlife: '#EC4899', Wellness: '#06B6D4', Shopping: '#F97316' };
    return map[type] || '#94A3B8';
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header — matching wireframe Screen 9 */}
      <div className="flex items-center justify-between mb-6 p-4 rounded-2xl sticky top-0 z-10" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>{trip.coverEmoji} {trip.name}</h1>
          <div className="flex items-center gap-4 mt-1 text-xs" style={{ color: '#94A3B8' }}>
            <span className="flex items-center gap-1"><Calendar size={12} /> {totalDays} days</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> {trip.stops.length} cities</span>
            <span className="font-medium" style={{ color: '#10B981' }}>{fmt(totalCost)} estimated</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl p-1" style={{ background: '#0A0F1E' }}>
            {['timeline', 'list'].map(v => (
              <button key={v} onClick={() => setView(v)} className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all" style={{
                background: view === v ? '#F59E0B' : 'transparent', color: view === v ? '#fff' : '#94A3B8'
              }}>{v === 'timeline' ? 'Timeline' : 'List'}</button>
            ))}
          </div>
          <button onClick={() => { navigator.clipboard?.writeText('https://yatra.app/trip/' + trip.id); showToast('Trip link copied!', 'success'); }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>
            <Share2 size={14} /> Share
          </button>
          <button onClick={() => navigate('builder', { tripId: trip.id })} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>
            <Pencil size={14} /> Edit
          </button>
        </div>
      </div>

      {/* Budget summary strip */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Transport', value: trip.stops.reduce((s, st) => s + st.costs.transport, 0), color: '#F59E0B' },
          { label: 'Stay', value: trip.stops.reduce((s, st) => s + st.costs.stay, 0), color: '#3B82F6' },
          { label: 'Activities', value: trip.stops.reduce((s, st) => s + st.costs.activities, 0), color: '#10B981' },
          { label: 'Meals', value: trip.stops.reduce((s, st) => s + st.costs.meals, 0), color: '#8B5CF6' },
        ].map(c => (
          <div key={c.label} className="rounded-xl p-3 text-center" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
            <p className="text-lg font-bold" style={{ color: c.color }}>{fmt(c.value)}</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>{c.label}</p>
          </div>
        ))}
      </div>

      {view === 'timeline' && (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {trip.stops.map((stop, idx) => (
            <div key={stop.id} className="flex-shrink-0 w-72">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: '#F59E0B20', border: '2px solid #F59E0B' }}>{stop.flag}</div>
                {idx < trip.stops.length - 1 && <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(to right, #F59E0B, #1E2D45)' }} />}
              </div>
              <div className="rounded-2xl p-4" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
                <h3 className="font-semibold text-base mb-1" style={{ color: '#F8FAFC' }}>{stop.city}</h3>
                <p className="text-xs mb-3" style={{ color: '#94A3B8' }}>{stop.state} · {stop.days} days</p>
                <div className="flex flex-col gap-2">
                  {stop.activities.map(act => (
                    <div key={act.id} className="p-2 rounded-lg" style={{ background: '#1C2537' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium" style={{ color: '#F8FAFC' }}>{act.name}</span>
                        <span className="text-xs" style={{ color: '#10B981' }}>₹{act.cost}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${typeBadgeColor(act.type)}20`, color: typeBadgeColor(act.type) }}>{act.type}</span>
                        <span className="text-xs" style={{ color: '#475569' }}>{act.time}</span>
                      </div>
                    </div>
                  ))}
                  {stop.activities.length === 0 && <p className="text-xs text-center py-2" style={{ color: '#475569' }}>No activities</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'list' && (
        <div className="flex flex-col gap-6">
          {trip.stops.map(stop => (
            <div key={stop.id} className="rounded-2xl overflow-hidden" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
              <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid #1E2D45' }}>
                <span className="text-2xl">{stop.flag}</span>
                <div><h3 className="font-semibold" style={{ color: '#F8FAFC' }}>{stop.city}, {stop.state}</h3><p className="text-xs" style={{ color: '#94A3B8' }}>{stop.days} days</p></div>
              </div>
              <div className="p-4">
                {stop.activities.map(act => (
                  <div key={act.id} className="flex items-center gap-4 py-3" style={{ borderBottom: '1px solid #1E2D4550' }}>
                    <div className="w-16 text-xs font-medium" style={{ color: '#F59E0B' }}>{act.time}</div>
                    <div className="flex-1"><span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>{act.name}</span><span className="text-xs ml-2 px-1.5 py-0.5 rounded" style={{ background: `${typeBadgeColor(act.type)}20`, color: typeBadgeColor(act.type) }}>{act.type}</span></div>
                    <span className="text-xs" style={{ color: '#94A3B8' }}>{act.duration}</span>
                    <span className="text-sm font-medium" style={{ color: '#10B981' }}>₹{act.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
