export const SEED_TRIPS = [
  {
    id: 1, name: "Rajasthan Royal Tour", description: "Forts, palaces & golden deserts of the royal state",
    startDate: "2025-10-15", endDate: "2025-10-28", coverEmoji: "🏰", totalBudget: 45000,
    status: "upcoming",
    stops: [
      { id: 1, city: "Jaipur", state: "Rajasthan", flag: "🏰", days: 4, arrivalDate: "2025-10-15",
        activities: [
          { id: 1, name: "Amber Fort & Elephant Ride", type: "Sightseeing", cost: 1500, duration: "4h", time: "9:00 AM", done: false },
          { id: 2, name: "Hawa Mahal & City Palace", type: "Culture", cost: 500, duration: "3h", time: "2:00 PM", done: false },
          { id: 3, name: "Chokhi Dhani Village Dinner", type: "Food", cost: 1200, duration: "3h", time: "7:00 PM", done: false }
        ],
        costs: { transport: 3000, stay: 8000, activities: 3200, meals: 2500 }
      },
      { id: 2, city: "Udaipur", state: "Rajasthan", flag: "🌊", days: 3, arrivalDate: "2025-10-19",
        activities: [
          { id: 4, name: "Lake Pichola Boat Ride", type: "Experience", cost: 800, duration: "1.5h", time: "10:00 AM", done: false },
          { id: 5, name: "City Palace Museum", type: "Culture", cost: 300, duration: "2h", time: "2:00 PM", done: false }
        ],
        costs: { transport: 2000, stay: 6000, activities: 2000, meals: 2000 }
      },
      { id: 3, city: "Jaisalmer", state: "Rajasthan", flag: "🐪", days: 3, arrivalDate: "2025-10-22",
        activities: [
          { id: 6, name: "Desert Safari & Camel Ride", type: "Adventure", cost: 2500, duration: "6h", time: "3:00 PM", done: false },
          { id: 7, name: "Jaisalmer Fort Walk", type: "Sightseeing", cost: 0, duration: "2h", time: "10:00 AM", done: false }
        ],
        costs: { transport: 2500, stay: 5000, activities: 3000, meals: 1800 }
      }
    ]
  },
  {
    id: 2, name: "South India Backpack", description: "Backwaters, temples & spice plantations",
    startDate: "2025-12-01", endDate: "2025-12-14", coverEmoji: "🌴", totalBudget: 35000,
    status: "upcoming",
    stops: [
      { id: 4, city: "Kochi", state: "Kerala", flag: "⛵", days: 3, arrivalDate: "2025-12-01",
        activities: [
          { id: 8, name: "Chinese Fishing Nets at Fort Kochi", type: "Sightseeing", cost: 0, duration: "1h", time: "6:00 AM", done: false },
          { id: 9, name: "Kerala Backwater Houseboat", type: "Experience", cost: 6000, duration: "Full day", time: "10:00 AM", done: false }
        ],
        costs: { transport: 2500, stay: 4500, activities: 6500, meals: 2000 }
      },
      { id: 5, city: "Munnar", state: "Kerala", flag: "🍵", days: 3, arrivalDate: "2025-12-04",
        activities: [
          { id: 10, name: "Tea Plantation Tour", type: "Experience", cost: 500, duration: "3h", time: "9:00 AM", done: false },
          { id: 11, name: "Eravikulam National Park Trek", type: "Adventure", cost: 250, duration: "4h", time: "7:00 AM", done: false }
        ],
        costs: { transport: 1500, stay: 3500, activities: 1200, meals: 1500 }
      },
      { id: 6, city: "Madurai", state: "Tamil Nadu", flag: "🛕", days: 2, arrivalDate: "2025-12-07",
        activities: [
          { id: 12, name: "Meenakshi Amman Temple", type: "Culture", cost: 0, duration: "3h", time: "6:00 AM", done: false }
        ],
        costs: { transport: 1200, stay: 2500, activities: 500, meals: 1000 }
      }
    ]
  },
  {
    id: 3, name: "Himalayan Trek Adventure", description: "Mountains, monasteries & momos",
    startDate: "2025-05-10", endDate: "2025-05-20", coverEmoji: "🏔️", totalBudget: 28000,
    status: "completed",
    stops: [
      { id: 7, city: "Manali", state: "Himachal Pradesh", flag: "🏔️", days: 4, arrivalDate: "2025-05-10",
        activities: [
          { id: 13, name: "Solang Valley Paragliding", type: "Adventure", cost: 3500, duration: "30min", time: "11:00 AM", done: true },
          { id: 14, name: "Old Manali Café Hopping", type: "Food", cost: 800, duration: "3h", time: "4:00 PM", done: true }
        ],
        costs: { transport: 2000, stay: 4000, activities: 4500, meals: 2500 }
      },
      { id: 8, city: "Leh", state: "Ladakh", flag: "🧘", days: 5, arrivalDate: "2025-05-14",
        activities: [
          { id: 15, name: "Pangong Lake Day Trip", type: "Sightseeing", cost: 5000, duration: "Full day", time: "6:00 AM", done: true },
          { id: 16, name: "Hemis Monastery Visit", type: "Culture", cost: 200, duration: "2h", time: "10:00 AM", done: true }
        ],
        costs: { transport: 6000, stay: 5000, activities: 5500, meals: 2000 }
      }
    ]
  }
];

