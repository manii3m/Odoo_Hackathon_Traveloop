import { createContext, useState, useCallback, useContext, useEffect } from 'react';
import { SEED_TRIPS, PACKING_CATEGORIES } from '../data/seedData';

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  // Load users from localStorage or initialize empty
  const [usersDb, setUsersDb] = useState(() => {
    const saved = localStorage.getItem('yatra_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Load current user from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('yatra_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);
  const [currentScreen, setCurrentScreen] = useState(currentUser ? 'dashboard' : 'landing');
  const [loginTab, setLoginTab] = useState('signin');
  
  const [trips, setTrips] = useState(SEED_TRIPS);
  const [selectedTripId, setSelectedTripId] = useState(1);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notes, setNotes] = useState([
    { id: 1, tripId: 1, stopId: 1, title: "Must-try food spots", text: "Dal Baati Churma at LMB (Laxmi Misthan Bhandar) — iconic Jaipur restaurant. Also try Pyaaz Kachori from Rawat Mishthan Bhandar near Station Road.", date: "2025-10-15T10:30:00" },
    { id: 2, tripId: 1, stopId: null, title: "General travel tip", text: "Carry a reusable water bottle. Most railway stations have RO water refill points. Also download IRCTC app and keep PNR handy for train journeys.", date: "2025-10-10T08:00:00" },
    { id: 3, tripId: 2, stopId: 4, title: "Kochi checklist", text: "Visit Fort Kochi early morning for Chinese Fishing Nets. Book Alleppey houseboat via KTDC (Kerala Tourism) for best rates. Carry mosquito repellent!", date: "2025-11-28T14:00:00" },
  ]);
  const [packingState, setPackingState] = useState(() => {
    const state = {};
    Object.entries(PACKING_CATEGORIES).forEach(([cat, items]) => {
      state[cat] = items.map(item => ({ name: item, packed: false }));
    });
    return state;
  });

  const [screenFade, setScreenFade] = useState(true);

  // Sync usersDb and currentUser to localStorage
  useEffect(() => {
    localStorage.setItem('yatra_users', JSON.stringify(usersDb));
  }, [usersDb]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('yatra_currentUser', JSON.stringify(currentUser));
      // Update the user in the db too
      setUsersDb(prev => prev.map(u => u.email === currentUser.email ? currentUser : u));
    } else {
      localStorage.removeItem('yatra_currentUser');
    }
  }, [currentUser]);

  const loginUser = (email, password) => {
    const user = usersDb.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
      return true;
    }
    return false;
  };

  const registerUser = (userData) => {
    if (usersDb.some(u => u.email === userData.email)) {
      return false; // Email exists
    }
    const newUser = { ...userData, id: Date.now() };
    setUsersDb([...usersDb, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentScreen('landing');
  };

  const navigate = useCallback((screen, opts = {}) => {
    setScreenFade(false);
    setTimeout(() => {
      setCurrentScreen(screen);
      if (opts.tripId !== undefined) setSelectedTripId(opts.tripId);
      if (opts.stopId !== undefined) setSelectedStopId(opts.stopId);
      setScreenFade(true);
    }, 150);
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const openModal = useCallback((content) => setModalContent(content), []);
  const closeModal = useCallback(() => setModalContent(null), []);

  // Font loader
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Global keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes heroGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      @keyframes confettiFall { 0% { transform: translateY(-100%) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      * { scrollbar-width: thin; scrollbar-color: #1E2D45 #0A0F1E; }
      *::-webkit-scrollbar { width: 6px; }
      *::-webkit-scrollbar-track { background: #0A0F1E; }
      *::-webkit-scrollbar-thumb { background: #1E2D45; border-radius: 3px; }
    `;
    document.head.appendChild(style);
  }, []);

  const value = {
    isLoggedIn, setIsLoggedIn, currentScreen, setCurrentScreen, navigate,
    loginTab, setLoginTab,
    loginUser, registerUser, logoutUser,
    trips, setTrips, selectedTripId, setSelectedTripId,
    selectedStopId, setSelectedStopId,
    toasts, showToast, modalContent, openModal, closeModal,
    sidebarExpanded, setSidebarExpanded, darkMode, setDarkMode,
    notes, setNotes, packingState, setPackingState,
    currentUser, setCurrentUser, screenFade
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
