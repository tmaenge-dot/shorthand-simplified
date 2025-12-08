# Quick Start - Activate Payments (30 minutes)

## 🎯 Your Next Steps

### 1️⃣ RevenueCat (10 min)
```
1. Go to https://www.revenuecat.com/
2. Sign up (free account)
3. Create project "Shorthand Simplified"
4. Copy API keys from Project Settings → API Keys
5. Paste keys in app.json (lines 67-68)
```

### 2️⃣ Google Play Console (15 min)
```
1. Go to https://play.google.com/console
2. Select "Shorthand Simplified" app
3. Go to Monetization → In-app products
4. Create 3 products:
   - premium_monthly: $4.99/month (subscription)
   - premium_annual: $29.99/year (subscription) 
   - premium_lifetime: $49.99 (one-time)
5. Go to Settings → API Access
6. Download service account JSON
```

### 3️⃣ Link Google Play to RevenueCat (5 min)
```
1. In RevenueCat dashboard
2. Project Settings → Integrations → Google Play
3. Upload the JSON key file
4. Enter package: com.shorthandsimplified.app
```

### 4️⃣ Configure RevenueCat Products
```
1. RevenueCat → Entitlements → Create "premium"
2. RevenueCat → Products → Add all 3 Google Play products
3. RevenueCat → Offerings → Create "default" offering
4. Add all 3 products to the offering
```

## 🧪 Test Before Launch
```bash
# Add test account in Google Play → License Testing
# Then test on real device
npm run android
```

## 🚀 Go Live
```bash
# Build production
eas build --platform android --profile production

# Upload AAB to Google Play Console
# Submit for review
```

## 📍 You Are Here
✅ Payment UI ready (paywall.tsx)
✅ RevenueCat integrated (PremiumContext.tsx)
✅ Premium features locked (components use PremiumLock)
⏳ Need: RevenueCat API keys
⏳ Need: Google Play products configured
⏳ Need: Link accounts

## 🎁 Already Configured
- Package name: com.shorthandsimplified.app
- EAS Project ID: e66fce43-9f41-4bf5-9e37-d8231236a950
- Premium entitlement: "premium"
- 3 pricing tiers ready
- Restore purchases button
- Premium badge system

## 💰 Expected Revenue Potential
- Monthly: $4.99 × subscribers
- Annual: $29.99 × subscribers (higher LTV)
- Lifetime: $49.99 × one-time buyers
- RevenueCat handles all the complexity!

---
**Read full guide:** PAYMENT_ACTIVATION_GUIDE.md
