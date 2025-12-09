#!/bin/bash

# PayPal Plan Creation Script
# This will create all 3 subscription plans for Shorthand Simplified

echo "🚀 PayPal Plan Creation for Shorthand Simplified"
echo "=================================================="
echo ""

# Ask for credentials
read -p "Enter your PayPal Client ID: " CLIENT_ID
read -sp "Enter your PayPal Secret: " SECRET
echo ""
echo ""

# Get access token
echo "🔑 Getting access token..."
TOKEN_RESPONSE=$(curl -s -X POST https://api-m.paypal.com/v1/oauth2/token \
  -u "${CLIENT_ID}:${SECRET}" \
  -d 'grant_type=client_credentials')

ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
    echo "❌ Error: Failed to get access token"
    echo "Response: $TOKEN_RESPONSE"
    echo ""
    echo "Please check:"
    echo "1. Client ID and Secret are from the SAME app"
    echo "2. Using LIVE credentials (not Sandbox)"
    echo "3. Credentials are copied correctly (no extra spaces)"
    exit 1
fi

echo "✅ Access token obtained!"
echo ""

# Create Product for Monthly/Annual subscriptions
echo "📦 Creating subscription product..."
PRODUCT_RESPONSE=$(curl -s -X POST https://api-m.paypal.com/v1/catalogs/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "name": "Shorthand Simplified Premium",
    "description": "Premium subscription for Shorthand Simplified app",
    "type": "SERVICE",
    "category": "SOFTWARE"
  }')

PRODUCT_ID=$(echo $PRODUCT_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4 | head -1)

if [ -z "$PRODUCT_ID" ]; then
    echo "❌ Error creating product"
    echo "Response: $PRODUCT_RESPONSE"
    exit 1
fi

echo "✅ Product created: $PRODUCT_ID"
echo ""

# Create Monthly Plan
echo "💳 Creating Monthly Plan (\$4.99/month)..."
MONTHLY_RESPONSE=$(curl -s -X POST https://api-m.paypal.com/v1/billing/plans \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Prefer: return=representation" \
  -d "{
    \"product_id\": \"$PRODUCT_ID\",
    \"name\": \"Premium Monthly\",
    \"description\": \"Shorthand Simplified Premium Monthly Subscription\",
    \"billing_cycles\": [
      {
        \"frequency\": {
          \"interval_unit\": \"MONTH\",
          \"interval_count\": 1
        },
        \"tenure_type\": \"REGULAR\",
        \"sequence\": 1,
        \"total_cycles\": 0,
        \"pricing_scheme\": {
          \"fixed_price\": {
            \"value\": \"4.99\",
            \"currency_code\": \"USD\"
          }
        }
      }
    ],
    \"payment_preferences\": {
      \"auto_bill_outstanding\": true,
      \"setup_fee_failure_action\": \"CONTINUE\",
      \"payment_failure_threshold\": 3
    }
  }")

MONTHLY_PLAN_ID=$(echo $MONTHLY_RESPONSE | grep -o '"id":"P-[^"]*' | cut -d'"' -f4 | head -1)

if [ -z "$MONTHLY_PLAN_ID" ]; then
    echo "❌ Error creating monthly plan"
    echo "Response: $MONTHLY_RESPONSE"
else
    echo "✅ Monthly Plan created: $MONTHLY_PLAN_ID"
fi
echo ""

# Create Annual Plan
echo "💎 Creating Annual Plan (\$29.99/year)..."
ANNUAL_RESPONSE=$(curl -s -X POST https://api-m.paypal.com/v1/billing/plans \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Prefer: return=representation" \
  -d "{
    \"product_id\": \"$PRODUCT_ID\",
    \"name\": \"Premium Annual\",
    \"description\": \"Shorthand Simplified Premium Annual Subscription\",
    \"billing_cycles\": [
      {
        \"frequency\": {
          \"interval_unit\": \"YEAR\",
          \"interval_count\": 1
        },
        \"tenure_type\": \"REGULAR\",
        \"sequence\": 1,
        \"total_cycles\": 0,
        \"pricing_scheme\": {
          \"fixed_price\": {
            \"value\": \"29.99\",
            \"currency_code\": \"USD\"
          }
        }
      }
    ],
    \"payment_preferences\": {
      \"auto_bill_outstanding\": true,
      \"setup_fee_failure_action\": \"CONTINUE\",
      \"payment_failure_threshold\": 3
    }
  }")

ANNUAL_PLAN_ID=$(echo $ANNUAL_RESPONSE | grep -o '"id":"P-[^"]*' | cut -d'"' -f4 | head -1)

if [ -z "$ANNUAL_PLAN_ID" ]; then
    echo "❌ Error creating annual plan"
    echo "Response: $ANNUAL_RESPONSE"
else
    echo "✅ Annual Plan created: $ANNUAL_PLAN_ID"
fi
echo ""

# Create Lifetime Product
echo "🎯 Creating Lifetime Product (\$49.99 one-time)..."
LIFETIME_RESPONSE=$(curl -s -X POST https://api-m.paypal.com/v1/catalogs/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{
    "name": "Shorthand Simplified Lifetime Access",
    "description": "One-time payment for lifetime access to Shorthand Simplified Premium",
    "type": "DIGITAL",
    "category": "SOFTWARE"
  }')

LIFETIME_PRODUCT_ID=$(echo $LIFETIME_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4 | head -1)

if [ -z "$LIFETIME_PRODUCT_ID" ]; then
    echo "❌ Error creating lifetime product"
    echo "Response: $LIFETIME_RESPONSE"
else
    echo "✅ Lifetime Product created: $LIFETIME_PRODUCT_ID"
fi
echo ""

# Summary
echo "=================================================="
echo "🎉 Plan Creation Complete!"
echo "=================================================="
echo ""
echo "📋 Your Plan IDs:"
echo ""
echo "Monthly Plan ID:  $MONTHLY_PLAN_ID"
echo "Annual Plan ID:   $ANNUAL_PLAN_ID"
echo "Lifetime Product: $LIFETIME_PRODUCT_ID"
echo ""
echo "Copy these IDs and update contexts/PayPalContext.tsx:"
echo ""
echo "const PLANS = {"
echo "  monthly: {"
echo "    planId: '$MONTHLY_PLAN_ID',"
echo "  },"
echo "  annual: {"
echo "    planId: '$ANNUAL_PLAN_ID',"
echo "  },"
echo "  lifetime: {"
echo "    planId: '$LIFETIME_PRODUCT_ID',"
echo "  },"
echo "};"
echo ""
