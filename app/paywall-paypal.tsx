import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePayPal } from '../contexts/PayPalContext';

export default function PaywallScreen() {
  const { isPremium, isLoading, purchasePlan } = usePayPal();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'lifetime'>('annual');
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    // Load PayPal SDK on web with card support
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const script = document.createElement('script');
      // Enable card payments + PayPal + Venmo
      script.src = `https://www.paypal.com/sdk/js?client-id=AYVkgS2QatdJWVAlCbu3u031NIjkvFvdJ0x86F0e6IMgdC3w4-SphYJalN2TvlPHm-hIKAafSE-busGR&vault=true&intent=subscription&disable-funding=paylater&enable-funding=card,venmo`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const plans = [
    {
      id: 'monthly' as const,
      name: 'Monthly',
      price: '$4.99',
      period: '/month',
      savings: null,
      popular: false,
    },
    {
      id: 'annual' as const,
      name: 'Annual',
      price: '$29.99',
      period: '/year',
      savings: 'Save 50%',
      popular: true,
    },
    {
      id: 'lifetime' as const,
      name: 'Lifetime',
      price: '$49.99',
      period: 'one-time',
      savings: 'Best Value',
      popular: false,
    },
  ];

  const premiumFeatures = [
    'All 45 stroke lessons with audio pronunciation',
    'Complete phrase library (1,000+ phrases)',
    'Stroke recognition practice mode',
    'Shortform dictionary & combinations',
    'Offline access to all content',
    'Ad-free experience',
    'Priority support',
    'Lifetime updates',
  ];

  const handlePurchase = async () => {
    if (Platform.OS !== 'web') {
      alert('Please use the web version to complete your purchase at https://tmaenge-dot.github.io/shorthand-simplified/');
      return;
    }

    setPurchasing(true);
    const result = await purchasePlan(selectedPlan);
    setPurchasing(false);

    if (result.success) {
      alert('Purchase successful! Thank you for going premium! 🎉');
      router.back();
    } else {
      alert(result.error || 'Purchase failed. Please try again.');
    }
  };

  if (isPremium) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          <Text style={styles.successTitle}>You're Premium! 🎉</Text>
          <Text style={styles.successText}>
            You have access to all premium features.
          </Text>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Continue Learning</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#333" />
        </Pressable>
        <Text style={styles.title}>Unlock Premium</Text>
        <Text style={styles.subtitle}>Master Shorthand Faster</Text>
      </View>

      {/* Plan Selection */}
      <View style={styles.plansContainer}>
        {plans.map((plan) => (
          <Pressable
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.planCardSelected,
              plan.popular && styles.planCardPopular,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <View style={styles.radioButton}>
                {selectedPlan === plan.id && <View style={styles.radioButtonInner} />}
              </View>
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
              </View>
              {plan.savings && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>{plan.savings}</Text>
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </View>

      {/* Features List */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Premium Features:</Text>
        {premiumFeatures.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Payment Methods Notice */}
      <View style={styles.paymentMethodsNotice}>
        <Text style={styles.paymentMethodsTitle}>💳 Multiple Payment Options:</Text>
        <View style={styles.paymentMethodsList}>
          <View style={styles.paymentMethodItem}>
            <Ionicons name="card" size={20} color="#2196F3" />
            <Text style={styles.paymentMethodText}>Credit/Debit Cards</Text>
          </View>
          <View style={styles.paymentMethodItem}>
            <Ionicons name="logo-paypal" size={20} color="#0070BA" />
            <Text style={styles.paymentMethodText}>PayPal Account</Text>
          </View>
          <View style={styles.paymentMethodItem}>
            <Ionicons name="wallet" size={20} color="#00457C" />
            <Text style={styles.paymentMethodText}>Venmo</Text>
          </View>
        </View>
        <Text style={styles.paymentMethodsSubtext}>
          All payments go directly to the developer's PayPal account
        </Text>
      </View>

      {/* PayPal Button Container */}
      {Platform.OS === 'web' && (
        <View style={styles.paypalContainer}>
          <Text style={styles.paypalInstructions}>
            Choose your payment method below:
          </Text>
          <div id="paypal-button-container" style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}></div>
        </View>
      )}

      {/* Purchase Button */}
      <Pressable
        style={[styles.purchaseButton, purchasing && styles.purchaseButtonDisabled]}
        onPress={handlePurchase}
        disabled={purchasing || isLoading}
      >
        {purchasing || isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.purchaseButtonText}>
            {Platform.OS === 'web' ? 'Choose Payment Method Above' : 'Continue on Web'}
          </Text>
        )}
      </Pressable>

      {/* Secure Payment Notice */}
      <View style={styles.secureNotice}>
        <Ionicons name="shield-checkmark" size={16} color="#666" />
        <Text style={styles.secureText}>Secure checkout - No PayPal account required</Text>
      </View>

      {/* Terms */}
      <Text style={styles.terms}>
        All payments are securely processed through PayPal. You can pay with credit/debit cards or your PayPal account.
        Funds go directly to the developer's PayPal account. Subscriptions automatically renew unless cancelled.
        Manage subscriptions anytime in your PayPal account or payment method.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  plansContainer: {
    padding: 20,
    gap: 12,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#f0f8ff',
  },
  planCardPopular: {
    borderColor: '#4CAF50',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 20,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  planPeriod: {
    fontSize: 14,
    color: '#666',
  },
  savingsBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    color: '#F57C00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuresContainer: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 16,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  paymentMethodsNotice: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  paymentMethodsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  paymentMethodsList: {
    gap: 10,
    marginBottom: 12,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#555',
  },
  paymentMethodsSubtext: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 8,
  },
  paypalContainer: {
    padding: 20,
    paddingTop: 10,
  },
  paypalInstructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  purchaseButton: {
    backgroundColor: '#0070BA',
    margin: 20,
    marginTop: 10,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    opacity: 0.6,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  secureText: {
    fontSize: 14,
    color: '#666',
  },
  terms: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    lineHeight: 18,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    paddingTop: 120,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
