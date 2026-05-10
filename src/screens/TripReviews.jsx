import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRIP_REVIEWS } from '../data/seedData';
import { Star, ThumbsUp, Calendar, MessageSquare, TrendingUp, Award } from 'lucide-react';

export default function TripReviews() {
  const { showToast } = useApp();
  const [reviews] = useState(TRIP_REVIEWS);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const filtered = reviews
    .filter(r => filter === 'All' || r.rating === Number(filter))
    .sort((a, b) => sortBy === 'helpful' ? b.helpful - a.helpful : new Date(b.date) - new Date(a.date));

  const ratingDist = [5, 4, 3, 2, 1].map(r => ({
    rating: r,
    count: reviews.filter(rv => rv.rating === r).length,
    pct: Math.round((reviews.filter(rv => rv.rating === r).length / reviews.length) * 100)
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Trip Reviews & Ratings ⭐</h1>

      {/* Summary — matching wireframe Screen 13 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl p-6 text-center" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
          <p className="text-4xl font-bold" style={{ color: '#F59E0B' }}>{avgRating}</p>
          <div className="flex justify-center gap-0.5 my-2">
            {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.round(avgRating) ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />)}
          </div>
          <p className="text-xs" style={{ color: '#94A3B8' }}>{reviews.length} reviews</p>
        </div>
        <div className="rounded-2xl p-4 col-span-2" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#F8FAFC' }}>Rating Distribution</h3>
          {ratingDist.map(r => (
            <div key={r.rating} className="flex items-center gap-2 mb-1.5">
              <span className="text-xs w-6 text-right" style={{ color: '#94A3B8' }}>{r.rating}★</span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#1C2537' }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${r.pct}%`, background: '#F59E0B' }} />
              </div>
              <span className="text-xs w-8" style={{ color: '#475569' }}>{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Most Helpful', value: 'Ladakh Road Trip', icon: ThumbsUp, color: '#3B82F6' },
          { label: 'Top Rated', value: 'Rajasthan Royal', icon: Award, color: '#F59E0B' },
          { label: 'Total Reviews', value: reviews.length, icon: MessageSquare, color: '#10B981' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20` }}><Icon size={20} style={{ color: s.color }} /></div>
                <div><p className="text-sm font-bold" style={{ color: '#F8FAFC' }}>{s.value}</p><p className="text-xs" style={{ color: '#94A3B8' }}>{s.label}</p></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 rounded-xl p-1" style={{ background: '#0A0F1E' }}>
          {['All', '5', '4', '3'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer" style={{
              background: filter === f ? '#F59E0B' : 'transparent', color: filter === f ? '#fff' : '#94A3B8'
            }}>{f === 'All' ? 'All' : `${f} ★`}</button>
          ))}
        </div>
        <select className="rounded-xl px-3 py-1.5 text-xs focus:outline-none" style={{ background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews list */}
      <div className="flex flex-col gap-4">
        {filtered.map(review => (
          <div key={review.id} className="rounded-2xl p-5 transition-all" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)', color: '#fff' }}>
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#F8FAFC' }}>{review.reviewer}</p>
                  <p className="text-xs flex items-center gap-1" style={{ color: '#94A3B8' }}><Calendar size={10} /> {review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= review.rating ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />)}
              </div>
            </div>
            <p className="text-xs font-medium mb-1 px-2 py-0.5 rounded-lg inline-block" style={{ background: '#F59E0B20', color: '#F59E0B' }}>{review.tripName}</p>
            <p className="text-sm mt-2" style={{ color: '#94A3B8' }}>{review.review}</p>
            <div className="flex items-center gap-4 mt-3">
              <button onClick={() => showToast('Marked as helpful!', 'success')} className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: '#94A3B8' }}>
                <ThumbsUp size={14} /> Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
