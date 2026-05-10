import { useApp } from '../context/AppContext';
import { Plane, Compass, Map, Wallet, Calendar, Share2, Users } from 'lucide-react';

export default function LandingPage() {
  const { setCurrentScreen, setLoginTab } = useApp();

  const handleAuth = (tab) => {
    setLoginTab(tab);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-white relative font-sans">
      {/* Background Image / Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000&auto=format&fit=crop')", // A general travel background 
          opacity: 0.15 
        }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <header className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600">
              <Plane size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Yatra <span className="text-green-500">2.0</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Home</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Trips</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Destinations</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Activities</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Budget</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Community</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleAuth('signin')}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Users size={16} /> Login
            </button>
            <button 
              onClick={() => handleAuth('signup')}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-2 tracking-tight">
              Plan Smarter.
            </h1>
            <h1 className="text-7xl font-extrabold text-blue-600 mb-6 italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
              Travel Better<span className="text-green-500">.</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Yatra 2.0 helps you create personalized multi-city itineraries,
              discover amazing experiences, manage your budget,
              and share your journey with the world.
            </p>

            <div className="flex items-center gap-4 mb-12">
              <button 
                onClick={() => handleAuth('signup')}
                className="px-8 py-3.5 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
              >
                <Compass size={20} /> Plan Your Trip
              </button>
              <button className="px-8 py-3.5 rounded-full font-bold text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                <Map size={20} className="text-blue-600" /> Explore Destinations
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Join <span className="font-bold text-gray-900">10,000+ travelers</span><br />
                planning their dream trips
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Feature Cards */}
      <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 py-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                <Map size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Multi-City Itineraries</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Plan your journey your way with flexible stops.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 text-green-500">
                <Compass size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Discover & Explore</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Find top destinations and activities curated for you.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-500">
                <Wallet size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Budget Smart</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Get cost estimates and stay within your budget.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-500">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Visualize Your Trip</h3>
                <p className="text-xs text-gray-500 leading-relaxed">See your itinerary in a clean timeline & calendar view.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
