import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMMUNITY_POSTS } from '../data/seedData';
import { Heart, MessageCircle, Share2, MapPin, Plus, Send, Image } from 'lucide-react';

const GRADIENT_COLORS = [
  'linear-gradient(135deg, #F59E0B, #EF4444)',
  'linear-gradient(135deg, #10B981, #3B82F6)',
  'linear-gradient(135deg, #8B5CF6, #EC4899)',
  'linear-gradient(135deg, #3B82F6, #06B6D4)',
  'linear-gradient(135deg, #EF4444, #F59E0B)',
  'linear-gradient(135deg, #10B981, #F59E0B)',
];

export default function CommunityHub() {
  const { showToast } = useApp();
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [newCaption, setNewCaption] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
  };

  const addPost = () => {
    if (!newCaption.trim()) { showToast('Write something about your yatra!', 'warning'); return; }
    const post = {
      id: Date.now(), user: "Aarav Patel", avatar: "AP",
      location: newLocation || "Somewhere in India",
      caption: newCaption, likes: 0, comments: 0, timestamp: "Just now",
      image: "custom"
    };
    setPosts(prev => [post, ...prev]);
    setNewCaption('');
    setNewLocation('');
    setShowPostForm(false);
    showToast('Post shared with community! 🎉', 'success');
  };

  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>Community Hub 🇮🇳</h1>
          <p className="text-sm" style={{ color: '#94A3B8' }}>Travel stories from fellow yaatris</p>
        </div>
        <button onClick={() => setShowPostForm(!showPostForm)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
          <Plus size={16} /> Share Your Story
        </button>
      </div>

      {/* New post form */}
      {showPostForm && (
        <div className="rounded-2xl p-5 mb-6" style={{ background: '#111827', border: '1px solid #F59E0B' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#F8FAFC' }}>Share your travel moment</h3>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
              <input className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none" style={inputStyle} placeholder="Location (e.g., Jaipur, Rajasthan)" value={newLocation} onChange={e => setNewLocation(e.target.value)} />
            </div>
            <textarea className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none" rows={3} style={inputStyle} placeholder="What's your travel story? Share tips, memories, recommendations..." value={newCaption} onChange={e => setNewCaption(e.target.value)} />
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>
                <Image size={14} /> Add Photo
              </button>
              <div className="flex gap-2">
                <button onClick={() => setShowPostForm(false)} className="px-4 py-2 rounded-xl text-sm cursor-pointer" style={{ border: '1px solid #1E2D45', color: '#94A3B8' }}>Cancel</button>
                <button onClick={addPost} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ background: '#F59E0B' }}>
                  <Send size={14} /> Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts feed — matching wireframe Screen 10 Community Hub */}
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post, idx) => (
          <div key={post.id} className="rounded-2xl overflow-hidden transition-all duration-300" style={{ background: '#111827', border: '1px solid #1E2D45' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#F59E0B'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1E2D45'}
          >
            {/* Image placeholder with gradient */}
            <div className="h-40 flex items-center justify-center text-5xl" style={{ background: GRADIENT_COLORS[idx % GRADIENT_COLORS.length] }}>
              {['🏰', '🛶', '🏛️', '🏔️', '🪔', '🐪'][idx % 6]}
            </div>
            <div className="p-4">
              {/* User info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)', color: '#fff' }}>
                  {post.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#F8FAFC' }}>{post.user}</p>
                  <p className="text-xs flex items-center gap-1" style={{ color: '#94A3B8' }}><MapPin size={10} /> {post.location} · {post.timestamp}</p>
                </div>
              </div>
              <p className="text-sm mb-3" style={{ color: '#F8FAFC' }}>{post.caption}</p>
              {/* Actions */}
              <div className="flex items-center gap-4">
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-xs cursor-pointer transition-colors" style={{ color: post.liked ? '#EF4444' : '#94A3B8' }}>
                  <Heart size={16} fill={post.liked ? '#EF4444' : 'none'} /> {post.likes}
                </button>
                <button onClick={() => showToast('Comments coming soon!', 'info')} className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: '#94A3B8' }}>
                  <MessageCircle size={16} /> {post.comments}
                </button>
                <button onClick={() => showToast('Post link copied!', 'success')} className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: '#94A3B8' }}>
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
