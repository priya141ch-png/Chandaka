# Finance App - Setup & Build Guide

## Project Structure

```
FinanceApp/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── CardsScreen.js
│   │   ├── RewardsScreen.js
│   │   └── MoreScreen.js (Admin Panel)
│   └── utils/
│       └── storage.js (Local data management)
├── App.js (Main app with navigation)
├── index.js
├── app.json
├── package.json
└── SETUP_GUIDE.md
```

## Features

✅ **Home Screen** - Dashboard with cards, loans, and bank accounts
✅ **Cards Management** - View and manage credit cards
✅ **Rewards** - Cashback and reward points tracking
✅ **Admin Panel** - Add/remove cards, loans, and bank accounts
✅ **Local Storage** - All data persists on device
✅ **Beautiful UI** - Modern fintech design with dark theme

---

## Prerequisites

### Required Software

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node -v` and `npm -v`

2. **Java Development Kit (JDK 11 or higher)**
   - Download: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html
   - Verify: `java -version`

3. **Android SDK**
   - Download Android Studio: https://developer.android.com/studio
   - Install Android SDK (minimum API 21)

4. **Android NDK** (optional but recommended)
   - Install via Android Studio > SDK Manager

5. **Gradle**
   - Usually comes with Android Studio

---

## Step-by-Step Setup

### 1. Navigate to Project Directory

```bash
cd C:\Users\swath\FinanceApp
```

### 2. Install Node Dependencies

```bash
npm install
```

This will install all required packages:
- react-native
- @react-navigation/native
- @react-navigation/bottom-tabs
- react-native-vector-icons
- @react-native-async-storage/async-storage
- react-native-linear-gradient
- And more...

### 3. Install React Native CLI

```bash
npm install -g react-native-cli
```

### 4. Set Up Android Environment

**For Windows:**

Create or edit `local.properties` in the Android folder:

```bash
echo sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk > android\local.properties
```

Replace `YOUR_USERNAME` with your actual Windows username.

If you don't know where Android SDK is located:
1. Open Android Studio
2. Go to File > Project Structure
3. Check the Android SDK Location

### 5. Create Keystore for Release Build (Required for APK)

```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

**Follow the prompts:**
- Enter keystore password: `123456` (or your choice)
- Enter key password: `123456` (same as keystore)
- Fill in other details (can be anything for school project)

**Save this keystore file** - you'll need it for building the APK

---

## Running the App

### Option 1: Development Mode

Connect your Android phone via USB or use an emulator, then run:

```bash
react-native start
```

In another terminal:

```bash
react-native run-android
```

### Option 2: Using Expo (Easier for Testing)

If you prefer using Expo CLI:

```bash
npm install -g expo-cli
```

Then:

```bash
expo start
```

Scan QR code with Expo Go app on your phone.

---

## Building APK for Installation

### Method 1: Using Gradle (Recommended)

**Step 1: Go to Android Directory**

```bash
cd android
```

**Step 2: Build Release APK**

```bash
./gradlew assembleRelease
```

**Step 3: Find Your APK**

The APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Method 2: Using React Native CLI

```bash
cd android
./gradlew assembleRelease
```

---

## Installing APK on Your Phone

### Step 1: Transfer APK to Phone

1. Copy `app-release.apk` to your phone (via USB cable or email)
2. On your phone: Settings > Security > Enable "Unknown Sources"

### Step 2: Install

1. Open file manager on phone
2. Navigate to Downloads folder
3. Tap on `app-release.apk`
4. Tap "Install"

---

## Admin Panel Access

### How to Use Admin Features

1. Open the app
2. Go to **More** tab (bottom right)
3. Tap on **Admin Panel** button
4. Enter password: **`12345`**
5. You'll now see options to:
   - **Manage Credit Cards** - Add/remove cards
   - **Manage Personal Loans** - Add/remove loans
   - **Manage Bank Accounts** - Add/remove accounts

### Default Data

The app comes with sample data:
- 2 Credit Cards (HDFC, Axis)
- 1 Personal Loan
- 2 Bank Accounts

You can delete these and add your own via the admin panel.

---

## Troubleshooting

### Issue: "react-native: command not found"

**Solution:**
```bash
npm install -g react-native-cli
```

### Issue: "Android SDK not found"

**Solution:**
1. Install Android Studio
2. Run SDK Manager
3. Create `local.properties` in `android/` folder:
   ```
   sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
   ```

### Issue: "Gradle build failed"

**Solution:**
1. Delete `android/build` and `android/.gradle` folders
2. Run:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleRelease
   ```

### Issue: App crashes on launch

**Solution:**
1. Clear app data
2. Delete `node_modules` and `android/build`
3. Run `npm install` again
4. Rebuild

### Issue: "Cannot find module '@react-navigation/native'"

**Solution:**
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

---

## Important Notes for School Project

✅ **Original Design** - Created from scratch, not a copy
✅ **Full Functionality** - All features implemented
✅ **Professional UI** - Modern fintech design
✅ **Local Storage** - No backend required
✅ **Admin System** - Easy data management
✅ **Installable** - Works as a real Android app

---

## File Sizes & Performance

- APK Size: ~80-100 MB (depending on dependencies)
- Minimum Android Version: API 21 (Android 5.0)
- Target Android Version: API 32+

---

## Next Steps

1. ✅ Set up Node.js and Java
2. ✅ Install dependencies: `npm install`
3. ✅ Configure Android SDK
4. ✅ Create keystore file
5. ✅ Build APK: `./gradlew assembleRelease`
6. ✅ Install on your phone
7. ✅ Test admin features with password: `12345`

---

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Make sure all prerequisites are installed
3. Verify paths in `local.properties`
4. Clear caches: `npm cache clean --force`
5. Delete `node_modules` and reinstall

---

**Happy building! 🚀**
