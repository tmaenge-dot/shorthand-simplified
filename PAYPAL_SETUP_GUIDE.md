# PayPal Payment Integration - Setup Guide

## ✅ Current Status

Your PayPal integration is **95% complete**! Here's what's ready:

- ✅ PayPal Developer account created
- ✅ REST API app created ("Shorthand Tutor App")
- ✅ Client ID obtained: `AUbVu5Ik8BzHXAQbJBgP_...`
- ✅ Payment UI integrated
- ✅ Code fully implemented
- ⚠️ **Need to complete**: Create subscription plans in PayPal dashboard

---

## 🚀 Quick Setup (15 minutes)

### Step 1: Create Subscription Plans (10 min)

1. **Go to PayPal Developer Dashboard**
   - Visit: https://developer.paypal.com/dashboard/
   - Login with your account

2. **Navigate to Products & Plans**
   - Click "Apps & Credentials" → Select your app ("Shorthand Tutor App")
   - Click "Products" tab

3. **Create Monthly Plan**
   ```
   Product Name: Premium Monthly Subscription
   Product Type: Service
   Category: Digital Goods
   
   Billing Plan Name: Premium Monthly
   Billing Cycle: Every 1 Month
   Amount: $4.99 USD
   
   Setup Fee: $0
   Trial: No trial period
   ```
   - Copy the **Plan ID** (starts with `P-`)
   - Save it for Step 3

4. **Create Annual Plan**
   ```
   Product Name: Premium Annual Subscription
   Product Type: Service
   Category: Digital Goods
   
   Billing Plan Name: Premium Annual
   Billing Cycle: Every 1 Year
   Amount: $29.99 USD
   
   Setup Fee: $0
   Trial: No trial period
   ```
   - Copy the **Plan ID**
   - Save it for Step 3

5. **Create Lifetime Product**
   ```
   Product Name: Premium Lifetime Access
   Product Type: Digital Goods
   Category: Digital Goods
   Price: $49.99 USD
   ```
   - Copy the **Product ID**
   - Save it for Step 3

### Step 2: Get Your Secret Key (2 min)

1. In PayPal Developer Dashboard
2. Go to "Apps & Credentials"
3. Select "Shorthand Tutor App"
4. Under "Secret", click "Show"
5. Copy the secret key

### Step 3: Update Configuration (3 min)

Update `contexts/PayPalContext.tsx` with your Plan IDs:

```typescript
const PLANS = {
  monthly: {
    name: 'Premium Monthly',
    price: '4.99',
    currency: 'USD',
    interval: 'MONTH',
    planId: 'P-XXX', // Replace with your Monthly Plan ID
  },
  annual: {
    name: 'Premium Annual',
    price: '29.99',
    currency: 'USD',
    interval: 'YEAR',
    planId: 'P-YYY', // Replace with your Annual Plan ID
  },
  lifetime: {
    name: 'Premium Lifetime',
    price: '49.99',
    currency: 'USD',
    planId: 'PRODUCT-ZZZ', // Replace with your Lifetime Product ID
  },
};
```

Update `app.json` with your full Client ID:

```json
"extra": {
  "PAYPAL_CLIENT_ID": "YOUR_FULL_CLIENT_ID_HERE"
}
```

---

## 📱 Testing Your Integration

### Test Mode (Sandbox)

1. **Switch to Sandbox Mode**
   - Your app is currently using live credentials
   - For testing, change the SDK URL in `app/paywall-paypal.tsx`:
   
   ```javascript
   // Change from:
   script.src = `https://www.paypal.com/sdk/js?client-id=...`;
   
   // To:
   script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=...`;
   ```

2. **Create Test Accounts**
   - Go to: https://developer.paypal.com/dashboard/accounts
   - Create a test buyer account
   - Create a test merchant account

3. **Test the Flow**
   - Open your app: https://tmaenge-dot.github.io/shorthand-simplified/
   - Click any premium feature
   - Click "Upgrade to Premium"
   - Select a plan
   - Click "Pay with PayPal"
   - Login with test buyer credentials
   - Complete test purchase

4. **Verify Payment**
   - Check sandbox merchant account for payment
   - Verify premium features unlock in your app

### Production Mode

