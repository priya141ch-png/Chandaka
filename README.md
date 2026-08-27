# Finance App - Professional Financial Management Application

A beautifully designed, fully-featured financial management app built with React Native for Android. Perfect for tracking credit cards, personal loans, bank accounts, and rewards.

## 🎨 Features

### Core Features
- 📊 **Dashboard** - Overview of all financial accounts
- 💳 **Credit Card Management** - Track cards, due dates, and amounts
- 💰 **Personal Loans** - Monitor EMI payments and loan status
- 🏦 **Bank Accounts** - Manage multiple bank accounts
- 🎁 **Rewards & Cashback** - Track earned rewards and coins
- ⚙️ **Admin Panel** - Add/remove financial data
- 🎨 **Dark Theme UI** - Modern, professional design

### Technical Features
- ✅ 100% React Native (Cross-platform ready)
- ✅ Local Storage (AsyncStorage)
- ✅ Bottom Tab Navigation
- ✅ Linear Gradients & Animations
- ✅ Responsive Design
- ✅ Professional Icon Set

---

## 📱 Screenshots

### Home Screen
- User greeting and profile
- Live promotional offers
- Money matters section
- Upcoming bills
- Bank accounts
- Personal loans

### Cards Screen
- View all credit cards
- Add new cards
- Delete cards
- Card color customization
- Card summary stats

### Rewards Screen
- Total rewards coins
- Cashback summary
- Reward categories
- Special offers
- How to earn more

### More Screen (Settings)
- User profile
- Admin panel
- Settings menu
- App information
- Logout

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- Java Development Kit (JDK 11+)
- Android SDK
- Android Studio (recommended)

### Installation

1. **Clone/Download the project**
   ```bash
   cd C:\Users\swath\FinanceApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Android SDK**
   ```bash
   echo sdk.dir=C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk > android\local.properties
   ```

4. **Start the development server**
   ```bash
   react-native start
   ```

5. **Run on Android**
   ```bash
   react-native run-android
   ```

---

## 📦 Build APK for Installation

### Step 1: Generate Keystore
```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### Step 2: Build Release APK
```bash
cd android
./gradlew assembleRelease
```

### Step 3: Install on Phone
1. Enable "Unknown Sources" in phone settings
2. Transfer APK to phone
3. Tap APK to install

APK location: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🔐 Admin Panel

### Access
1. Go to **More** tab
2. Tap **Admin Panel**
3. Enter password: `12345`

### What You Can Do
- ✅ Add/Remove Credit Cards
- ✅ Add/Remove Personal Loans
- ✅ Add/Remove Bank Accounts
- ✅ Manage all financial data
- ✅ Customize card colors

---

## 📁 Project Structure

```
FinanceApp/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Dashboard
│   │   ├── CardsScreen.js         # Credit card management
│   │   ├── RewardsScreen.js       # Rewards & cashback
│   │   └── MoreScreen.js          # Settings & admin
│   └── utils/
│       └── storage.js             # Local data management
├── android/                        # Android native code
├── App.js                          # Main app component
├── index.js                        # App entry point
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── metro.config.js                 # Metro bundler config
├── SETUP_GUIDE.md                  # Detailed setup instructions
├── ADMIN_GUIDE.md                  # Admin panel guide
└── README.md                       # This file
```

---

## 🛠️ Technologies Used

- **React Native 0.72** - Cross-platform mobile framework
- **React Navigation 6** - Bottom tab navigation
- **React Native Vector Icons** - Icon library
- **React Native Async Storage** - Local data persistence
- **React Native Linear Gradient** - Gradient effects
- **Babel** - JavaScript transpiler
- **Metro** - React Native bundler

---

## 💾 Data Storage

All data is stored **locally on your device** using AsyncStorage:
- Credit cards information
- Personal loans details
- Bank account information
- Rewards and cashback data

**No backend server required!**

---

## 🎓 For School Project

This app demonstrates:
✅ Mobile app development with React Native
✅ Navigation and routing
✅ Local data persistence
✅ UI/UX design principles
✅ State management
✅ Authentication/Admin panel
✅ Component-based architecture
✅ Professional app structure

---

## 📝 Default Data

The app comes with sample data to demonstrate functionality:

**Credit Cards:**
- HDFC Bank: ₹72,347 due in 6 days
- Axis Bank: ₹45,890 due in 8 days

**Loans:**
- HDFC Personal Loan: ₹15,234 EMI

**Bank Accounts:**
- HDFC Bank Savings: ₹15,00,000
- ICICI Bank Savings: ₹8,75,000

**Rewards:**
- Total Coins: 6,01,148
- Total Cashback: ₹15,000

---

## 🔒 Security Notes

**For Educational Use Only:**
- Admin password is hardcoded for simplicity
- Data stored locally (not encrypted)
- No backend authentication
- For production: implement proper security

---

## 📋 System Requirements

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| Android Version | 5.0 (API 21) | 12+ (API 32+) |
| RAM | 2GB | 4GB+ |
| Storage | 100MB | 200MB+ |
| Node.js | v14 | v16+ |
| Java JDK | 11 | 11/17 |

---

## 🐛 Troubleshooting

### Common Issues

**Issue: `react-native: command not found`**
```bash
npm install -g react-native-cli
```

**Issue: Android SDK not found**
- Check Android Studio SDK Manager
- Update `local.properties` with correct path

**Issue: Build fails**
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

**Issue: App crashes**
1. Delete `node_modules`
2. Run `npm install`
3. Clear app cache

See `SETUP_GUIDE.md` for detailed troubleshooting.

---

## 📚 Documentation

- **SETUP_GUIDE.md** - Complete setup and build instructions
- **ADMIN_GUIDE.md** - Admin panel detailed guide
- **README.md** - This file (project overview)

---

## 🎯 Future Enhancements

Potential features to add:
- Backend API integration
- Cloud data sync
- Bill payment integration
- Credit score calculation
- Expense tracking
- Budget planning
- Multiple user profiles
- Biometric authentication

---

## 📄 License

This is an educational project. Free to use and modify for learning purposes.

---

## 👨‍💻 Author

Created as a school project to demonstrate:
- Mobile app development
- React Native proficiency
- UI/UX design
- Data management
- App deployment

---

## 🎉 Getting Started

1. Read `SETUP_GUIDE.md` for detailed instructions
2. Install prerequisites
3. Run `npm install`
4. Build and deploy APK
5. Test admin features with password: `12345`

**That's it! You have a fully functional finance app! 🚀**

---

## 📞 Support

If you encounter issues:
1. Check `SETUP_GUIDE.md`
2. Verify all prerequisites are installed
3. Check Android SDK paths
4. Clear caches and rebuild
5. Review error messages in console

---

**Happy coding! 💻📱**
