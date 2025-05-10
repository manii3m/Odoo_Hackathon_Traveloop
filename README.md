# Yatra 2.0 (Traveloop) ✈️🌍

![Yatra 2.0 Banner](https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1200&auto=format&fit=crop)

**Yatra 2.0 (Traveloop)** is a modern, AI-powered travel planning application designed to make multi-city trip coordination effortless. Built with a premium UI and packed with features like AI trip generation, budget tracking, and an interactive itinerary builder, it is your ultimate companion for exploring the world.

## ✨ Key Features

- 🤖 **AI Trip Planner**: Let Google Gemini (1.5 Flash) generate personalized, budget-conscious, and vibe-matching itineraries instantly based on your preferences.
- 🗺️ **Multi-City Itineraries**: Build complex, multi-stop trips manually or let AI do the heavy lifting for you.
- 📍 **Smart Autocomplete**: Powered by OpenStreetMap for fast and accurate destination and location searches.
- 💰 **Budget Management**: Track your travel expenses, visualize costs with beautiful charts (Recharts), and stay within your financial goals.
- 🎒 **Packing Checklist**: Never forget an essential item with built-in packing lists.
- 🌐 **Community Hub & Reviews**: Share your journeys, read reviews, and get inspired by other travelers.
- 📝 **Trip Notes**: Jot down quick thoughts, reservation numbers, and memories.
- 🔐 **User & Admin Dashboards**: Complete profile management, settings, and an admin view for platform moderation.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **AI Integration**: `@google/generative-ai` (Gemini 1.5 Flash API)
- **Location API**: OpenStreetMap (Nominatim)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd Odoo_Hackathon_Traveloop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root of the project and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173` to see the application in action.

## 📂 Project Structure

```text
src/
├── assets/         # Static assets like images and fonts
├── components/     # Reusable UI components (Sidebar, Toast, Modals)
├── context/        # React Context API for global state management (AppContext)
├── data/           # Seed data for initial state
├── screens/        # Main application views/pages (Dashboard, AITripGenerator, etc.)
├── App.jsx         # Main application shell and routing logic
├── main.jsx        # React entry point
└── index.css       # Global styles and Tailwind configuration
```

## 🌍 Deployment

Since this is a Vite-powered React single-page application (SPA), it can be easily deployed to static hosting providers like Vercel or Netlify.

### Option 1: Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Open the **Environment Variables** section and add:
   - `VITE_GEMINI_API_KEY` = (Your Gemini API Key)
5. Click **Deploy**. Vercel will automatically detect Vite and run `npm run build`.

### Option 2: Netlify
1. Push your code to a GitHub repository.
2. Log in to [Netlify](https://www.netlify.com/) and click **Add new site** > **Import an existing project**.
3. Connect your GitHub account and select your repository.
4. Under **Advanced build settings**, add your New Environment Variable:
   - Key: `VITE_GEMINI_API_KEY`, Value: (Your Gemini API Key)
5. Click **Deploy site**.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built with ❤️ for the Hackathon.*

commit 2025-04-27 10:00:00

commit 2025-04-28 10:00:00

commit 2025-04-29 10:00:00

commit 2025-04-30 10:00:00

commit 2025-05-02 10:00:00

commit 2025-05-03 10:00:00

commit 2025-05-04 10:00:00

commit 2025-05-05 10:00:00

commit 2025-05-06 10:00:00

commit 2025-05-07 10:00:00

commit 2025-05-08 10:00:00

commit 2025-05-09 10:00:00

commit 2025-05-10 10:00:00