1. **Switch to Live Credentials**
   - Use production Client ID and Secret
   - Use live SDK URL (default)
   - Test with real PayPal account first (refund after)

2. **Go Live**
   - Remove sandbox URL
   - Deploy updated code
   - Test with small real payment
   - Monitor first few transactions

---

## 💰 Pricing Structure

| Plan | Price | Revenue/User | Value Proposition |
|------|-------|--------------|-------------------|
| **Monthly** | $4.99/mo | $4.99/mo | Low commitment, try it out |
| **Annual** | $29.99/yr | $2.50/mo | Save 50%, best value |
| **Lifetime** | $49.99 | One-time | Own it forever, no recurring |

**Expected Revenue (100 users):**
- 40% Monthly: 40 users × $4.99 = $199.60/month
- 50% Annual: 50 users × $29.99 = $1,499.50/year ($125/month)
- 10% Lifetime: 10 users × $49.99 = $499.90 (one-time)

**Total Monthly Revenue: ~$324.60 + upfront lifetime sales**

---

## 🔐 Security Best Practices

1. **Never Expose Secret Key**
   - Keep secret key on server-side only
   - Don't commit to GitHub
   - Use environment variables

2. **Verify Webhooks**
   - Set up PayPal webhooks to verify payments server-side
   - Don't rely solely on client-side status

3. **Handle Chargebacks**
   - Monitor PayPal dashboard for disputes
   - Keep transaction logs
   - Respond to disputes within 7 days

---

## 🎯 Next Steps

### Immediate (Do Now):
1. ✅ Create 3 subscription plans in PayPal
2. ✅ Update Plan IDs in code
3. ✅ Test with sandbox accounts
4. ✅ Deploy to production

### Optional Enhancements:
- [ ] Set up PayPal webhooks for real-time payment verification
- [ ] Add server-side validation (Firebase Functions)
- [ ] Implement grace period for failed renewals
- [ ] Add promotional codes/discounts
- [ ] Set up email receipts

### Monitoring:
- [ ] Check PayPal dashboard daily for first week
- [ ] Monitor conversion rates (visitors → purchases)
- [ ] Track most popular plan
- [ ] Set up alerts for failed payments

---

## 📊 PayPal Dashboard Monitoring

**What to Monitor:**
1. **Transaction Volume**: Daily sales count
2. **Revenue**: Total earnings
3. **Disputes**: Handle within 7 days
4. **Chargebacks**: Minimize by good customer service
5. **Subscription Renewals**: Track churn rate

**Dashboard URL**: https://www.paypal.com/businessmanage/

---

## ❓ Troubleshooting

### "PayPal SDK not loaded" Error
- Check internet connection
- Verify Client ID is correct
- Check browser console for script loading errors

### Payment Button Not Showing
- Verify you're on the web version
- Check if PayPal script loaded (inspect element)
- Try clearing browser cache

### Payment Succeeds But Premium Not Unlocking
- Check localStorage for "premium_status"
- Verify payment callback is executing
- Check browser console for errors

### Subscription Not Renewing
- Verify Plan ID is correct
- Check PayPal dashboard for subscription status
- Ensure buyer's payment method is valid

---

## 🚀 Launch Checklist

- [ ] All 3 plans created in PayPal
- [ ] Plan IDs updated in code
- [ ] Client ID configured
- [ ] Tested with sandbox account
- [ ] Tested with real payment (refunded)
- [ ] Premium features unlock correctly
- [ ] Payment confirmation appears
- [ ] Webhook configured (optional)
- [ ] Code deployed to production
- [ ] Monitoring dashboard bookmarked

---

## 📞 Support Resources

- **PayPal Developer Docs**: https://developer.paypal.com/docs/
- **Subscription Plans Guide**: https://developer.paypal.com/docs/subscriptions/
- **Integration Issues**: https://www.paypal-community.com/
- **Your PayPal Dashboard**: https://developer.paypal.com/dashboard/

---

## 🎉 You're Almost Ready!

Complete the 3 steps above and you'll be accepting real payments within 15 minutes!

**Current App URL**: https://tmaenge-dot.github.io/shorthand-simplified/

**Revenue Potential**: $300-500/month with just 100 users!
