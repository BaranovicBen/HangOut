# HangOut Mobile App

A clean, minimal mobile app for coordinating group activities and managing availability. Built with Expo, React Native, and TypeScript.

## Features

- **4-Week Calendar View**: See your availability for the next 4 weeks at a glance
- **Session Management**: Create and join hangout sessions with friends
- **Theme Support**: Light, Dark, and System themes
- **Calendar Integration**: Connect to Apple Calendar (iOS) or import .ics files
- **Profile Management**: Manage your account and friends list
- **Responsive Design**: Works on both iOS and Android devices

## Tech Stack

- **Expo SDK 53**: Managed workflow
- **React Native 0.79**: Cross-platform mobile framework
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation library with tab and stack navigators
- **AsyncStorage**: Local data persistence
- **expo-calendar**: iOS calendar integration
- **expo-document-picker**: .ics file import

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm
- Expo Go app (for testing on physical devices)
- iOS Simulator (macOS) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone https://github.com/BaranovicBen/HangOut.git
cd HangOut
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npx expo start
```

## Running the App

### On iOS Simulator (macOS only)
```bash
npx expo start --ios
```

### On Android Emulator
```bash
npx expo start --android
```

### On Physical Device
1. Install the Expo Go app from the App Store (iOS) or Play Store (Android)
2. Run `npx expo start`
3. Scan the QR code with your camera (iOS) or Expo Go app (Android)

## Project Structure

```
HangOut/
├── App.tsx                 # Main app entry point
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── AppHeader.tsx
│   │   ├── Avatar.tsx
│   │   ├── CalendarFourWeekCard.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── SecondaryButton.tsx
│   │   ├── SettingsGroupCard.tsx
│   │   └── SettingsRow.tsx
│   ├── screens/            # Application screens
│   │   ├── HomeScreen.tsx
│   │   ├── CreateSessionScreen.tsx
│   │   ├── JoinSessionScreen.tsx
│   │   ├── SessionLobbyScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── ThemeScreen.tsx
│   │   ├── CalendarConnectScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/         # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   ├── HomeStack.tsx
│   │   └── SettingsStack.tsx
│   ├── theme/             # Theme and styling
│   │   ├── ThemeProvider.tsx
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   ├── data/              # Dummy data
│   │   └── dummy.ts
│   └── utils/             # Helper functions
│       └── dates.ts
├── assets/                # Images and static assets
└── package.json
```

## App Screens

### Home Tab
- **HomeScreen**: Displays a 4-week calendar with availability indicators
  - Green circles indicate free days
  - Greyed out days are in the past
  - Navigation arrows to change months (past months disabled)
  - "Create session" and "Join session" buttons

- **CreateSessionScreen**: Form to create a new hangout session
  - Date range selection
  - Session type selector
  - "Next morning free" toggle

- **JoinSessionScreen**: Enter session code or link to join

- **SessionLobbyScreen**: View session details and participants
  - Share session link
  - View session details
  - Current party members
  - Add friends to session

### Settings Tab
- **SettingsScreen**: Main settings with three sections
  - **General**: Account, Language, Sounds & Haptics
  - **Calendar**: Connections, Theme, Calendar integration, .ics import
  - **Privacy**: Location, Data Collection, Notifications

- **ThemeScreen**: Choose between Light, Dark, or System theme

- **CalendarConnectScreen**: Connect to Apple Calendar
  - Request calendar permissions
  - View available calendars
  - Select calendar to connect

### Profile Screen (accessible from both tabs)
- User information card with name and username
- Friends list with add/remove functionality
- Edit profile button (UI placeholder)

## Features Implemented

✅ Complete UI for all 8 screens
✅ 4-week rolling calendar view
✅ Theme switching (Light/Dark/System)
✅ Navigation between screens
✅ iOS calendar permission handling
✅ .ics file picker integration
✅ Responsive design for different screen sizes
✅ Past day and past month handling
✅ Free day indicators with dummy data

## Features Not Implemented (UI Only)

This is a UI-only implementation. The following features show UI but don't have backend logic:
- Actual calendar event parsing
- Session scheduling algorithms
- Real-time session matching
- Friend management backend
- User authentication
- API integration

## Dummy Data

The app uses dummy data defined in `src/data/dummy.ts`:
- Sample user profile
- 4 sample friends
- Randomly generated free/busy days for the next 4 weeks
- At least 8 free days are guaranteed in the dummy data

## Customization

### Colors
Edit `src/theme/colors.ts` to customize the color scheme for light and dark modes.

### Spacing
Adjust spacing values in `src/theme/spacing.ts`.

### Typography
Modify font sizes and weights in `src/theme/typography.ts`.

## Building for Production

### iOS
```bash
npx expo build:ios
```

### Android
```bash
npx expo build:android
```

Refer to [Expo documentation](https://docs.expo.dev/build/introduction/) for detailed build instructions.

## Troubleshooting

### Metro Bundler Issues
If you encounter caching issues:
```bash
npx expo start --clear
```

### Dependency Issues
If packages are outdated:
```bash
npm install --legacy-peer-deps
```

### iOS Calendar Permissions
Make sure your app.json includes the calendar permission description:
```json
"ios": {
  "infoPlist": {
    "NSCalendarsUsageDescription": "This app needs access to your calendar to show your availability."
  }
}
```

## License

ISC

## Contributing

This is a demo/prototype project. Feel free to fork and modify as needed.

## Notes

- This is a UI prototype focusing on the mobile frontend
- No backend or API calls are implemented
- All data is dummy/mock data for demonstration purposes
- The app works on both iOS and Android simulators/emulators
- Real calendar integration requires additional backend work
