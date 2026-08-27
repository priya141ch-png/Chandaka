# GitHub Automatic APK Build Guide

## 🎯 What This Does

GitHub will **automatically build your APK** when you upload the code. No local setup needed!

### How It Works:
1. You create GitHub account (free)
2. Upload project files
3. GitHub Actions automatically builds APK
4. Download APK from GitHub
5. Install on phone

---

## ⏱️ Timeline

- Create GitHub account: 2 minutes
- Upload code: 2 minutes
- GitHub builds APK: 10-15 minutes
- **Total: 15-20 minutes**

---

## 📋 Step-by-Step Instructions

### STEP 1: Create GitHub Account

1. Go to https://github.com/signup
2. Enter email, password, username
3. Verify email
4. Done! (Free account)

---

### STEP 2: Create a New Repository

1. Go to https://github.com/new
2. Fill in details:
   - **Repository name:** `FinanceApp` (or any name)
   - **Description:** Finance management app for Android
   - **Public** (important - required for free build minutes)
   - Check "Add a README file"
3. Click **Create repository**

---

### STEP 3: Upload Files to GitHub

#### METHOD A: Using GitHub Web Interface (EASIEST)

1. In your new repository, click **Add file → Upload files**
2. Click **choose your files**
3. Select all files from `C:\Users\swath\FinanceApp\` **EXCEPT:**
   - `node_modules/` (if it exists)
   - `android/build/` (if it exists)
   - `android/.gradle/` (if it exists)
   - `.git/` (if it exists)

4. Files to upload:
   ```
   .github/
   src/
   android/ (without build and .gradle folders)
   App.js
   index.js
   app.json
   package.json
   babel.config.js
   metro.config.js
   README.md
   SETUP_GUIDE.md
   ADMIN_GUIDE.md
   ```

5. Click **Commit changes**

---

#### METHOD B: Using Command Line (FASTER)

Open PowerShell in project folder:

```powershell
cd C:\Users\swath\FinanceApp

# Initialize git
git init
git add .
git commit -m "Initial commit: Finance App"

# Add remote repository (replace USERNAME and REPO)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/FinanceApp.git

# Push to GitHub (first time)
git branch -M main
git push -u origin main
```

When prompted for password, use your GitHub **Personal Access Token** (not password):
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` permission
3. Copy and paste when prompted

---

### STEP 4: Wait for Build

1. Go to your repository
2. Click **Actions** tab (top menu)
3. Wait for build to complete (takes 10-15 minutes)

**Status:**
- 🟡 Yellow = Building
- 🟢 Green = Success
- 🔴 Red = Error

---

### STEP 5: Download APK

1. Go to **Actions** tab
2. Click the successful build (green checkmark)
3. Scroll down to **Artifacts**
4. Click **app-release** to download APK
5. Save to your computer

---

### STEP 6: Install on Phone

1. Transfer `app-release.apk` to your phone
2. Enable "Unknown Sources" in Settings
3. Tap APK to install
4. Open app and enjoy!

---

## ✅ Verification

After uploading to GitHub, you should see:

```
✓ Repository created
✓ Files uploaded
✓ .github/workflows/build.yml present
✓ Build running (check Actions tab)
✓ Build successful (green checkmark)
✓ APK artifact ready for download
```

---

## 🐛 If Build Fails

**Check the error log:**

1. Go to **Actions** tab
2. Click the red ❌ build
3. Scroll down to see error
4. Common errors:

### Error: "SDK not found"
**Cause:** Android SDK path issue
**Solution:** GitHub handles this automatically - may be temporary glitch
**Action:** Re-run the workflow or try again in 5 minutes

### Error: "Gradle build failed"
**Cause:** Dependencies not installed correctly
**Solution:** 
1. Try again - sometimes network issues
2. Delete `node_modules` folder locally
3. Push again

### Error: "Java not found"
**This shouldn't happen** - GitHub Actions has Java built-in

---

## 📝 Complete File List to Upload

