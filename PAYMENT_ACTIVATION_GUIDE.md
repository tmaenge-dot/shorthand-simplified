# Payment Activation Guide - Shorthand Simplified

## ✅ Current Status
Your app is already integrated with **RevenueCat** for payment processing. You just need to complete the configuration.

## 🚀 Steps to Activate Real Payments

### Step 1: RevenueCat Setup

1. **Create RevenueCat Account**
   - Go to https://www.revenuecat.com/
   - Sign up for a free account (supports up to $10k/month in revenue)
   - Create a new project named "Shorthand Simplified"

2. **Get Your API Keys**
   - In RevenueCat dashboard, go to **Project Settings** → **API Keys**
   - Copy your **Public SDK Keys**:
     - Android: `rcb_xxx...`
     - iOS: `appl_xxx...` (if you plan iOS support)

3. **Update app.json**
   Replace the placeholder keys in `app.json`:
   ```json
   "extra": {
     "REVENUECAT_API_KEY_ANDROID": "rcb_YOUR_ACTUAL_ANDROID_KEY",
     "REVENUECAT_API_KEY_IOS": "appl_YOUR_ACTUAL_IOS_KEY"
   }
   ```

### Step 2: Google Play Console Setup

1. **Create Products in Google Play Console**
   - Go to https://play.google.com/console
   - Navigate to **Monetization** → **In-app products**
   - Create three products:

   **Product 1: Monthly Subscription**
   - Product ID: `premium_monthly`
   - Name: "Premium Monthly"
   - Description: "Monthly subscription to premium features"
   - Price: $4.99/month
   - Billing Period: Monthly
   - Free Trial: 7 days (optional)

   **Product 2: Annual Subscription**
   - Product ID: `premium_annual`
   - Name: "Premium Annual"
   - Description: "Annual subscription to premium features (Best Value)"
   - Price: $29.99/year
   - Billing Period: Yearly
   - Free Trial: 7 days (optional)

   **Product 3: Lifetime Access**
   - Product ID: `premium_lifetime`
   - Type: **One-time product** (not subscription)
   - Name: "Premium Lifetime"
   - Description: "Lifetime access to all premium features"
   - Price: $49.99

2. **Link Google Play to RevenueCat**
   - In Google Play Console, go to **Settings** → **API Access**
   - Create a service account or use existing
   - Download the JSON key file
   - In RevenueCat dashboard:
     - Go to **Project Settings** → **Integrations**
     - Click **Google Play**
     - Upload the JSON key file
     - Enter your package name: `com.shorthandsimplified.app`

### Step 3: Create Offerings in RevenueCat

1. **Create an Entitlement**
   - In RevenueCat dashboard, go to **Entitlements**
   - Click **+ New**
   - Create entitlement ID: `premium`
   - This controls access to premium features

2. **Create Products**
   - Go to **Products** section
   - Click **+ New**
   - For each product created in Google Play:
     - Enter the Product ID (e.g., `premium_monthly`)
     - Select **Google Play Store**
     - Link to the entitlement `premium`

3. **Create an Offering**
   - Go to **Offerings** section
   - Create offering ID: `default`
   - Add all three products (packages):
     - Monthly ($4.99/mo)
     - Annual ($29.99/yr) - mark as **recommended**
     - Lifetime ($49.99)

### Step 4: Testing

1. **Test with License Testing**
   - In Google Play Console → **Settings** → **License Testing**
   - Add test Gmail accounts
   - Test accounts can make purchases without being charged

2. **Test Purchase Flow**
   ```bash
   # Build and test on device
   npm run android
   ```
   - Navigate to any premium-locked feature
   - Click "Unlock Premium"
   - Verify all three payment options appear
   - Test purchase flow (will use test payment)

### Step 5: Production Deployment

1. **Build Production APK/AAB**
   ```bash
   eas build --platform android --profile production
   ```

2. **Upload to Google Play**
   - Upload the AAB to Google Play Console
   - Complete the store listing
   - Submit for review

3. **Monitor in RevenueCat**
   - RevenueCat dashboard shows real-time revenue
   - Track subscriptions, churns, and lifetime value
   - Access detailed analytics

## 💰 Current Pricing Structure

Your app is configured with three tiers:

| Plan | Price | Description |
|------|-------|-------------|
| **Monthly** | $4.99/mo | Cancel anytime |
| **Annual** | $29.99/yr | Save 50% ($2.50/mo) |
| **Lifetime** | $49.99 | One-time payment |

## 🔒 What's Premium?

Premium features (already implemented in code):
- ✨ Complete Shortforms Library
- ✨ Phrases & Combinations  
- ✨ Full Outlines Database
- ✨ Intersections Guide
- ✨ Professional Comparison Tools
- ✨ Advanced Stroke Recognition
- ✨ No Ads, Forever
- ✨ Lifetime Updates

Free features:
- ✓ Basic Strokes Library
- ✓ Q&A Section
- ✓ Learning Resources
- ✓ Basic Exploration

## 📊 Revenue Tracking

RevenueCat provides:
- Real-time revenue dashboard
- Subscription analytics
- Churn tracking
- Customer lifetime value
- Cohort analysis
- Webhook integrations

## 🛠️ Environment Variables (Alternative)

For better security, you can use environment variables instead of app.json:

1. Create `.env` file:
   ```
   REVENUECAT_API_KEY_ANDROID=rcb_xxx...
   REVENUECAT_API_KEY_IOS=appl_xxx...
   ```

2. Add to `.gitignore`:
   ```
   .env
   ```

3. Install dotenv:
   ```bash
   npm install react-native-dotenv
   ```

## ✅ Checklist

- [ ] Create RevenueCat account
- [ ] Get RevenueCat API keys
- [ ] Update app.json with API keys
- [ ] Create products in Google Play Console
- [ ] Link Google Play to RevenueCat
- [ ] Create entitlement in RevenueCat
- [ ] Create products in RevenueCat
- [ ] Create offering in RevenueCat
- [ ] Test with license testing accounts
- [ ] Build production release
- [ ] Upload to Google Play
- [ ] Submit for review
- [ ] Monitor revenue in RevenueCat

## 🆘 Support

- RevenueCat Docs: https://docs.revenuecat.com/
- Google Play Billing: https://developer.android.com/google/play/billing
- RevenueCat Support: support@revenuecat.com

## 💡 Tips

1. **Start with 7-day free trial** on subscriptions to increase conversions
2. **Promote annual plan** as "Best Value" (you already do this!)
3. **Use RevenueCat Experiments** to A/B test pricing
4. **Monitor churn** and send win-back campaigns
5. **Offer lifetime as anchor** to make annual seem more reasonable
