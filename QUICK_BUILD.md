# Quick APK Build & Install Guide

## ⚡ Fast Track (5 Steps)

### Step 1: Open PowerShell in Project Folder

```powershell
cd C:\Users\swath\FinanceApp
```

### Step 2: Install Dependencies (First time only - takes 2-3 min)

```powershell
npm install
```

### Step 3: Create Signing Key (First time only)

```powershell
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

**Just press Enter and type `123456` for all passwords** (keep it simple for school project)

### Step 4: Build APK (Takes 5-10 minutes)

```powershell
cd android
./gradlew assembleRelease
```

⏳ **Wait for "BUILD SUCCESSFUL"**

### Step 5: Find Your APK

APK File Location:
```
C:\Users\swath\FinanceApp\android\app\build\outputs\apk\release\app-release.apk
```

Copy this file to your Downloads or Desktop for easy access.

---

## 📱 Install on Phone (2 Steps)

### Step 1: Enable Installation from Unknown Sources

1. On your phone, go to **Settings**
2. Tap **Security** (or **Apps**)
3. Toggle **Unknown Sources** to **ON**
4. Confirm if prompted

### Step 2: Transfer & Install APK

**Option A: Using USB Cable**
1. Connect phone to computer via USB
2. Copy `app-release.apk` to your phone's **Downloads** folder
3. On phone: Open **Files/File Manager**
4. Navigate to **Downloads**
5. Tap **app-release.apk**
6. Tap **Install**
7. Done! ✅

**Option B: Using Email**
1. Email the APK to yourself
2. On phone: Open email
3. Download the attachment
4. Tap to install

**Option C: Using Cloud Storage**
1. Upload APK to Google Drive or Dropbox
2. Download from phone
3. Tap to install

---

## ✅ Verify Installation

1. Look for **Finance App** icon on home screen
2. Tap to open
3. You should see the dashboard

### Test Admin Panel:
1. Go to **More** tab (bottom right)
2. Tap **Admin Panel**
3. Enter password: `12345`
4. See the manage options

---

## 🐛 If Build Fails

### Error: "SDK not found"

Create `android/local.properties`:

```powershell
# Find your SDK path first, then:
echo sdk.dir=C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk > android\local.properties
```

Replace `YOUR_USERNAME` with your actual Windows username.

### Error: "Java not found"

Install Java JDK:
- Download: https://www.oracle.com/java/technologies/downloads/
- Install and restart

### Error: Build still fails

Clean and rebuild:

```powershell
cd android
./gradlew clean
./gradlew assembleRelease
```

---

## 📋 Checklist

Before building, make sure you have:

- [ ] Node.js installed (`node -v` to check)
- [ ] Java JDK installed (`java -version` to check)
- [ ] Android SDK installed
- [ ] In correct folder: `C:\Users\swath\FinanceApp`
- [ ] Ran `npm install` successfully
- [ ] `android/local.properties` exists with SDK path

---

## 🚀 Complete Build Commands

If you want to copy-paste, here's the full sequence:

```powershell
cd C:\Users\swath\FinanceApp
npm install
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
cd android
./gradlew assembleRelease
```

When finished, your APK will be at:
```
C:\Users\swath\FinanceApp\android\app\build\outputs\apk\release\app-release.apk
```

---

## 📱 Phone Setup

After installing the app:

1. **Open the app**
2. **See the dashboard** with sample data
3. **Test features:**
   - Swipe through Home, Cards, Rewards, More tabs
   - Check credit cards section
   - View rewards points
   - Test admin panel with password: `12345`

---

## ⏱️ Time Estimate

| Task | Time |
|------|------|
| npm install | 2-3 min |
| Create keystore | 1 min |
| Build APK | 5-10 min |
| Transfer to phone | 1-2 min |
| Install | 1 min |
| **Total** | **10-20 min** |

---

## 💡 Tips

✅ First build takes longer (downloads dependencies)
✅ Keep the APK file - you can reinstall anytime
✅ All data is stored locally on your phone
✅ Admin password is `12345` - can't change it without editing code
✅ You can share APK with friends/teachers

---

**Ready? Start with:** 

```powershell
cd C:\Users\swath\FinanceApp
npm install
```

You got this! 🚀
