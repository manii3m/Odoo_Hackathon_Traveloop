import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Trash2, Plus, RotateCcw, ChevronDown, ChevronRight, PartyPopper } from 'lucide-react';

export default function PackingChecklist() {
  const { trips, selectedTripId, setSelectedTripId, packingState, setPackingState, showToast } = useApp();
  const [expanded, setExpanded] = useState({ Documents: true, Clothing: true, Electronics: true, Toiletries: true, Essentials: true });
  const [newItems, setNewItems] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const { total, packed } = useMemo(() => {
    let t = 0, p = 0;
    Object.values(packingState).forEach(items => {
      t += items.length;
      p += items.filter(i => i.packed).length;
    });
    return { total: t, packed: p };
  }, [packingState]);

  const pct = total ? Math.round((packed / total) * 100) : 0;

  const toggleItem = (cat, idx) => {
    setPackingState(prev => {
      const next = { ...prev, [cat]: prev[cat].map((item, i) => i === idx ? { ...item, packed: !item.packed } : item) };
      const newPacked = Object.values(next).flat().filter(i => i.packed).length;
      const newTotal = Object.values(next).flat().length;
      if (newPacked === newTotal && newTotal > 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        showToast('All packed! You are ready to go! 🎉', 'success');
      }
      return next;
    });
  };

  const deleteItem = (cat, idx) => {
    setPackingState(prev => ({ ...prev, [cat]: prev[cat].filter((_, i) => i !== idx) }));
  };

  const addItem = (cat) => {
    const name = newItems[cat]?.trim();
    if (!name) return;
    setPackingState(prev => ({ ...prev, [cat]: [...prev[cat], { name, packed: false }] }));
    setNewItems(prev => ({ ...prev, [cat]: '' }));
  };

  const resetAll = () => {
    setPackingState(prev => {
      const next = {};
      Object.entries(prev).forEach(([cat, items]) => {
        next[cat] = items.map(i => ({ ...i, packed: false }));
      });
      return next;
    });
    setShowResetConfirm(false);
    showToast('Checklist reset', 'info');
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;
    if (packingState[newCategory]) { showToast('Category already exists', 'warning'); return; }
    setPackingState(prev => ({ ...prev, [newCategory.trim()]: [] }));
    setExpanded(prev => ({ ...prev, [newCategory.trim()]: true }));
    setNewCategory('');
    showToast('Category added!', 'success');
  };

  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute text-2xl" style={{
              left: `${Math.random() * 100}%`,
              animation: `confettiFall ${2 + Math.random() * 2}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}>
              {['🎉', '🎊', '✨', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Packing Checklist 🎒</h1>
        <select className="rounded-xl px-4 py-2 text-sm focus:outline-none" style={inputStyle} value={selectedTripId || ''} onChange={e => setSelectedTripId(Number(e.target.value))}>
          {trips.map(t => <option key={t.id} value={t.id}>{t.coverEmoji} {t.name}</option>)}
        </select>
      </div>

      {/* Progress */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: '#F8FAFC' }}>{packed} of {total} items packed</span>
          <span className="text-sm font-bold" style={{ color: pct === 100 ? '#10B981' : '#F59E0B' }}>{pct}%</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#1C2537' }}>
          <div className="h-full rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${pct}%`, background: pct === 100 ? '#10B981' : '#F59E0B' }} />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3 mb-4">
        {Object.entries(packingState).map(([cat, items]) => {
          const catPacked = items.filter(i => i.packed).length;
          return (
            <div key={cat} className="rounded-2xl overflow-hidden" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
              <button
                onClick={() => setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }))}
                className="w-full flex items-center justify-between p-4 cursor-pointer transition-colors"
                style={{ color: '#F8FAFC' }}
              >
                <div className="flex items-center gap-2">
                  {expanded[cat] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <span className="font-semibold text-sm">{cat}</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg" style={{ background: '#1C2537', color: '#94A3B8' }}>{catPacked}/{items.length}</span>
                </div>
              </button>
              {expanded[cat] && (
                <div className="px-4 pb-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid #1E2D4530' }}>
                      <button onClick={() => toggleItem(cat, idx)} className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer flex-shrink-0 transition-all" style={{
                        background: item.packed ? '#F59E0B' : 'transparent', border: `2px solid ${item.packed ? '#F59E0B' : '#1E2D45'}`
                      }} aria-label={`Toggle ${item.name}`}>
                        {item.packed && <Check size={12} className="text-white" />}
                      </button>
                      <span className="flex-1 text-sm transition-all" style={{
                        color: item.packed ? '#475569' : '#F8FAFC',
                        textDecoration: item.packed ? 'line-through' : 'none',
                      }}>
                        {item.name}
                      </span>
                      <button onClick={() => deleteItem(cat, idx)} className="p-1 cursor-pointer" style={{ color: '#475569' }} aria-label={`Delete ${item.name}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      className="flex-1 rounded-lg px-3 py-2 text-xs focus:outline-none"
                      style={inputStyle}
                      placeholder="Add item..."
                      value={newItems[cat] || ''}
                      onChange={e => setNewItems(prev => ({ ...prev, [cat]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && addItem(cat)}
                    />
                    <button onClick={() => addItem(cat)} className="p-2 rounded-lg cursor-pointer" style={{ background: '#F59E0B20', color: '#F59E0B' }} aria-label="Add item">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2">
          <input className="flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} placeholder="New category name..." value={newCategory} onChange={e => setNewCategory(e.target.value)} />
          <button onClick={addCategory} className="px-4 py-2.5 rounded-xl text-sm font-medium text-white cursor-pointer" style={{ background: '#F59E0B' }}>Add Category</button>
        </div>
        {showResetConfirm ? (
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: '#EF4444' }}>Sure?</span>
            <button onClick={resetAll} className="px-3 py-2 rounded-lg text-xs font-medium cursor-pointer" style={{ background: '#EF4444', color: '#fff' }}>Yes</button>
            <button onClick={() => setShowResetConfirm(false)} className="px-3 py-2 rounded-lg text-xs cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>No</button>
          </div>
        ) : (
          <button onClick={() => setShowResetConfirm(true)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>
            <RotateCcw size={14} /> Reset All
          </button>
        )}
      </div>
    </div>
  );
}
