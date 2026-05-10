import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Pencil, Trash2, BookOpen, Calendar } from 'lucide-react';

export default function TripNotes() {
  const { trips, selectedTripId, setSelectedTripId, notes, setNotes, showToast } = useApp();
  const trip = trips.find(t => t.id === selectedTripId) || trips[0];
  const [stopFilter, setStopFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const [editStop, setEditStop] = useState(null);

  const filteredNotes = notes
    .filter(n => n.tripId === (trip?.id || 0))
    .filter(n => stopFilter === 'all' || (stopFilter === 'general' ? !n.stopId : n.stopId === Number(stopFilter)))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const startNew = () => { setEditing('new'); setEditTitle(''); setEditText(''); setEditStop(null); };
  const startEdit = (note) => { setEditing(note.id); setEditTitle(note.title); setEditText(note.text); setEditStop(note.stopId); };

  const saveNote = () => {
    if (!editTitle.trim() || !editText.trim()) { showToast('Title and content required', 'warning'); return; }
    if (editing === 'new') {
      setNotes(prev => [...prev, { id: Date.now(), tripId: trip.id, stopId: editStop, title: editTitle, text: editText, date: new Date().toISOString() }]);
      showToast('Note saved!', 'success');
    } else {
      setNotes(prev => prev.map(n => n.id === editing ? { ...n, title: editTitle, text: editText, stopId: editStop, date: new Date().toISOString() } : n));
      showToast('Note updated!', 'success');
    }
    setEditing(null);
  };

  const deleteNote = (id) => { setNotes(prev => prev.filter(n => n.id !== id)); showToast('Note deleted', 'info'); };
  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };

  const getStopName = (stopId) => {
    if (!stopId) return 'General';
    const stop = trip?.stops?.find(s => s.id === stopId);
    return stop ? `${stop.flag} ${stop.city}` : 'General';
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Travel Diary 📔</h1>
        <button onClick={startNew} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
          <Plus size={16} /> New Entry
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <select className="rounded-xl px-4 py-2 text-sm focus:outline-none" style={inputStyle} value={selectedTripId || ''} onChange={e => setSelectedTripId(Number(e.target.value))}>
          {trips.map(t => <option key={t.id} value={t.id}>{t.coverEmoji} {t.name}</option>)}
        </select>
        <select className="rounded-xl px-4 py-2 text-sm focus:outline-none" style={inputStyle} value={stopFilter} onChange={e => setStopFilter(e.target.value)}>
          <option value="all">All Stops</option>
          <option value="general">General</option>
          {trip?.stops?.map(s => <option key={s.id} value={s.id}>{s.flag} {s.city}</option>)}
        </select>
      </div>

      {editing !== null && (
        <div className="rounded-2xl p-5 mb-6" style={{ background: '#111827', border: '1px solid #F59E0B' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#F8FAFC' }}>{editing === 'new' ? 'New Diary Entry' : 'Edit Entry'}</h3>
          <div className="flex flex-col gap-3">
            <input className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} placeholder="Entry title" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            <select className="rounded-xl px-4 py-3 text-sm focus:outline-none" style={inputStyle} value={editStop || ''} onChange={e => setEditStop(e.target.value ? Number(e.target.value) : null)}>
              <option value="">General</option>
              {trip?.stops?.map(s => <option key={s.id} value={s.id}>{s.flag} {s.city}</option>)}
            </select>
            <textarea className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" rows={5} style={inputStyle} placeholder="Write about your experience, tips, memories..." value={editText} onChange={e => setEditText(e.target.value)} />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl text-sm cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>Cancel</button>
              <button onClick={saveNote} className="px-5 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ background: '#F59E0B' }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {filteredNotes.length === 0 && editing === null ? (
        <div className="flex flex-col items-center justify-center py-20">
          <BookOpen size={64} style={{ color: '#1E2D45' }} />
          <h3 className="text-lg font-semibold mt-4" style={{ color: '#94A3B8' }}>No diary entries yet</h3>
          <p className="text-sm mt-1" style={{ color: '#475569' }}>Capture your travel memories, tips & recommendations</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredNotes.map(note => (
            <div key={note.id} className="rounded-2xl p-4 transition-all" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm" style={{ color: '#F8FAFC' }}>{note.title}</h3>
                <div className="flex items-center gap-1">
                  <button onClick={() => startEdit(note)} className="p-1.5 cursor-pointer rounded-lg" style={{ color: '#94A3B8' }} aria-label="Edit"><Pencil size={14} /></button>
                  <button onClick={() => deleteNote(note.id)} className="p-1.5 cursor-pointer rounded-lg" style={{ color: '#EF4444' }} aria-label="Delete"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-sm mb-2" style={{ color: '#94A3B8' }}>{note.text}</p>
              <div className="flex items-center gap-3 text-xs" style={{ color: '#475569' }}>
                <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(note.date).toLocaleDateString('en-IN')}</span>
                <span className="px-2 py-0.5 rounded-lg" style={{ background: '#1C2537' }}>{getStopName(note.stopId)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
