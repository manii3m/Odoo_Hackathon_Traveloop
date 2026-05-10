import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/ToastAndModal';
import LoginScreen from './screens/LoginScreen';
import LandingPage from './screens/LandingPage';
import Dashboard from './screens/Dashboard';
import CreateTrip from './screens/CreateTrip';
import MyTrips from './screens/MyTrips';
import AITripGenerator from './screens/AITripGenerator';
import ItineraryBuilder from './screens/ItineraryBuilder';
import ItineraryView from './screens/ItineraryView';
import BudgetScreen from './screens/BudgetScreen';
import PackingChecklist from './screens/PackingChecklist';
import CommunityHub from './screens/CommunityHub';
import TripReviews from './screens/TripReviews';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import TripNotes from './screens/TripNotes';
import AdminDashboard from './screens/AdminDashboard';

function AppShell() {
  const { isLoggedIn, currentScreen, sidebarExpanded, screenFade } = useApp();

  if (!isLoggedIn) {
    if (currentScreen === 'login') return <LoginScreen />;
    return <LandingPage />;
  }

  const screens = {
    dashboard: Dashboard,
    'create-trip': CreateTrip,
    trips: MyTrips,
    'ai-planner': AITripGenerator,
    builder: ItineraryBuilder,
    itinerary: ItineraryView,
    budget: BudgetScreen,
    packing: PackingChecklist,
    community: CommunityHub,
    reviews: TripReviews,
    profile: ProfileScreen,
    settings: SettingsScreen,
    notes: TripNotes,
    admin: AdminDashboard,
  };

  const Screen = screens[currentScreen] || Dashboard;

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0F1E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Sidebar />
      <main
        className="flex-1 min-h-screen overflow-y-auto transition-all duration-300"
        style={{
          marginLeft: sidebarExpanded ? 240 : 64,
          opacity: screenFade ? 1 : 0,
          transition: 'margin-left 0.3s, opacity 0.15s ease-in-out',
        }}
      >
        <Screen />
      </main>
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <AppShell />
      </div>
    </AppProvider>
  );
}