export const CITY_DATABASE = [
  { id: 1, name: "Varanasi", state: "Uttar Pradesh", flag: "🛕", costIndex: "Low", popularity: 96, description: "The spiritual capital — ghats, Ganga aarti & ancient temples", region: "North" },
  { id: 2, name: "Goa", state: "Goa", flag: "🏖️", costIndex: "Medium", popularity: 98, description: "Sun, sand, seafood & vibrant nightlife", region: "West" },
  { id: 3, name: "Rishikesh", state: "Uttarakhand", flag: "🧘", costIndex: "Low", popularity: 91, description: "Yoga capital & white-water rafting hub", region: "North" },
  { id: 4, name: "Hampi", state: "Karnataka", flag: "🏛️", costIndex: "Low", popularity: 88, description: "Ruins of the Vijayanagara Empire", region: "South" },
  { id: 5, name: "Darjeeling", state: "West Bengal", flag: "🍵", costIndex: "Medium", popularity: 89, description: "Queen of Hills — toy train & tea gardens", region: "East" },
  { id: 6, name: "Agra", state: "Uttar Pradesh", flag: "🕌", costIndex: "Low", popularity: 97, description: "Home of the Taj Mahal — a wonder of the world", region: "North" },
  { id: 7, name: "Shimla", state: "Himachal Pradesh", flag: "🏔️", costIndex: "Medium", popularity: 90, description: "Colonial charm in the Himalayan foothills", region: "North" },
  { id: 8, name: "Pondicherry", state: "Tamil Nadu", flag: "🇫🇷", costIndex: "Medium", popularity: 87, description: "French Quarter, Auroville & serene beaches", region: "South" },
  { id: 9, name: "Jodhpur", state: "Rajasthan", flag: "🏰", costIndex: "Low", popularity: 92, description: "The Blue City — Mehrangarh Fort & spice bazaars", region: "West" },
  { id: 10, name: "Andaman Islands", state: "Andaman & Nicobar", flag: "🐠", costIndex: "High", popularity: 93, description: "Crystal waters, coral reefs & cellular jail", region: "Islands" },
  { id: 11, name: "Amritsar", state: "Punjab", flag: "🙏", costIndex: "Low", popularity: 94, description: "Golden Temple, Wagah Border & legendary food", region: "North" },
  { id: 12, name: "Coorg", state: "Karnataka", flag: "☕", costIndex: "Medium", popularity: 86, description: "Scotland of India — coffee estates & misty hills", region: "South" }
];

