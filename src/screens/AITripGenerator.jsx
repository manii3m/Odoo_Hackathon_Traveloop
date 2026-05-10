import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Sparkles, MapPin, Calendar, Wallet, Tag } from 'lucide-react';

export default function AITripGenerator() {
  const { setTrips, navigate, showToast } = useApp();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(25000);
  const [vibe, setVibe] = useState('Culture & History');
  const [loading, setLoading] = useState(false);
  
  // OpenStreetMap Autocomplete State
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeout = useRef(null);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&featuretype=city`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  const handleDestinationChange = (e) => {
    const val = e.target.value;
    setDestination(val);
    setShowSuggestions(true);
    
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 300); // 300ms debounce
  };

  const selectSuggestion = (place) => {
    setDestination(place.display_name);
    setShowSuggestions(false);
  };

  const generateTrip = async () => {
    if (!destination) {
      showToast('Please enter a destination', 'warning');
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      showToast('Gemini API key is missing. Set VITE_GEMINI_API_KEY.', 'error');
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
        You are an expert travel planner. Create a detailed ${days}-day itinerary for a trip to ${destination}.
        The overall budget for the trip is ₹${budget}. The vibe/style of the trip is "${vibe}".
        
        Respond ONLY with a valid JSON object matching exactly this structure:
        {
          "name": "Trip to ${destination}",
          "description": "A short summary of the vibe and destination.",
          "coverEmoji": "A single suitable emoji",
          "totalBudget": ${budget},
          "stops": [
            {
              "city": "Name of the city/area",
              "state": "State/Region",
              "flag": "📍",
              "days": ${days},
              "costs": { "transport": 1000, "stay": 2000, "activities": 1500, "meals": 1000 },
              "activities": [
                {
                  "name": "Activity Name",
                  "type": "Sightseeing/Food/Adventure/Culture/Wellness",
                  "cost": 500,
                  "duration": "2h",
                  "time": "10:00 AM",
                  "description": "Brief description"
                }
              ]
            }
          ]
        }
        
        Ensure the total costs roughly match the budget. Do not include markdown formatting like \`\`\`json, just return the raw JSON object.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
      
      const tripData = JSON.parse(responseText);
      const newTrip = {
        ...tripData,
        id: Date.now(),
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + days * 86400000).toISOString().split('T')[0],
        status: 'upcoming'
      };

      setTrips(prev => [...prev, newTrip]);
      showToast('AI successfully generated your trip! 🎉', 'success');
      navigate('itinerary', { tripId: newTrip.id });

    } catch (error) {
      console.error(error);
      showToast('Failed to generate trip. Ensure API key is valid.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { background: '#1C2537', border: '1px solid #1E2D45', color: '#F8FAFC' };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#F8FAFC', fontFamily: "'DM Serif Display', serif" }}>
        <Sparkles size={24} className="inline mr-2" style={{ color: '#F59E0B' }} />
        AI Trip Planner
      </h1>
      <p className="text-sm mb-8" style={{ color: '#94A3B8' }}>
        Let Gemini AI create a personalized itinerary based on your budget and preferences.
      </p>

      <div className="rounded-2xl p-6" style={{ background: '#111827', border: '1px solid #1E2D45' }}>
        <div className="flex flex-col gap-5">
          {/* Destination */}
          <div className="relative">
            <label className="text-sm mb-1 block flex items-center gap-1.5" style={{ color: '#94A3B8' }}>
              <MapPin size={14} /> Destination (Powered by OpenStreetMap)
            </label>
            <input
              type="text"
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
              style={inputStyle}
              placeholder="e.g., Paris, France or Kyoto, Japan"
              value={destination}
              onChange={handleDestinationChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute w-full z-50 mt-1 rounded-xl overflow-hidden shadow-xl" style={{ background: '#1C2537', border: '1px solid #1E2D45' }}>
                {suggestions.map((place) => (
                  <div
                    key={place.place_id}
                    onClick={() => selectSuggestion(place)}
                    className="px-4 py-3 text-sm cursor-pointer hover:bg-amber-500/10 transition-colors"
                    style={{ color: '#F8FAFC', borderBottom: '1px solid #1E2D4550' }}
                  >
                    {place.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Duration & Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm mb-1 block flex items-center gap-1.5" style={{ color: '#94A3B8' }}>
                <Calendar size={14} /> Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                style={inputStyle}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm mb-1 block flex items-center gap-1.5" style={{ color: '#94A3B8' }}>
                <Wallet size={14} /> Total Budget (₹)
              </label>
              <input
                type="number"
                min="1000"
                step="1000"
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                style={inputStyle}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="text-sm mb-1 block flex items-center gap-1.5" style={{ color: '#94A3B8' }}>
              <Tag size={14} /> Trip Vibe / Travel Style
            </label>
            <select
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
              style={inputStyle}
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
            >
              <option value="Culture & History">Culture & History</option>
              <option value="Relaxation & Wellness">Relaxation & Wellness</option>
              <option value="Adventure & Outdoors">Adventure & Outdoors</option>
              <option value="Food & Culinary">Food & Culinary</option>
              <option value="Nightlife & Party">Nightlife & Party</option>
              <option value="Budget Backpacking">Budget Backpacking</option>
              <option value="Luxury Escape">Luxury Escape</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateTrip}
            disabled={loading}
            className={`mt-4 w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-70 cursor-wait' : 'cursor-pointer hover:scale-[1.02]'}`}
            style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)' }}
          >
            {loading ? (
              <span className="animate-pulse">Generating your perfect trip...</span>
            ) : (
              <>
                <Sparkles size={18} /> Generate Trip with Gemini AI
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
