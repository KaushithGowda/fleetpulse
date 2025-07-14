# FleetPulse

FleetPulse is a mobile app designed to help logistics and operations teams efficiently manage **drivers** and **companies** from a single dashboard. The app supports adding, updating, viewing, and deleting company and driver records, with built-in features for search, pagination, and data validation.

## ✨ Features

- Create, edit, and manage **Company** and **Driver** records
- Search and pagination support
- Share details of a company
- View details in an interactive bottom sheet
- Built-in toast notifications and real-time form validation

## 🧑‍💻 Tech Stack

### Frontend
- [React Native](https://reactnative.dev)
- [Zustand](https://github.com/pmndrs/zustand) — for global state management
- [React Query](https://tanstack.com/query) — for API data fetching & caching
- [NativeWind](https://www.nativewind.dev) — Tailwind-style utility classes for styling
- [Auth.js](https://authjs.dev) — authentication (planned)
- [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet) — smooth bottom sheets

### Backend
- Node.js (Express)
- PostgreSQL with Prisma ORM
- Serverless database powered by [Neon](https://neon.tech)

## 📹 Demo Video

You can find a walkthrough demo of the app here:  
📁 [FleetPulse Demo Video](https://drive.google.com/drive/folders/15h1W-gZP_j7_RyR29npo8fCnO_iYSu9C?usp=sharing)

## 🚀 iOS Installation Guide

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install CocoaPods dependencies (first-time only):
   ```bash
   npx pod-install
   ```

3. Start Metro:
   ```bash
   npx react-native start
   ```

4. In a separate terminal, run the app:
   ```bash
   npx react-native run-ios
   ```

> ⚠️ Android version is **not yet configured for testing**

---

## 📄 License

This project is licensed for development and demo purposes only.