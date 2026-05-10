import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight, Sparkles, Users } from 'lucide-react';

const EMOJI_OPTIONS = ['🏰', '🌴', '🏔️', '🛕', '🏖️', '🧘', '🐪', '⛵', '🍵', '🎭', '🌸', '🚂'];

export default function CreateTrip() {
  const { trips, setTrips, navigate, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('🏰');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(25000);
  const [isPublic, setIsPublic] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [collaborators, setCollaborators] = useState('');

  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };

  const handleCreate = () => {
    if (!name) { showToast('Please enter a trip name', 'warning'); return; }
    if (!startDate || !endDate) { showToast('Please set trip dates', 'warning'); return; }
    const newTrip = {
      id: Date.now(), name, description, coverEmoji: emoji,
      startDate, endDate, totalBudget: budget, status: 'upcoming',
      stops: [],
    };
    setTrips(prev => [...prev, newTrip]);
    showToast('Yatra created successfully! 🎉', 'success');
    navigate('builder', { tripId: newTrip.id });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>
        <Sparkles size={24} className="inline mr-2" style={{ color: '#F59E0B' }} />
        Create New Yatra
      </h1>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all" style={{
              background: step >= s ? 'linear-gradient(135deg, #F59E0B, #EF4444)' : '#1C2537',
              color: step >= s ? '#fff' : '#475569',
              border: `2px solid ${step >= s ? '#F59E0B' : '#1E2D45'}`
            }}>
              {s}
            </div>
            {s < 3 && <div className="flex-1 h-0.5 rounded" style={{ background: step > s ? '#F59E0B' : '#1E2D45' }} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-6" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#F8FAFC' }}>Basic Info</h2>
            <div>
              <label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Trip Name</label>
              <input className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} placeholder="e.g., Rajasthan Road Trip" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Description</label>
              <textarea className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" rows={3} style={inputStyle} placeholder="What's this yatra about?" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
              <label className="text-sm mb-2 block" style={{ color: '#94A3B8' }}>Cover Emoji</label>
              <div className="grid grid-cols-6 gap-2">
                {EMOJI_OPTIONS.map(e => (
                  <button key={e} onClick={() => setEmoji(e)} className="text-2xl p-2 rounded-xl cursor-pointer transition-all" style={{
                    background: emoji === e ? '#F59E0B20' : '#1C2537',
                    border: `2px solid ${emoji === e ? '#F59E0B' : '#1E2D45'}`
                  }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#F8FAFC' }}>Travel Dates</h2>
            <div>
              <label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Start Date</label>
              <input type="date" className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>End Date</label>
              <input type="date" className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            {startDate && endDate && (
              <div className="rounded-xl p-3 text-sm" style={{ background: '#F59E0B10', color: '#F59E0B' }}>
                Trip duration: {Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)))} days
              </div>
            )}
            {/* Collaborative toggle — matching wireframe */}
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#1C2537', border: '1px solid #1E2D45' }}>
              <div className="flex items-center gap-2">
                <Users size={18} style={{ color: '#F59E0B' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#F8FAFC' }}>Collaborative Trip</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>Plan together with friends or family</p>
                </div>
              </div>
              <button onClick={() => setIsCollaborative(!isCollaborative)} className="w-11 h-6 rounded-full p-0.5 transition-all cursor-pointer" style={{ background: isCollaborative ? '#F59E0B' : '#1E2D45' }}>
                <div className="w-5 h-5 rounded-full bg-white transition-all" style={{ transform: isCollaborative ? 'translateX(20px)' : 'translateX(0)' }} />
              </button>
            </div>
            {isCollaborative && (
              <div>
                <label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Add collaborators (emails, comma separated)</label>
                <input className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} placeholder="e.g., priya@gmail.com, arjun@gmail.com" value={collaborators} onChange={e => setCollaborators(e.target.value)} />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#F8FAFC' }}>Budget & Privacy</h2>
            <div>
              <label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Total Budget: ₹{budget.toLocaleString('en-IN')}</label>
              <input type="range" min={2000} max={500000} step={1000} value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full accent-amber-500" />
              <div className="flex justify-between text-xs mt-1" style={{ color: '#475569' }}>
                <span>₹2,000</span><span>₹5,00,000</span>
              </div>
            </div>
            <div>
              <label className="text-sm mb-1 block" style={{ color: '#94A3B8' }}>Or enter manually (₹)</label>
              <input type="number" className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={budget} onChange={e => setBudget(Number(e.target.value))} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#1C2537', border: '1px solid #1E2D45' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: '#F8FAFC' }}>Make trip public</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>Share your yatra with the community</p>
              </div>
              <button onClick={() => setIsPublic(!isPublic)} className="w-11 h-6 rounded-full p-0.5 transition-all cursor-pointer" style={{ background: isPublic ? '#F59E0B' : '#1E2D45' }}>
                <div className="w-5 h-5 rounded-full bg-white transition-all" style={{ transform: isPublic ? 'translateX(20px)' : 'translateX(0)' }} />
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
              <Sparkles size={16} /> Create Yatra
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
