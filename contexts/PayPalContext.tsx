import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Platform } from 'react-native';

// PayPal Configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'AYVkgS2OgtdJWVAtCbu3u031NIIkyFydJ0x86F0e6iMgdC3w4-SphYJalN21vlPHm-hlKAafSE-busGR';

interface PayPalContextType {
  isPremium: boolean;
  isLoading: boolean;
  purchasePlan: (planType: 'monthly' | 'annual' | 'lifetime') => Promise<{ success: boolean; error?: string }>;
  checkPremiumStatus: () => Promise<void>;
}

const PayPalContext = createContext<PayPalContextType | undefined>(undefined);

export const usePayPal = () => {
  const context = useContext(PayPalContext);
  if (!context) {
    throw new Error('usePayPal must be used within PayPalProvider');
  }
  return context;
};

interface PayPalProviderProps {
  children: ReactNode;
}

// Plan configurations
const PLANS = {
  monthly: {
    name: 'Premium Monthly',
    price: '4.99',
    currency: 'USD',
    interval: 'MONTH',
    planId: 'P-9F642900T4091545LNE4EEYQ',
  },
  annual: {
    name: 'Premium Annual',
    price: '29.99',
    currency: 'USD',
    interval: 'YEAR',
    planId: 'P-2TW28080XL942540NNE4EE6I',
  },
  lifetime: {
    name: 'Premium Lifetime',
    price: '49.99',
    currency: 'USD',
    planId: 'PROD-06Y7794429516770G',
  },
};

export const PayPalProvider: React.FC<PayPalProviderProps> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkPremiumStatus = async () => {
    try {
      // Check localStorage for premium status (web)
      if (Platform.OS === 'web') {
        const premiumData = localStorage.getItem('premium_status');
        if (premiumData) {
          const { isPremium: premium, expiresAt } = JSON.parse(premiumData);
          const now = new Date().getTime();
          if (premium && (!expiresAt || expiresAt > now)) {
            setIsPremium(true);
            return;
          }
        }
      }
      setIsPremium(false);
    } catch (error) {
      console.error('Error checking premium status:', error);
      setIsPremium(false);
    }
  };

  const purchasePlan = async (planType: 'monthly' | 'annual' | 'lifetime'): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const plan = PLANS[planType];
      
      if (Platform.OS === 'web') {
        // For web, use PayPal JavaScript SDK
        return await createPayPalOrder(plan, planType);
      } else {
        // For mobile, redirect to web checkout
        return { success: false, error: 'Please use web version for payment' };
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      return { success: false, error: error.message || 'Payment failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const createPayPalOrder = async (plan: any, planType: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      // @ts-ignore - PayPal SDK loaded via script
      if (typeof paypal === 'undefined') {
        resolve({ success: false, error: 'PayPal SDK not loaded' });
        return;
      }

      // @ts-ignore
      paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },
        fundingSource: undefined, // Allows PayPal AND card payments
        createOrder: (data: any, actions: any) => {
          if (planType === 'lifetime') {
            // One-time payment
            return actions.order.create({
              purchase_units: [{
                description: plan.name,
                amount: {
                  currency_code: plan.currency,
                  value: plan.price,
                },
              }],
              application_context: {
                shipping_preference: 'NO_SHIPPING' // Digital goods, no shipping
              }
            });
          } else {
            // Subscription
            return actions.subscription.create({
              plan_id: plan.planId,
            });
          }
        },
        onApprove: async (data: any, actions: any) => {
          try {
            let details;
            if (planType === 'lifetime') {
              details = await actions.order.capture();
            } else {
              details = await actions.subscription.get();
            }

            // Save premium status
            const premiumData = {
              isPremium: true,
              planType,
              purchaseDate: new Date().toISOString(),
              expiresAt: planType === 'lifetime' ? null : new Date(Date.now() + (planType === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).getTime(),
              orderId: details.id,
            };

            if (Platform.OS === 'web') {
              localStorage.setItem('premium_status', JSON.stringify(premiumData));
            }

            setIsPremium(true);
            resolve({ success: true });
          } catch (error: any) {
            resolve({ success: false, error: error.message });
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          resolve({ success: false, error: 'Payment failed' });
        },
        onCancel: () => {
          resolve({ success: false, error: 'Payment cancelled' });
        },
      }).render('#paypal-button-container');
    });
  };

  const value: PayPalContextType = {
    isPremium,
    isLoading,
    purchasePlan,
    checkPremiumStatus,
  };

  return <PayPalContext.Provider value={value}>{children}</PayPalContext.Provider>;
};
