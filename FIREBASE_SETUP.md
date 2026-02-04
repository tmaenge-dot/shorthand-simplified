# Firebase Backend Setup Guide

## 🔧 Installation Complete

Firebase has been installed and integrated into your app. Now you need to set up your Firebase project.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Create a new project**
3. Enter project name: `shorthand-simplified`
4. Click through the setup wizard
5. Keep defaults for analytics (optional)

## Step 2: Set Up Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click **Add App** → Select **Web** (</> icon)
3. Register app name: `Shorthand Simplified Web`
4. Copy the configuration object - you'll need it in Step 4

## Step 3: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** provider
4. Go to **Settings** → **User actions** and enable "Allow password reset"

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Select **Start in Test Mode** (for development)
4. Choose region closest to you
5. Click **Create**

## Step 5: Add Firebase Config to Your App

Update your `.env` file (or create it in the project root):

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**How to find these values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Project Settings** (gear icon)
4. Go to **General** tab
5. Scroll down to **Your apps** section
6. Find **SDK setup and configuration**
7. Copy the `firebaseConfig` object values

## Step 6: Update app.json

Add this to the `"extra"` section of `app.json`:

```json
"firebase": {
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_PROJECT.firebaseapp.com",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_PROJECT.appspot.com",
  "messagingSenderId": "YOUR_SENDER_ID",
  "appId": "YOUR_APP_ID"
}
```

## Step 7: Create Firestore Security Rules

In Firebase Console → **Firestore** → **Rules**, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Everyone can read purchases (for analytics)
    // Only authenticated users can write
    match /purchases/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish** to apply.

## New Features Now Available

### 1. **User Authentication**
- Register with email/password
- Login/Logout
- Automatic profile creation
- Last login tracking

### 2. **Payment Tracking**
- Every purchase is recorded in Firestore
- Track by user, date, plan type
- Automatic revenue calculations
- Purchase history for each user

### 3. **Admin Dashboard**
- View all purchases in real-time
- See revenue stats
- Export purchases as CSV
- Filter by plan type
- Live refresh

### 4. **Analytics**
- User registration tracking
- Login event tracking
- Purchase event tracking
- Revenue tracking by plan

## How It Works

```
User Payment Flow:
1. User clicks "Pay" button
2. PayPal processes payment
3. Payment approved → Record in Firebase
4. User profile updated with:
   - isPremium: true
   - premiumExpiresAt: date
   - Purchase history
5. Premium content unlocked

Admin Access:
1. Go to: /admin-dashboard
2. View all purchases
3. See revenue stats
4. Export data
```

## URLs After Setup

- **App**: https://tmaenge-dot.github.io/shorthand-simplified/
- **Admin Dashboard**: https://tmaenge-dot.github.io/shorthand-simplified/admin-dashboard
- **Firebase Console**: https://console.firebase.google.com/

## Updating PayPal Integration

The PayPal integration now records purchases to Firebase:

1. User completes payment
2. `recordPurchase()` is called automatically
3. Purchase stored with:
   - User ID
   - Email
   - Plan type
   - Amount
   - PayPal Order ID
   - Purchase date
   - Expiration date

## Testing

### Test User Registration:
1. Go to your app
2. Register with test email: `test@example.com`
3. Password: `Test123!`
4. Check Firebase → Authentication → Users

### Test Purchase:
1. Make a test purchase on your app
2. Go to Admin Dashboard
3. See the purchase recorded in real-time
4. Check Purchase section in Firebase Console

### Test Admin Dashboard:
1. Open: `https://tmaenge-dot.github.io/shorthand-simplified/admin-dashboard`
2. View all purchases
3. See revenue stats
4. Export as CSV

## Troubleshooting

### Firebase not loading?
- Check `.env` file has correct values
- Make sure all EXPO_PUBLIC_ variables are set
- Restart development server: `npx expo start`

### Purchases not showing in Firebase?
- Verify Firestore rules are published
- Check browser console for errors (F12)
- Make sure user is authenticated
- Check Firebase → Firestore → Data

### Admin dashboard not loading?
- Must be on web platform (not mobile)
- Check browser console for errors
- Verify Firestore security rules allow reads
- Try hard refresh (Ctrl+Shift+R)

## Next Steps

1. ✅ Install Firebase
2. Create Firebase project (Step 1-2)
3. Enable Auth & Firestore (Step 3-4)
4. Configure environment variables (Step 5-6)
5. Update Firestore rules (Step 7)
6. Test the integration
7. Deploy production

## Security Notes

- Never commit `.env` file with real credentials
- Use environment variables in production
- Firestore rules control who can access data
- PayPal validates all payments server-side
- User authentication required for purchases

## Support

For issues:
1. Check Firebase Console for errors
2. Look at browser console (F12)
3. Check network tab in DevTools
4. Review Firestore security rules
5. Verify `.env` configuration

---

**Status**: Ready to integrate Firebase! Follow the setup steps above.
