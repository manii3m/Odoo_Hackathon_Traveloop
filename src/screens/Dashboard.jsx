import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CITY_DATABASE } from '../data/seedData';
import { Plus, MapPin, Calendar, Wallet, Globe, TrendingUp, Compass, Train, Mountain, Palmtree } from 'lucide-react';

export default function Dashboard() {
  const { trips, navigate, currentUser } = useApp();

  const stats = useMemo(() => {
    const states = new Set();
    let totalDays = 0;
    let totalBudget = 0;
    trips.forEach(t => {
      t.stops.forEach(s => states.add(s.state));
      const start = new Date(t.startDate);
      const end = new Date(t.endDate);
      totalDays += Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      totalBudget += t.totalBudget;
    });
    return { total: trips.length, states: states.size, days: totalDays, avgBudget: trips.length ? Math.round(totalBudget / trips.length) : 0 };
  }, [trips]);

  const topDestinations = CITY_DATABASE.slice(0, 6);
  const trendingTrips = trips.slice(0, 3);

  const quickActions = [
    { label: 'My Trips', screen: 'trips', icon: MapPin },
    { label: 'Budget Tracker', screen: 'budget', icon: Wallet },
    { label: 'Community Hub', screen: 'community', icon: Globe },
  ];

  const statCards = [
    { label: 'Total Trips', value: stats.total, icon: Compass, color: '#F59E0B' },
    { label: 'States Visited', value: stats.states, icon: Globe, color: '#10B981' },
    { label: 'Days Planned', value: stats.days, icon: Calendar, color: '#3B82F6' },
    { label: 'Avg Budget', value: `₹${stats.avgBudget.toLocaleString('en-IN')}`, icon: TrendingUp, color: '#8B5CF6' },
  ];

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Suprabhat';
    if (h < 17) return 'Namaste';
    return 'Shubh Sandhya';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>
            {greeting()}, {currentUser.name.split(' ')[0]} 🙏
          </h1>
          <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <button
          onClick={() => navigate('create-trip')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <Plus size={18} /> Plan New Yatra
        </button>
      </div>

      {/* Hero Banner — matching wireframe "Banner Image" */}
      <div
        className="rounded-2xl p-8 mb-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #78350f, #F59E0B, #EF4444, #7c3aed)',
          backgroundSize: '400% 400%',
          animation: 'heroGradient 8s ease infinite',
          minHeight: 180,
        }}
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Incredible India Awaits! 🇮🇳
          </h2>
          <p className="text-amber-100 text-sm max-w-md mb-4">
            From the snow peaks of Ladakh to the backwaters of Kerala — plan your next unforgettable yatra.
          </p>
          <button onClick={() => navigate('create-trip')} className="px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}>
            Start Planning →
          </button>
        </div>
        <div className="absolute top-4 right-8 text-7xl opacity-20">🏔️</div>
        <div className="absolute bottom-4 right-24 text-5xl opacity-15">🛕</div>
        <div className="absolute bottom-8 right-48 text-4xl opacity-10">🌴</div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-6">
        {quickActions.map(a => {
          const Icon = a.icon;
          return (
            <button
              key={a.screen}
              onClick={() => navigate(a.screen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{ background: '#1C2537', border: '1px solid #1E2D45', color: '#94A3B8' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#243044'; e.currentTarget.style.color = '#F8FAFC'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1C2537'; e.currentTarget.style.color = '#94A3B8'; }}
            >
              <Icon size={16} /> {a.label}
            </button>
          );
        })}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {statCards.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20` }}>
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: '#F8FAFC' }}>{s.value}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{s.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Trips / Recent Trips — matching wireframe */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Your Trips</h2>
          <button onClick={() => navigate('trips')} className="text-sm cursor-pointer" style={{ color: '#F59E0B' }}>View all →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {trips.map(trip => {
            const totalCost = trip.stops.reduce((s, st) => s + Object.values(st.costs).reduce((a, b) => a + b, 0), 0);
            return (
              <div
                key={trip.id}
                className="rounded-2xl p-5 min-w-[300px] cursor-pointer transition-all duration-300 flex-shrink-0"
                style={{ background: '#111827', border: '1px solid #1E2D45' }}
                onClick={() => navigate('itinerary', { tripId: trip.id })}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#F59E0B'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1E2D45'; }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{trip.coverEmoji}</div>
                  <div>
                    <h3 className="font-semibold text-base" style={{ color: '#F8FAFC' }}>{trip.name}</h3>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>{trip.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs mb-3" style={{ color: '#94A3B8' }}>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {trip.stops.length} cities</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {trip.startDate}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-lg`} style={{
                    background: trip.status === 'completed' ? '#10B98120' : '#F59E0B20',
                    color: trip.status === 'completed' ? '#10B981' : '#F59E0B'
                  }}>
                    {trip.status === 'completed' ? '✓ Completed' : 'Upcoming'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2 py-1 rounded-lg" style={{ background: '#F59E0B20', color: '#F59E0B' }}>
                    ₹{totalCost.toLocaleString('en-IN')} est.
                  </span>
                  <span className="text-xs" style={{ color: '#475569' }}>Budget: ₹{trip.totalBudget.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Destinations — matching wireframe grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Trending Destinations</h2>
        <div className="grid grid-cols-3 gap-4">
          {topDestinations.map(city => (
            <div
              key={city.id}
              className="rounded-2xl p-4 transition-all duration-300 cursor-pointer"
              style={{ background: '#111827', border: '1px solid #1E2D45' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#F59E0B'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1E2D45'; }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{city.flag}</span>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: '#F8FAFC' }}>{city.name}</h3>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{city.state}</p>
                </div>
              </div>
              <p className="text-xs mb-3" style={{ color: '#94A3B8' }}>{city.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded-lg" style={{
                  background: city.costIndex === 'Low' ? '#10B98120' : city.costIndex === 'High' ? '#EF444420' : '#F59E0B20',
                  color: city.costIndex === 'Low' ? '#10B981' : city.costIndex === 'High' ? '#EF4444' : '#F59E0B'
                }}>
                  {city.costIndex} cost
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: '#1C2537' }}>
                    <div className="h-full rounded-full" style={{ width: `${city.popularity}%`, background: '#F59E0B', transition: 'width 1s ease-in-out' }} />
                  </div>
                  <span className="text-xs" style={{ color: '#475569' }}>{city.popularity}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
