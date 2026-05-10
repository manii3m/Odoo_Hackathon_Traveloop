import { useApp } from '../context/AppContext';
import { LayoutDashboard, Map, Route, DollarSign, Package, BookOpen, User, Shield, ChevronLeft, ChevronRight, Plane, Users, Star, Settings, Sparkles, Clock } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'trips', label: 'My Trips', icon: Map },
  { id: 'ai-planner', label: 'AI Planner', icon: Sparkles },
  { id: 'itinerary', label: 'Itinerary', icon: Clock },
  { id: 'budget', label: 'Budget', icon: DollarSign },
  { id: 'packing', label: 'Packing', icon: Package },
  { id: 'notes', label: 'Travel Diary', icon: BookOpen },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { currentScreen, navigate, sidebarExpanded, setSidebarExpanded } = useApp();

  return (
    <div
      className="h-screen fixed left-0 top-0 flex flex-col z-40 transition-all duration-300"
      style={{
        width: sidebarExpanded ? 240 : 64,
        background: '#111827',
        borderRight: '1px solid #1E2D45'
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
          <Plane size={18} className="text-white" />
        </div>
        {sidebarExpanded && (
          <span style={{ fontFamily: "'DM Serif Display', serif", color: '#F8FAFC', fontSize: 20 }}>
            YATRA
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 px-2 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              aria-label={item.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left w-full"
              style={{
                background: active ? '#1C2537' : 'transparent',
                color: active ? '#F59E0B' : '#94A3B8',
                borderLeft: active ? '2px solid #F59E0B' : '2px solid transparent',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#1C2537'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={20} />
              {sidebarExpanded && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Admin link */}
      <div className="px-2 mb-2">
        <button
          onClick={() => navigate('admin')}
          aria-label="Admin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer w-full"
          style={{
            background: currentScreen === 'admin' ? '#1C2537' : 'transparent',
            color: currentScreen === 'admin' ? '#F59E0B' : '#475569',
            borderLeft: currentScreen === 'admin' ? '2px solid #F59E0B' : '2px solid transparent',
          }}
          onMouseEnter={e => { if (currentScreen !== 'admin') e.currentTarget.style.background = '#1C2537'; }}
          onMouseLeave={e => { if (currentScreen !== 'admin') e.currentTarget.style.background = 'transparent'; }}
        >
          <Shield size={18} />
          {sidebarExpanded && <span className="text-xs font-medium">Admin</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
        aria-label="Toggle sidebar"
        className="flex items-center justify-center py-3 cursor-pointer transition-colors duration-200"
        style={{ borderTop: '1px solid #1E2D45', color: '#94A3B8' }}
        onMouseEnter={e => e.currentTarget.style.color = '#F8FAFC'}
        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
      >
        {sidebarExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>
    </div>
  );
}
