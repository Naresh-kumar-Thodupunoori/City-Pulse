# 🏙️ City Pulse - Smart City News & Alerts App

A modern React Native mobile application that delivers city-specific news and emergency alerts with an intuitive interface.

## ✨ Features

### 📰 City-Based News Feed
- Browse latest news from your selected city
- Real-time news updates with pull-to-refresh
- Beautiful card-based UI with images
- Read full articles in integrated WebView

### 🔖 Smart Bookmarking
- Save articles to read later
- Persistent storage using AsyncStorage
- Quick bookmark/unbookmark from any screen
- Dedicated bookmarks tab for easy access

### 🚨 Emergency Alerts
- Real-time emergency notifications
- Color-coded severity levels (Critical, High, Medium, Low)
- Category-based filtering
- Multiple alert types: Weather, Traffic, Health, Utilities

### 🌆 Multi-City Support
- Select from 15+ major cities worldwide
- Easy city switching with search functionality
- Persistent city selection

### 🎨 Beautiful UI/UX
- Dark mode support
- Smooth animations and haptic feedback
- Responsive design
- Native-like experience on iOS and Android

## 🏗️ Architecture

### Project Structure
```
city-pulse/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab-based navigation
│   │   ├── index.tsx        # News Feed screen
│   │   ├── bookmarks.tsx    # Bookmarks screen
│   │   └── alerts.tsx       # Emergency Alerts screen
│   ├── _layout.tsx          # Root layout with context provider
│   └── article-view.tsx     # WebView for full articles
├── components/              # Reusable components
│   ├── CitySelector.tsx     # City selection modal
│   ├── NewsCard.tsx         # News article card
│   └── EmergencyAlertCard.tsx
├── contexts/                # React Context for state
│   └── AppContext.tsx       # Global app state management
├── services/                # Business logic & APIs
│   ├── newsService.ts       # News API integration
│   └── storageService.ts    # AsyncStorage operations
├── types/                   # TypeScript definitions
│   └── index.ts
├── constants/               # Static data
│   ├── cities.ts
│   └── emergencyAlerts.ts
└── utils/                   # Helper functions
    └── helpers.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Clone or navigate to the project:**
```bash
cd city-pulse
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Run on your platform:**
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🔌 API Configuration

### Using Real News API

The app currently uses mock data for demonstration. To use real news:

1. **Get an API key from [NewsAPI.org](https://newsapi.org/):**
   - Sign up for a free account
   - Copy your API key

2. **Update `services/newsService.ts`:**

```typescript
// Uncomment and add your API key
const NEWS_API_KEY = 'YOUR_API_KEY_HERE';

// Uncomment the NewsAPI implementation in fetchNewsByCity function
```

### Alternative APIs
- **GNews API**: https://gnews.io/
- **News Data IO**: https://newsdata.io/

## 📱 Screens & Navigation

### 1. News Feed (Home)
- Displays city-specific news articles
- City selector at the top
- Pull-to-refresh functionality
- Tap article to read full content
- Bookmark articles for later

### 2. Bookmarks
- View all saved articles
- Same card interface as news feed
- Tap to read or unbookmark
- Persists across app restarts

### 3. Emergency Alerts
- View all emergency alerts
- Filter by severity level
- Color-coded alerts:
  - 🔴 Critical (Red)
  - 🟠 High (Orange)
  - 🟡 Medium (Yellow)
  - 🔵 Low (Blue)

## 🧩 Core Features Implementation

### State Management
Uses React Context API (`AppContext`) for:
- Selected city state
- News articles cache
- Bookmarks management
- Loading states

### Data Persistence
AsyncStorage for:
- User's selected city
- Bookmarked articles
- Offline data access

### News Integration
- Axios for HTTP requests
- Error handling with fallback to mock data
- Optimized image loading
- Article metadata (source, author, date)

### WebView Integration
- In-app browser for full articles
- Loading indicators
- Back navigation
- Proper URL handling

## 🎨 Customization

### Theming
Theme colors are defined in `constants/theme.ts`. The app automatically adapts to:
- System light/dark mode
- Custom color schemes
- Platform-specific styling

### Adding Cities
Edit `constants/cities.ts`:
```typescript
export const CITIES: City[] = [
  { id: 'custom', name: 'Your City', country: 'Country' },
  // ... more cities
];
```

### Custom Alerts
Edit `constants/emergencyAlerts.ts` to add alerts:
```typescript
{
  id: '6',
  title: 'Custom Alert',
  description: 'Alert description',
  severity: 'medium',
  date: new Date().toISOString(),
  category: 'Custom',
}
```

## 🛠️ Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Navigation**: Expo Router
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **HTTP Client**: Axios
- **WebView**: react-native-webview
- **Icons**: Expo Vector Icons
- **TypeScript**: Full type safety

## 📦 Dependencies

```json
{
  "expo": "~54.0.27",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-router": "~6.0.17",
  "axios": "^1.13.2",
  "react-native-webview": "^13.16.0",
  "@react-native-async-storage/async-storage": "latest",
  "@react-navigation/native": "^7.1.24"
}
```

## 🔧 Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Build for Production

**iOS:**
```bash
npx expo build:ios
```

**Android:**
```bash
npx expo build:android
```

## 🚀 Optimization Features

### Performance
- Lazy loading of images
- FlatList for efficient rendering
- Memoized components where applicable
- Optimized re-renders with proper dependencies
---

