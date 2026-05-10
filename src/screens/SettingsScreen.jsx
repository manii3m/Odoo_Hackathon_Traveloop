import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Settings, Shield, Save, Trash2 } from 'lucide-react';

export default function SettingsScreen() {
  const { currentUser, setCurrentUser, logoutUser, navigate, showToast, darkMode, setDarkMode } = useApp();
  const [tab, setTab] = useState('profile');
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [bio, setBio] = useState(currentUser.bio);
  const [city, setCity] = useState(currentUser.city);
  const [lang, setLang] = useState(currentUser.language);
  const [currency, setCurrency] = useState(currentUser.currency);
  const [profilePublic, setProfilePublic] = useState(true);
  const [tripsPublic, setTripsPublic] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} className="w-11 h-6 rounded-full p-0.5 transition-all cursor-pointer" style={{ background: value ? '#F59E0B' : '#1E2D45' }}>
      <div className="w-5 h-5 rounded-full bg-white transition-all" style={{ transform: value ? 'translateX(20px)' : 'translateX(0)' }} />
    </button>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Settings</h1>

      <div className="flex gap-1 rounded-xl p-1 mb-6" style={{ background: '#0A0F1E' }}>
        {tabs.map(t => { const Icon = t.icon; return (
          <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer" style={{
            background: tab === t.id ? '#F59E0B' : 'transparent', color: tab === t.id ? '#fff' : '#94A3B8'
          }}><Icon size={16} /> {t.label}</button>
        ); })}
      </div>

      <div className="rounded-2xl p-6" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        {tab === 'profile' && (
          <div className="flex flex-col gap-4">
            <div><label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Full Name</label><input className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={name} onChange={e => setName(e.target.value)} /></div>
            <div><label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Email</label><input className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} /></div>
            <div><label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Phone</label><input className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value)} /></div>
            <div><label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>City</label><input className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={city} onChange={e => setCity(e.target.value)} /></div>
            <div><label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Bio</label><textarea className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" rows={3} style={inputStyle} value={bio} onChange={e => setBio(e.target.value)} /></div>
            <button onClick={() => { setCurrentUser({ ...currentUser, name, email, phone, bio, city }); showToast('Profile saved!', 'success'); }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}

        {tab === 'preferences' && (
          <div className="flex flex-col gap-5">
            <div><label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Language</label>
              <select className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={lang} onChange={e => { setLang(e.target.value); setCurrentUser(u => ({ ...u, language: e.target.value })); showToast('Language updated', 'success'); }}>
                {['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi'].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div><label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Currency</label>
              <select className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={currency} onChange={e => { setCurrency(e.target.value); setCurrentUser(u => ({ ...u, currency: e.target.value })); showToast('Currency updated', 'success'); }}>
                {['INR', 'USD', 'EUR', 'GBP'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#1C2537', border: '1px solid #1E2D45' }}>
              <div><p className="text-sm font-medium" style={{ color: '#F8FAFC' }}>Dark Mode</p><p className="text-xs" style={{ color: '#94A3B8' }}>Toggle theme appearance</p></div>
              <Toggle value={darkMode} onChange={(v) => { setDarkMode(v); showToast(v ? 'Dark mode enabled' : 'Light mode enabled', 'info'); }} />
            </div>
          </div>
        )}

        {tab === 'privacy' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#1C2537', border: '1px solid #1E2D45' }}>
              <div><p className="text-sm font-medium" style={{ color: '#F8FAFC' }}>Make profile public</p><p className="text-xs" style={{ color: '#94A3B8' }}>Others can see your profile</p></div>
              <Toggle value={profilePublic} onChange={setProfilePublic} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#1C2537', border: '1px solid #1E2D45' }}>
              <div><p className="text-sm font-medium" style={{ color: '#F8FAFC' }}>Share trips publicly</p><p className="text-xs" style={{ color: '#94A3B8' }}>Your yaatras appear in community</p></div>
              <Toggle value={tripsPublic} onChange={setTripsPublic} />
            </div>
            <div className="pt-4" style={{ borderTop: '1px solid #1E2D45' }}>
              <button onClick={() => { logoutUser(); showToast('Logged out successfully', 'info'); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium w-full justify-center cursor-pointer mb-4" style={{ background: '#1C2537', color: '#F8FAFC', border: '1px solid #1E2D45' }}>
                Logout
              </button>
              {showDeleteConfirm ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm" style={{ color: '#EF4444' }}>Are you sure?</span>
                  <button onClick={() => { showToast('Account deletion disabled in demo', 'warning'); setShowDeleteConfirm(false); }} className="px-4 py-2 rounded-xl text-sm font-medium text-white cursor-pointer" style={{ background: '#EF4444' }}>Confirm</button>
                  <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-xl text-sm cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer" style={{ background: '#EF444410', color: '#EF4444', border: '1px solid #EF444430' }}>
                  <Trash2 size={16} /> Delete Account
                </button>
              )}
            </div>
            <div className="mt-4 text-center"><button onClick={() => navigate('admin')} className="text-xs cursor-pointer" style={{ color: '#475569' }}>Admin Dashboard →</button></div>
          </div>
        )}
      </div>
    </div>
  );
}
