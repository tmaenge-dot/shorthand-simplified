import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface PremiumLockProps {
  feature: string;
}

export const PremiumLock: React.FC<PremiumLockProps> = ({ feature }) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.lockCard}>
        <IconSymbol name="lock.fill" size={64} color="#FFD700" />
        
        <Text style={styles.title}>Premium Feature</Text>
        <Text style={styles.subtitle}>
          Unlock {feature} and all premium content
        </Text>

        <View style={styles.featureList}>
          <FeatureItem text="Complete Shortforms Library" />
          <FeatureItem text="Phrases & Combinations" />
          <FeatureItem text="Full Outlines Database" />
          <FeatureItem text="Intersections Guide" />
          <FeatureItem text="Advanced Tools" />
          <FeatureItem text="No Ads, Forever" />
        </View>

        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() => router.push('/paywall-paypal')}
        >
          <IconSymbol name="crown.fill" size={24} color="#FFD700" />
          <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
        </TouchableOpacity>

        <Text style={styles.priceHint}>Starting at $4.99/month</Text>
      </LinearGradient>
    </View>
  );
};

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <View style={styles.featureItem}>
    <IconSymbol name="star.fill" size={16} color="#FFD700" />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  lockCard: {
    width: '100%',
    maxWidth: 400,
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  featureList: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 12,
    marginBottom: 12,
  },
  upgradeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  priceHint: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
