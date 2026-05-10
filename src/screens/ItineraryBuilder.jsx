import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CITY_DATABASE, ACTIVITY_DATABASE } from '../data/seedData';
import { Modal } from '../components/ToastAndModal';
import { Plus, Trash2, ChevronUp, ChevronDown, Search, MapPin, Clock, Check } from 'lucide-react';

export default function ItineraryBuilder() {
  const { trips, setTrips, selectedTripId, navigate, showToast } = useApp();
  const trip = trips.find(t => t.id === selectedTripId);
  const [selectedStop, setSelectedStop] = useState(0);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [actSearch, setActSearch] = useState('');
  const [actTypeFilter, setActTypeFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [customAct, setCustomAct] = useState({ name: '', type: 'Sightseeing', cost: 0, duration: '2h', time: '10:00 AM' });

  if (!trip) return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <p className="text-lg" style={{ color: '#94A3B8' }}>Select a trip first</p>
      <button onClick={() => navigate('trips')} className="mt-3 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>Go to My Trips</button>
    </div>
  );

  const updateTrip = (updater) => setTrips(prev => prev.map(t => t.id === trip.id ? updater(t) : t));

  const addCity = (city) => {
    const newStop = { id: Date.now(), city: city.name, state: city.state, flag: city.flag, days: 3, arrivalDate: '', activities: [], costs: { transport: 0, stay: 0, activities: 0, meals: 0 } };
    updateTrip(t => ({ ...t, stops: [...t.stops, newStop] }));
    showToast(`${city.name} added!`, 'success');
    setShowCityModal(false);
  };

  const removeStop = (stopIdx) => {
    updateTrip(t => ({ ...t, stops: t.stops.filter((_, i) => i !== stopIdx) }));
    if (selectedStop >= trip.stops.length - 1) setSelectedStop(Math.max(0, trip.stops.length - 2));
  };

  const moveStop = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= trip.stops.length) return;
    updateTrip(t => { const stops = [...t.stops]; [stops[idx], stops[newIdx]] = [stops[newIdx], stops[idx]]; return { ...t, stops }; });
    setSelectedStop(newIdx);
  };

  const addActivity = (act) => {
    updateTrip(t => ({ ...t, stops: t.stops.map((s, i) => i === selectedStop ? { ...s, activities: [...s.activities, { ...act, id: Date.now(), done: false }] } : s) }));
    showToast(`${act.name} added!`, 'success');
  };

  const removeActivity = (actId) => updateTrip(t => ({ ...t, stops: t.stops.map((s, i) => i === selectedStop ? { ...s, activities: s.activities.filter(a => a.id !== actId) } : s) }));

  const toggleActivity = (actId) => updateTrip(t => ({ ...t, stops: t.stops.map((s, i) => i === selectedStop ? { ...s, activities: s.activities.map(a => a.id === actId ? { ...a, done: !a.done } : a) } : s) }));

  const filteredCities = CITY_DATABASE.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase()) &&
    (regionFilter === 'All' || c.region === regionFilter) &&
    !trip.stops.some(s => s.city === c.name)
  );

  const filteredActs = ACTIVITY_DATABASE.filter(a =>
    a.name.toLowerCase().includes(actSearch.toLowerCase()) &&
    (actTypeFilter === 'All' || a.type === actTypeFilter)
  );

  const currentStop = trip.stops[selectedStop];
  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };
  const actTypes = ['All', 'Sightseeing', 'Food', 'Adventure', 'Culture', 'Experience', 'Wellness', 'Shopping'];
  const regions = ['All', 'North', 'South', 'East', 'West', 'Islands'];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>{trip.coverEmoji} {trip.name}</h1>
          <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>Build your perfect itinerary</p>
        </div>
        <button onClick={() => navigate('itinerary', { tripId: trip.id })} className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>Preview Itinerary</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Stops */}
        <div className="col-span-1">
          <div className="rounded-2xl p-4" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold" style={{ color: '#F8FAFC' }}>Stops ({trip.stops.length})</h2>
              <button onClick={() => setShowCityModal(true)} className="p-1.5 rounded-lg cursor-pointer" style={{ background: '#F59E0B20', color: '#F59E0B' }} aria-label="Add stop"><Plus size={16} /></button>
            </div>
            <div className="flex flex-col gap-2">
              {trip.stops.map((stop, idx) => (
                <div key={stop.id} onClick={() => setSelectedStop(idx)} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all" style={{ background: selectedStop === idx ? '#1C2537' : 'transparent', border: `1px solid ${selectedStop === idx ? '#F59E0B' : 'transparent'}` }}>
                  <span className="text-lg">{stop.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#F8FAFC' }}>{stop.city}</p>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>{stop.days}d · {stop.activities.length} activities</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <button onClick={e => { e.stopPropagation(); moveStop(idx, -1); }} className="p-0.5 cursor-pointer" style={{ color: '#475569' }} aria-label="Move up"><ChevronUp size={14} /></button>
                    <button onClick={e => { e.stopPropagation(); moveStop(idx, 1); }} className="p-0.5 cursor-pointer" style={{ color: '#475569' }} aria-label="Move down"><ChevronDown size={14} /></button>
                  </div>
                  <button onClick={e => { e.stopPropagation(); removeStop(idx); }} className="p-1 cursor-pointer" style={{ color: '#EF4444' }} aria-label="Remove"><Trash2 size={14} /></button>
                </div>
              ))}
              {trip.stops.length === 0 && (
                <div className="text-center py-8">
                  <MapPin size={32} style={{ color: '#1E2D45', margin: '0 auto' }} />
                  <p className="text-xs mt-2" style={{ color: '#475569' }}>Add your first stop</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Activities with checkboxes — matching wireframe Screen 8 */}
        <div className="col-span-2">
          {currentStop ? (
            <div className="rounded-2xl p-5" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentStop.flag}</span>
                  <div>
                    <h2 className="text-lg font-semibold" style={{ color: '#F8FAFC' }}>{currentStop.city}, {currentStop.state}</h2>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>{currentStop.days} days · {currentStop.arrivalDate || 'Date TBD'}</p>
                  </div>
                </div>
                <button onClick={() => setShowActivityModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
                  <Plus size={16} /> Add Activity
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {currentStop.activities.map(act => (
                  <div key={act.id} className="flex items-center gap-4 p-3 rounded-xl transition-all" style={{ background: '#1C2537', border: '1px solid #1E2D45', opacity: act.done ? 0.6 : 1 }}>
                    <button onClick={() => toggleActivity(act.id)} className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer flex-shrink-0" style={{ background: act.done ? '#10B981' : 'transparent', border: `2px solid ${act.done ? '#10B981' : '#1E2D45'}` }} aria-label="Toggle done">
                      {act.done && <Check size={12} className="text-white" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium" style={{ color: '#F8FAFC', textDecoration: act.done ? 'line-through' : 'none' }}>{act.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: '#F59E0B20', color: '#F59E0B' }}>{act.type}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: '#94A3B8' }}>
                        <span className="flex items-center gap-1"><Clock size={10} /> {act.time}</span>
                        <span>{act.duration}</span>
                        <span className="font-medium" style={{ color: '#10B981' }}>₹{act.cost}</span>
                      </div>
                    </div>
                    <button onClick={() => removeActivity(act.id)} className="p-1.5 cursor-pointer rounded-lg" style={{ color: '#EF4444' }} aria-label="Remove"><Trash2 size={14} /></button>
                  </div>
                ))}
                {currentStop.activities.length === 0 && <div className="text-center py-10" style={{ color: '#475569' }}><p className="text-sm">No activities yet. Add some!</p></div>}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-10 text-center" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
              <MapPin size={48} style={{ color: '#1E2D45', margin: '0 auto' }} />
              <p className="mt-3 text-sm" style={{ color: '#94A3B8' }}>Select a stop to manage activities</p>
            </div>
          )}
        </div>
      </div>

      {/* City Search Modal — with region filters */}
      {showCityModal && (
        <Modal title="Add a City" onClose={() => setShowCityModal(false)}>
          <div className="relative mb-3">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
            <input className="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none" style={inputStyle} placeholder="Search Indian cities..." value={citySearch} onChange={e => setCitySearch(e.target.value)} />
          </div>
          <div className="flex gap-1 mb-3 flex-wrap">
            {regions.map(r => (
              <button key={r} onClick={() => setRegionFilter(r)} className="px-3 py-1 rounded-lg text-xs font-medium cursor-pointer" style={{ background: regionFilter === r ? '#F59E0B' : '#1C2537', color: regionFilter === r ? '#fff' : '#94A3B8' }}>{r}</button>
            ))}
          </div>
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {filteredCities.map(city => (
              <div key={city.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#1C2537', border: '1px solid #1E2D45' }}>
                <span className="text-xl">{city.flag}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#F8FAFC' }}>{city.name}, {city.state}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{city.description}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-lg mr-2" style={{ background: city.costIndex === 'Low' ? '#10B98120' : city.costIndex === 'High' ? '#EF444420' : '#F59E0B20', color: city.costIndex === 'Low' ? '#10B981' : city.costIndex === 'High' ? '#EF4444' : '#F59E0B' }}>{city.costIndex}</span>
                <button onClick={() => addCity(city)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-white cursor-pointer" style={{ background: '#F59E0B' }}>Add</button>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Activity Search Modal */}
      {showActivityModal && (
        <Modal title={`Add Activity — ${currentStop?.city}`} onClose={() => setShowActivityModal(false)}>
          <div className="relative mb-3">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
            <input className="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none" style={inputStyle} placeholder="Search activities..." value={actSearch} onChange={e => setActSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 mb-4 flex-wrap">
            {actTypes.map(t => (
              <button key={t} onClick={() => setActTypeFilter(t)} className="px-3 py-1 rounded-lg text-xs font-medium cursor-pointer" style={{ background: actTypeFilter === t ? '#F59E0B' : '#1C2537', color: actTypeFilter === t ? '#fff' : '#94A3B8' }}>{t}</button>
            ))}
          </div>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto mb-4">
            {filteredActs.map(act => (
              <div key={act.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#1C2537', border: '1px solid #1E2D45' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>{act.name}</span><span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#F59E0B20', color: '#F59E0B' }}>{act.type}</span></div>
                  <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{act.description}</p>
                  <div className="flex gap-3 mt-1 text-xs" style={{ color: '#475569' }}><span>₹{act.cost}</span><span>{act.duration}</span></div>
                </div>
                <button onClick={() => addActivity({ ...act, time: '10:00 AM' })} className="px-3 py-1.5 rounded-lg text-xs font-medium text-white cursor-pointer" style={{ background: '#F59E0B' }}>Add</button>
              </div>
            ))}
          </div>
          {/* Custom activity */}
          <div className="p-4 rounded-xl" style={{ background: '#0A0F1E', border: '1px solid #1E2D45' }}>
            <p className="text-sm font-medium mb-3" style={{ color: '#F8FAFC' }}>Custom Activity</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} placeholder="Activity name" value={customAct.name} onChange={e => setCustomAct({...customAct, name: e.target.value})} />
              <select className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} value={customAct.type} onChange={e => setCustomAct({...customAct, type: e.target.value})}>
                {actTypes.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input type="number" className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} placeholder="Cost (₹)" value={customAct.cost} onChange={e => setCustomAct({...customAct, cost: Number(e.target.value)})} />
              <input className="rounded-lg px-3 py-2 text-xs focus:outline-none" style={inputStyle} placeholder="Duration" value={customAct.duration} onChange={e => setCustomAct({...customAct, duration: e.target.value})} />
            </div>
            <button onClick={() => { if (!customAct.name) return; addActivity(customAct); setCustomAct({ name: '', type: 'Sightseeing', cost: 0, duration: '2h', time: '10:00 AM' }); }} className="w-full py-2 rounded-lg text-xs font-medium text-white cursor-pointer" style={{ background: '#F59E0B' }}>Add Custom Activity</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
