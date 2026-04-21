# 🚬 SmokeNote

A modern, privacy-focused cigarette tracking app built with React Native and Expo. Track your smoking habits, analyze patterns, and gain insights into your consumption with an elegant, dark-themed interface.

## ✨ Features

- **📊 Daily Tracking** - Log cigarettes with a single tap
- **📅 Calendar View** - Visual monthly calendar showing daily cigarette counts
- **📈 Analytics** - Monthly summaries with trends and comparisons
- **🔄 Flexible Comparisons** - Compare current month with any previous month
- **☁️ Firebase Sync** - Securely stores logs and settings in Firestore
- **🔐 Email Auth** - Login and sign up with email/password
- **🎨 Beautiful UI** - Dark-themed, modern interface
- **📱 Cross-Platform** - Works on iOS, Android, and Web

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MinThein-Kyaw/SmokeNote.git
   cd SmokeNote
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running on Different Platforms

- **Mobile (Expo Go)**: Scan the QR code with Expo Go app
- **Android Emulator**: Press `a` in the terminal
- **iOS Simulator**: Press `i` in the terminal (Mac only)
- **Web Browser**: Press `w` in the terminal

## 📱 Tech Stack

- **Framework**: React Native + Expo SDK 52
- **Language**: TypeScript
- **State Management**: React Hooks
- **Backend**: Firebase Authentication + Cloud Firestore
- **UI**: React Native components with custom styling
- **Icons**: FontAwesome6 (Expo Vector Icons)


## 🏗️ Project Structure

```
SmokeNote/
├── components/
│   ├── Home.tsx              # Main tracking screen
│   ├── DailyHistory.tsx      # Daily log view
│   ├── MonthlySummary.tsx    # Calendar & analytics
│   ├── Settings.tsx          # User preferences
│   └── Navbar.tsx            # Bottom navigation
├── services/
│   └── firebase.ts           # Firebase Auth + Firestore setup
├── App.tsx                   # Main app component
├── types.ts                  # TypeScript definitions
└── index.js                  # Entry point

```

## 🎯 Usage

1. **Log a Cigarette**: Tap the large green button on the Home screen
2. **View History**: Navigate to the History tab to see all logged entries
3. **Analyze Trends**: Check the Monthly Summary for calendar view and statistics
4. **Customize**: Adjust settings in the Settings tab

## 🔐 Privacy

Data is stored in your own Firebase project and isolated by authenticated user ID.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Min Thein Kyaw**
- GitHub: [@MinThein-Kyaw](https://github.com/MinThein-Kyaw)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
