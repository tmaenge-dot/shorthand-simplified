# Deployment guide — Shorthand Simplified

This repository has a production Android App Bundle (.aab) already built by EAS. Use the instructions below to deploy to Google Play (when you have a Play Developer account) or distribute the build to testers right now.

Artifact (already built):

- Expo EAS artifact: https://expo.dev/artifacts/eas/jwHZvfSu3j9d9Y6qNcEqz3.aab

Quick options
- Automated submit (recommended when you have Play Developer access): add `google-service-account.json` to project root (or update `eas.json`) and run `eas submit --platform android --profile production`.
- Manual Play Console upload: download the .aab above and upload in Play Console → Release → Internal testing / Production.
- Share with testers right now: download the .aab and distribute (sideload or use Firebase App Distribution / TestFairy / similar).

Manual Play Console upload (high-level)
1. Sign in to Play Console (https://play.google.com/console). Register as a developer if needed (one-time $25).
2. Create a new app: All apps → Create app. Fill app name and default language.
3. Setup internal testing (recommended first): Testing → Internal testing → Create new release → Upload the .aab.
4. Add release notes, save, review, and roll out to the internal testing track.
5. Complete store listing: Store presence → Main store listing — add short & full descriptions, app icon, feature graphic (1024×500), screenshots (phone/tablet), contact email and privacy policy URL.
6. Set pricing & distribution and content rating.

How to download the .aab locally
You can use the script in `scripts/download_aab.sh` or curl manually:

```bash
# download artifact to current directory
curl -L -o shorthand-simplified.aab https://expo.dev/artifacts/eas/jwHZvfSu3j9d9Y6qNcEqz3.aab
```

How to install the .aab on a device (sideload)
Android uses app bundles — you must use bundletool to install the .aab on a device or generate apks:

1. Install bundletool: https://github.com/google/bundletool
2. Generate APKS from the AAB:

```bash
# generate apks for a connected device
java -jar bundletool.jar build-apks --bundle=shorthand-simplified.aab --output=shorthand.apks --connected-device
# install generated apks
java -jar bundletool.jar install-apks --apks=shorthand.apks
```

Alternatively, upload the .aab to Firebase App Distribution or other test distribution service and invite testers.

If you want me to perform the Play Console submit for you later:
- Register a Play Developer account and create a service account (Play Console → Settings → API access) and download the JSON key (`google-service-account.json`).
- Upload that JSON to the project root (do NOT paste it in chat). When you confirm it's uploaded, I'll run `eas submit --platform android --profile production` and finish the submission.

Notes & security
- The artifact above was built using Expo-managed credentials (Expo generated the keystore). You can manage your own keystore later if desired.
- Keep `google-service-account.json` private. Prefer adding it to CI secrets rather than committing to git in the long term.

If you'd like, I can also prepare the Play Store listing assets and fill the metadata so the only missing step is the service-account JSON and a final submit. Say the word and I will add the metadata files to `playstore/`.
# Shorthand Simplified - Play Store Deployment Guide

## Overview
This guide will help you deploy your Shorthand Simplified app to the Google Play Store using Expo EAS Build.

## Prerequisites

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Create an Expo Account**
   - Visit https://expo.dev/signup
   - Sign up for a free account

3. **Google Play Console Account**
   - Visit https://play.google.com/console
   - Pay the one-time $25 registration fee
   - Complete your developer profile

## Step 1: Configure Your App

### Update Package Identifier
Edit `app.json` and replace `com.yourcompany.shorthandsimplified` with your unique package name:
- Format: `com.yourcompanyname.shorthandsimplified`
- Example: `com.johndoe.shorthandsimplified`

### Update Project Assets (Optional but Recommended)
- **App Icon**: Replace `./assets/images/icon.png` (1024x1024 px)
- **Adaptive Icon**: Replace Android icon images in `./assets/images/`
- **Splash Screen**: Replace `./assets/images/splash-icon.png`

## Step 2: Login to EAS

```bash
eas login
```

Enter your Expo account credentials.

## Step 3: Configure EAS Build

```bash
eas build:configure
```

This creates an `eas.json` file with build configurations.

## Step 4: Create a Production Build

### For Android APK (Testing)
```bash
eas build --platform android --profile preview
```

### For Android App Bundle (Play Store)
```bash
eas build --platform android --profile production
```

The build process takes 10-20 minutes. You'll receive a download link when complete.

## Step 5: Prepare Play Store Listing

### Required Assets

1. **App Icon** (512x512 px PNG)
2. **Feature Graphic** (1024x500 px JPG/PNG)
3. **Screenshots** (at least 2):
   - Phone: 16:9 or 9:16 aspect ratio
   - Minimum dimension: 320px
   - Maximum dimension: 3840px

### App Information

**Title**: Shorthand Simplified

**Short Description** (80 characters max):
"Learn shorthand writing - strokes, shortforms, phrases & outlines"

**Full Description**:
```
Master the art of rapid writing with Shorthand Simplified!

📝 LEARN SHORTHAND FUNDAMENTALS
• Basic strokes for consonants, vowels, and blends
• Common shortforms for frequently used words
• Phrase combinations for faster writing
• Complete word outlines with detailed breakdowns

🎯 PERFECT FOR
• Students taking class notes
• Professionals in meetings
• Journalists and reporters
• Court reporters in training
• Anyone wanting to write faster

✨ FEATURES
• Categorized learning sections
• Search functionality across all content
• Beginner to advanced difficulty levels
• Comprehensive Q&A guidelines
• Clean, easy-to-use interface
• Works offline - no internet required

📚 WHAT YOU'LL MASTER
• 18+ essential strokes
• 26+ common shortforms
• 20+ frequently used phrases
• 24+ word outlines with breakdowns
• Expert tips and practice guidelines

🎓 LEARNING APPROACH
Our app follows proven shorthand principles:
✓ Write by sound, not spelling
✓ Join strokes for fluid writing
✓ Practice daily for best results
✓ Read back notes immediately

Whether you're a beginner or looking to refresh your skills, Shorthand Simplified provides a structured, comprehensive approach to learning this valuable skill.

Start your shorthand journey today!
```

**Category**: Education

**Tags/Keywords**:
- shorthand
- writing
- note taking
- learning
- education
- productivity
- stenography
- study skills

### Content Rating
Complete the content rating questionnaire in Play Console.
- Target audience: Everyone
- No ads, no in-app purchases

### Privacy Policy
You'll need a privacy policy URL. Since this is an offline educational app with no data collection, you can use a simple one:

Example privacy policy content:
```
Privacy Policy for Shorthand Simplified

This app does not collect, store, or share any personal information.
All content is stored locally on your device.
No internet connection is required.
No analytics or tracking is implemented.

Last updated: [Current Date]
```

Host this on a simple website or GitHub Pages.

## Step 6: Upload to Play Store

1. **Login to Google Play Console**
   https://play.google.com/console

2. **Create a New App**
   - Click "Create app"
   - Enter app details
   - Select default language
   - Choose app type (App)
   - Select free or paid

3. **Complete Store Listing**
   - Upload screenshots
   - Add app icon and feature graphic
   - Write descriptions
   - Add contact details

4. **Upload App Bundle**
   - Go to "Production" → "Releases"
   - Create new release
   - Upload the AAB file from EAS build
   - Add release notes

5. **Set Content Rating**
   - Complete questionnaire
   - Generate rating

6. **Set Target Audience**
   - Age groups: 13+
   - No ads

7. **Add Privacy Policy**
   - Enter your privacy policy URL

8. **Pricing & Distribution**
   - Select countries
   - Confirm it's free
   - Accept declarations

9. **Submit for Review**
   - Review all sections
   - Click "Submit for review"

## Step 7: Wait for Approval

- Initial review: 1-7 days
- You'll receive email updates
- App will be published automatically upon approval

## Updating Your App

When you want to release updates:

1. Update version in `app.json`:
   ```json
   "version": "1.1.0",
   "android": {
     "versionCode": 2
   }
   ```

2. Create new build:
   ```bash
   eas build --platform android --profile production
   ```

3. Upload to Play Console as new release

## Testing Before Release

### Internal Testing
1. Create an internal testing track in Play Console
2. Upload your AAB
3. Add testers (email addresses)
4. Share the testing link

### Local Testing
```bash
# Start the development server
npm start

# Or test on Android emulator
npm run android
```

## Important Notes

- **Package Name**: Cannot be changed after first upload
- **Version Code**: Must increment with each release
- **App Signing**: Use Google Play App Signing (recommended)
- **Backup**: Keep your keystore safe if not using Google Play signing

## Support & Resources

- Expo EAS Docs: https://docs.expo.dev/build/introduction/
- Play Console Help: https://support.google.com/googleplay/android-developer
- Expo Forums: https://forums.expo.dev/

## Troubleshooting

### Build Fails
- Check `eas.json` configuration
- Ensure all dependencies are installed
- Review build logs in Expo dashboard

### App Rejected
- Common reasons: policy violations, content rating issues
- Review Google Play policies
- Update and resubmit

## Next Steps After Publishing

1. Monitor reviews and ratings
2. Respond to user feedback
3. Plan feature updates
4. Track downloads in Play Console
5. Consider adding more shorthand content

Good luck with your app launch! 🚀
