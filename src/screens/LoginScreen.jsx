import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plane, Mail, Lock, User, Eye, EyeOff, Phone, MapPin, FileText } from 'lucide-react';

export default function LoginScreen() {
  const { loginTab, setLoginTab, loginUser, registerUser, showToast, setCurrentScreen } = useApp();
  const tab = loginTab;
  const setTab = setLoginTab;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [bio, setBio] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) { showToast('Please fill in all fields', 'warning'); return; }
    
    if (tab === 'signup') {
      if (password !== confirmPw) { showToast('Passwords do not match', 'error'); return; }
      if (!name) { showToast('Please enter your name', 'warning'); return; }
      
      const success = registerUser({ name, email, password, phone, city, state, bio, language: 'English', currency: 'INR' });
      if (success) {
        showToast('Account created! Aapka safar shuru ho gaya! ✈️', 'success');
      } else {
        showToast('Email already exists', 'error');
      }
    } else {
      const success = loginUser(email, password);
      if (success) {
        showToast('Swagat hai! Welcome back! 🙏', 'success');
      } else {
        showToast('Invalid email or password', 'error');
      }
    }
  };

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-200";
  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#0A0F1E' }}>
      {/* Background decorative shapes — Indian inspired */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F59E0B, transparent)', animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute bottom-32 right-32 w-96 h-96 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #EF4444, transparent)', animation: 'float 8s ease-in-out infinite 1s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #10B981, transparent)', animation: 'float 7s ease-in-out infinite 2s' }} />
        {/* Indian skyline shapes */}
        <svg className="absolute bottom-0 left-0 w-full h-48 opacity-5" viewBox="0 0 1200 200">
          {/* Taj Mahal silhouette */}
          <path d="M200,200 L200,100 Q220,60 240,100 L240,200" fill="#F59E0B" />
          <path d="M210,100 L220,40 L230,100" fill="#F59E0B" />
          <rect x="180" y="120" width="80" height="80" fill="#F59E0B" />
          {/* Temple gopuram */}
          <path d="M500,200 L500,80 L510,60 L520,50 L530,60 L540,80 L540,200" fill="#EF4444" />
          <rect x="490" y="100" width="60" height="100" fill="#EF4444" />
          {/* Gateway of India */}
          <rect x="800" y="100" width="80" height="100" fill="#F59E0B" />
          <path d="M800,100 L840,60 L880,100" fill="#F59E0B" />
          <rect x="820" y="140" width="40" height="60" rx="20" fill="#0A0F1E" />
          {/* Mountain peaks */}
          <path d="M1000,200 L1050,80 L1100,200" fill="#3B82F6" />
          <path d="M1060,200 L1100,100 L1140,200" fill="#60A5FA" />
        </svg>
      </div>

      <button onClick={() => setCurrentScreen('landing')} className="absolute top-6 left-6 text-white hover:text-amber-500 z-20 flex items-center gap-2 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Home
      </button>

      <div className="w-full max-w-md relative z-10 px-4" style={{ animation: 'fadeIn 0.5s ease-out' }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
            <Plane size={28} className="text-white" />
          </div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#F8FAFC' }}>YATRA</h1>
          <p className="text-sm" style={{ color: '#94A3B8' }}>Apna safar, apni kahani ✈️</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
          {/* Tabs */}
          <div className="flex mb-6 rounded-xl p-1" style={{ background: '#0A0F1E' }}>
            {['signin', 'signup'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  background: tab === t ? 'linear-gradient(135deg, #F59E0B, #EF4444)' : 'transparent',
                  color: tab === t ? '#fff' : '#94A3B8',
                }}
              >
                {t === 'signin' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {tab === 'signup' && (
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input className={inputClass} style={{ ...inputStyle, paddingLeft: 44 }} placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
              <input className={inputClass} style={{ ...inputStyle, paddingLeft: 44 }} placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            {tab === 'signup' && (
              <>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                  <input className={inputClass} style={{ ...inputStyle, paddingLeft: 44 }} placeholder="Phone Number (+91)" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                    <input className={inputClass} style={{ ...inputStyle, paddingLeft: 44 }} placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                  </div>
                  <select className={inputClass} style={inputStyle} value={state} onChange={e => setState(e.target.value)}>
                    <option value="">State</option>
                    {["Maharashtra","Delhi","Karnataka","Tamil Nadu","Kerala","Rajasthan","Gujarat","UP","West Bengal","Telangana","HP","Uttarakhand","Punjab","Goa","Others"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-3" style={{ color: '#475569' }} />
                  <textarea className={inputClass + " resize-none"} rows={2} style={{ ...inputStyle, paddingLeft: 44 }} placeholder="Tell us about yourself (optional)" value={bio} onChange={e => setBio(e.target.value)} />
                </div>
              </>
            )}
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
              <input className={inputClass} style={{ ...inputStyle, paddingLeft: 44, paddingRight: 44 }} placeholder="Password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: '#475569' }} aria-label="Toggle password">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {tab === 'signup' && (
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input className={inputClass} style={{ ...inputStyle, paddingLeft: 44 }} placeholder="Confirm Password" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
              </div>
            )}
          </div>

          {tab === 'signin' && (
            <button onClick={() => showToast('Reset link sent to your email!', 'success')} className="text-xs mt-2 cursor-pointer transition-colors" style={{ color: '#F59E0B' }}>
              Forgot Password?
            </button>
          )}

          <button
            onClick={handleSubmit}
            className="w-full mt-5 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: '#1E2D45' }} />
            <span className="text-xs" style={{ color: '#475569' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: '#1E2D45' }} />
          </div>

          <button
            onClick={() => showToast('Google sign-in coming soon!', 'info')}
            className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
            style={{ background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' }}
            onMouseEnter={e => e.currentTarget.style.background = '#243044'}
            onMouseLeave={e => e.currentTarget.style.background = '#1C2537'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