export const ACTIVITY_DATABASE = [
  { id: 1, name: "Heritage Walking Tour", type: "Sightseeing", cost: 500, duration: "3h", description: "Discover hidden lanes and historical gems with a local guide" },
  { id: 2, name: "Street Food Trail", type: "Food", cost: 800, duration: "3h", description: "Taste chaat, kebabs, and regional delicacies at famous stalls" },
  { id: 3, name: "Temple & Spiritual Tour", type: "Culture", cost: 300, duration: "4h", description: "Visit ancient temples and experience local spiritual traditions" },
  { id: 4, name: "Sunset Boat Ride", type: "Experience", cost: 600, duration: "1.5h", description: "Golden hour views from the water — river or lake" },
  { id: 5, name: "Local Cooking Class", type: "Food", cost: 1500, duration: "4h", description: "Learn to make authentic regional dishes from a home cook" },
  { id: 6, name: "Cycling Village Tour", type: "Adventure", cost: 700, duration: "3h", description: "Pedal through rural landscapes and interact with locals" },
  { id: 7, name: "Rooftop Chai & Stories", type: "Experience", cost: 200, duration: "2h", description: "Chai on a rooftop with panoramic city views at sunset" },
  { id: 8, name: "Nature Trek & Hike", type: "Adventure", cost: 400, duration: "6h", description: "Guided trail through forests, waterfalls or mountain paths" },
  { id: 9, name: "Yoga & Meditation Session", type: "Wellness", cost: 500, duration: "2h", description: "Begin your morning with a guided yoga and pranayama session" },
  { id: 10, name: "Local Market & Bazaar Tour", type: "Shopping", cost: 300, duration: "2h", description: "Explore vibrant bazaars for handicrafts, spices and textiles" }
];

export const PACKING_CATEGORIES = {
  "Documents": ["Aadhaar Card / Passport", "Train/Flight Tickets (printed)", "Hotel Booking Confirmations", "Travel Insurance Papers", "Driving License"],
  "Clothing": ["T-shirts / Kurtas (5)", "Jeans / Track Pants (2)", "Undergarments (7)", "Socks (5)", "Light Jacket / Shawl", "Raincoat / Umbrella", "Comfortable Walking Shoes"],
  "Electronics": ["Phone Charger & Cable", "Power Bank (20000mAh)", "Earphones / Headphones", "Camera + SD Card", "Extension Board / Multi-plug"],
  "Toiletries": ["Toothbrush & Paste", "Shampoo & Soap", "Sunscreen SPF 50", "Mosquito Repellent", "Hand Sanitizer", "Basic Medicines (Crocin, Digene, ORS)"],
  "Essentials": ["Wallet with ₹ Cash", "UPI-enabled Phone", "Water Bottle (1L)", "Snacks (Namkeen, Biscuits)", "Neck Pillow for train/bus", "Small Lock for bags"]
};

export const COMMUNITY_POSTS = [
  { id: 1, user: "Priya Sharma", avatar: "PS", location: "Jaipur, Rajasthan", caption: "The pink city at golden hour 🌅 Hawa Mahal never disappoints!", likes: 234, comments: 18, timestamp: "2h ago", image: "jaipur" },
  { id: 2, user: "Arjun Menon", avatar: "AM", location: "Alleppey, Kerala", caption: "Houseboat life on the backwaters 🛶 Pure bliss!", likes: 189, comments: 12, timestamp: "5h ago", image: "kerala" },
  { id: 3, user: "Sneha Reddy", avatar: "SR", location: "Hampi, Karnataka", caption: "These 500-year-old ruins still take my breath away 🏛️", likes: 156, comments: 8, timestamp: "1d ago", image: "hampi" },
  { id: 4, user: "Rohit Gupta", avatar: "RG", location: "Pangong Lake, Ladakh", caption: "3 Idiots vibes! The water changes colour every hour 💙", likes: 312, comments: 24, timestamp: "2d ago", image: "ladakh" },
  { id: 5, user: "Ananya Iyer", avatar: "AI", location: "Varanasi, UP", caption: "Ganga Aarti is something you must experience once in your life 🪔", likes: 278, comments: 20, timestamp: "3d ago", image: "varanasi" },
  { id: 6, user: "Karan Singh", avatar: "KS", location: "Thar Desert, Rajasthan", caption: "Camping under the stars in the desert — surreal! ⭐🐪", likes: 198, comments: 15, timestamp: "4d ago", image: "desert" }
];

