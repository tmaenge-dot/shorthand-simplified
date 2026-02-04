import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getAllPurchases, getPurchaseStats } from '@/services/firebase';

export default function AdminDashboard() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [purchasesResult, statsResult] = await Promise.all([
        getAllPurchases(),
        getPurchaseStats(),
      ]);

      if (purchasesResult.success) {
        setPurchases(purchasesResult.purchases);
      }

      if (statsResult.success) {
        setStats(statsResult.stats);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshData = () => {
    setRefreshing(true);
    loadData();
  };

  const exportPurchases = () => {
    const csv = [
      ['Date', 'Email', 'Plan Type', 'Amount', 'Status', 'PayPal Order ID'].join(','),
      ...purchases.map((p) =>
        [
          new Date(p.purchaseDate?.toDate?.() || p.purchaseDate).toISOString(),
          p.email,
          p.planType,
          `$${p.amount}`,
          p.status,
          p.paypalOrderId,
        ].join(',')
      ),
    ].join('\n');

    // For web, create download
    if (Platform.OS === 'web') {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
      element.setAttribute('download', `purchases-${new Date().toISOString().split('T')[0]}.csv`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  if (Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.error}>This feature is only available on web</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#0A7EA4" />
        </Pressable>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Pressable onPress={refreshData} disabled={refreshing}>
          <Ionicons name={refreshing ? 'hourglass' : 'refresh'} size={24} color="#0A7EA4" />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        {stats && (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>${stats.totalRevenue.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Total Revenue</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalPurchases}</Text>
              <Text style={styles.statLabel}>Total Purchases</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.completedPurchases}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.failedPurchases}</Text>
              <Text style={styles.statLabel}>Failed</Text>
            </View>
          </View>
        )}

        {/* Plan Breakdown */}
        {stats && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sales by Plan</Text>
            <View style={styles.planRow}>
              <Text>Monthly ($4.99)</Text>
              <Text style={styles.bold}>{stats.byPlan.monthly} sales</Text>
            </View>
            <View style={styles.planRow}>
              <Text>Annual ($29.99)</Text>
              <Text style={styles.bold}>{stats.byPlan.annual} sales</Text>
            </View>
            <View style={styles.planRow}>
              <Text>Lifetime ($49.99)</Text>
              <Text style={styles.bold}>{stats.byPlan.lifetime} sales</Text>
            </View>
          </View>
        )}

        {/* Export Button */}
        <Pressable style={styles.exportButton} onPress={exportPurchases}>
          <Ionicons name="download" size={20} color="white" />
          <Text style={styles.exportButtonText}>Export as CSV</Text>
        </Pressable>

        {/* Purchases List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Purchases</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0A7EA4" />
          ) : purchases.length === 0 ? (
            <Text style={styles.emptyText}>No purchases yet</Text>
          ) : (
            <View>
              {purchases.map((purchase, index) => (
                <View key={index} style={styles.purchaseCard}>
                  <View style={styles.purchaseHeader}>
                    <Text style={styles.purchaseEmail}>{purchase.email}</Text>
                    <Text
                      style={[
                        styles.status,
                        purchase.status === 'completed' ? styles.statusCompleted : styles.statusFailed,
                      ]}
                    >
                      {purchase.status.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.purchaseDetails}>
                    <View style={styles.detail}>
                      <Text style={styles.detailLabel}>Plan:</Text>
                      <Text style={styles.detailValue}>
                        {purchase.planType.charAt(0).toUpperCase() + purchase.planType.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.detailLabel}>Amount:</Text>
                      <Text style={styles.detailValue}>${purchase.amount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.detailLabel}>Date:</Text>
                      <Text style={styles.detailValue}>
                        {new Date(purchase.purchaseDate?.toDate?.() || purchase.purchaseDate).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.detailLabel}>PayPal Order:</Text>
                      <Text style={[styles.detailValue, styles.monospace]}>{purchase.paypalOrderId}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A7EA4',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bold: {
    fontWeight: 'bold',
    color: '#0A7EA4',
  },
  exportButton: {
    flexDirection: 'row',
    backgroundColor: '#0A7EA4',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  exportButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  purchaseCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0A7EA4',
  },
  purchaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  purchaseEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusCompleted: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusFailed: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  purchaseDetails: {
    gap: 8,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  monospace: {
    fontFamily: 'monospace',
    fontSize: 11,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