```
FinanceApp/
├── .github/
│   └── workflows/
│       └── build.yml (GitHub Actions config)
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── CardsScreen.js
│   │   ├── RewardsScreen.js
│   │   └── MoreScreen.js
│   └── utils/
│       └── storage.js
├── android/
│   ├── app/
│   ├── gradle/
│   └── (other Android folders - EXCEPT build/ and .gradle/)
├── App.js
├── index.js
├── app.json
├── package.json
├── babel.config.js
├── metro.config.js
└── README.md
```

**DO NOT upload:**
- `node_modules/`
- `android/build/`
- `android/.gradle/`
- `.git/`
- `my-release-key.keystore`

---

## 🔑 GitHub Personal Access Token (If needed)

If git push asks for password:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Give it a name: "FinanceApp Build"
4. Check "repo" scope
5. Click "Generate token"
6. Copy the token (it won't show again!)
7. Use this token instead of your GitHub password when prompted

---

## ⏱️ Build Time Details

| Step | Time |
|------|------|
| Upload files | 2-3 min |
| Checkout code | 1 min |
| Setup Java | 1 min |
| Setup Android SDK | 3-4 min |
| npm install | 2-3 min |
| Build APK | 3-5 min |
| Upload artifact | 1 min |
| **Total** | **15-20 min** |

---

## 💡 Pro Tips

✅ **Public repository** = Free build minutes
✅ **Keep .github/workflows/build.yml** = Builds automatically on future updates
✅ **GitHub Actions are free** = No cost for public repos
✅ **Artifacts stay 30 days** = Download anytime within 30 days
✅ **Auto-builds on push** = Every time you update code, it rebuilds

---

## 🎯 What Happens Next

1. **You push code to GitHub**
2. **GitHub detects the push**
3. **Triggers the workflow in `.github/workflows/build.yml`**
4. **GitHub Actions automatically:**
   - Sets up Linux environment
   - Installs Node.js
   - Installs Java
   - Installs Android SDK
   - Runs `npm install`
   - Runs `./gradlew assembleRelease`
   - Creates APK
   - Uploads as artifact
5. **You download and install on phone**

---

## 🚀 Quick Start (Command Line Version)

```powershell
cd C:\Users\swath\FinanceApp

# Initialize git
git init
git add .
git commit -m "Finance App - Initial commit"

# Add remote (replace USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/FinanceApp.git
git branch -M main
git push -u origin main
```

Then:
1. Go to your GitHub repository
2. Click Actions tab
3. Wait for green checkmark
4. Download APK
5. Install on phone

---

## 📞 Support

**Issue: Can't find Actions tab**
- Make sure repository is public
- Refresh page

**Issue: Build says "No workflows found"**
- Make sure `.github/workflows/build.yml` was uploaded
- Check it's in the right folder path

**Issue: APK not showing up**
- Wait 15 minutes for build to complete
- Refresh Actions tab
- Check if there's an error (red ❌)

---

## ✨ You Now Have

✅ Automatic build system
✅ Code stored on GitHub
✅ APK ready to download
✅ Can rebuild anytime by pushing new code
✅ Professional setup for school project

---

## 🎓 Benefits for School Project

✅ Shows understanding of CI/CD (Continuous Integration)
✅ GitHub portfolio building
✅ Professional development workflow
✅ No local setup required
✅ Automatic builds - very cool!

---

## 📱 After Build: Install on Phone

```
1. Download app-release.apk from GitHub Actions
2. Transfer to phone (USB, email, or cloud storage)
3. Enable "Unknown Sources" in Settings
4. Tap APK to install
5. Open Finance App
6. Enjoy! 🎉
```

---

## 🎉 You're Ready!

**Next step:**

1. Create GitHub account: https://github.com/signup
2. Create repository: https://github.com/new
3. Upload files
4. Wait for build
5. Download APK
6. Install on phone

**Total time: 15-20 minutes** ⏱️

---

**Happy building! 🚀**