export const TRIP_REVIEWS = [
  { id: 1, tripName: "Rajasthan Royal Tour", reviewer: "Meera Joshi", avatar: "MJ", rating: 5, review: "Absolutely magical! The forts and palaces blew my mind. Chokhi Dhani was the highlight — felt like stepping back in time. Highly recommend!", date: "2025-09-10", helpful: 42 },
  { id: 2, tripName: "Kerala Backwaters", reviewer: "Vivek Nair", avatar: "VN", rating: 4, review: "The houseboat experience was peaceful. Munnar tea gardens were breathtaking. Only wish we had one more day in Kochi for the food scene.", date: "2025-08-22", helpful: 35 },
  { id: 3, tripName: "Ladakh Road Trip", reviewer: "Simran Kaur", avatar: "SK", rating: 5, review: "Best trip of my life! Pangong Lake is unreal. Make sure you acclimatize properly — AMS is no joke at 11,000 ft.", date: "2025-07-15", helpful: 58 },
  { id: 4, tripName: "Goa Beach Vacation", reviewer: "Aman Desai", avatar: "AD", rating: 4, review: "Perfect 4-day getaway. North Goa for parties, South Goa for peace. The seafood shacks at Palolem were amazing!", date: "2025-06-30", helpful: 28 },
  { id: 5, tripName: "Varanasi Spiritual Journey", reviewer: "Pooja Rao", avatar: "PR", rating: 5, review: "Life-changing experience. The morning boat ride on the Ganga and evening aarti at Dashashwamedh Ghat — unforgettable.", date: "2025-05-18", helpful: 47 }
];

export const ADMIN_MONTHLY_DATA = [
  { month: "Jan", trips: 120 }, { month: "Feb", trips: 95 }, { month: "Mar", trips: 180 },
  { month: "Apr", trips: 210 }, { month: "May", trips: 340 }, { month: "Jun", trips: 280 },
  { month: "Jul", trips: 195 }, { month: "Aug", trips: 160 }, { month: "Sep", trips: 250 },
  { month: "Oct", trips: 420 }, { month: "Nov", trips: 380 }, { month: "Dec", trips: 450 }
];

export const ADMIN_CITY_PIE = [
  { name: "Goa", value: 450 }, { name: "Jaipur", value: 380 }, { name: "Manali", value: 320 },
  { name: "Kerala", value: 280 }, { name: "Varanasi", value: 250 }
];

export const ADMIN_USERS = [
  { id: 1, name: "Priya Sharma", email: "priya@gmail.com", trips: 12, joined: "2024-11-15", status: "Active", city: "Mumbai" },
  { id: 2, name: "Arjun Menon", email: "arjun@gmail.com", trips: 8, joined: "2024-12-03", status: "Active", city: "Bangalore" },
  { id: 3, name: "Sneha Reddy", email: "sneha@gmail.com", trips: 15, joined: "2024-10-22", status: "Active", city: "Hyderabad" },
  { id: 4, name: "Rohit Gupta", email: "rohit@gmail.com", trips: 5, joined: "2025-01-08", status: "Inactive", city: "Delhi" },
  { id: 5, name: "Ananya Iyer", email: "ananya@gmail.com", trips: 10, joined: "2024-09-14", status: "Active", city: "Chennai" }
];
