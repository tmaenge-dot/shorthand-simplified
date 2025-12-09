import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { PremiumLock } from '@/components/PremiumLock';
import { Colors } from '@/constants/theme';
import { phrasesData } from '@/data/phrases';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePayPal } from '@/contexts/PayPalContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function PhrasesScreen() {
  const { isPremium } = usePayPal();
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Show premium lock if not premium
  if (!isPremium) {
    return <PremiumLock feature="Phrases Library" />;
  }

  const filteredPhrases = phrasesData.filter(phrase => {
    const matchesSearch = phrase.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         phrase.shorthandRepresentation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         phrase.usage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#764ba2', '#f093fb', '#667eea']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ThemedView style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <IconSymbol name="quote.bubble" size={28} color="#fff" />
            </View>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>Phrases</ThemedText>
              <ThemedText style={styles.subtitle}>
                🤖 AI-matched phrase-outline pairs
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.aiInfoBox}>
            <IconSymbol name="sparkles" size={14} color="#FFD700" />
            <ThemedText style={styles.aiInfoText}>
              Extracted with usage context from reference
            </ThemedText>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>{filteredPhrases.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Phrases</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>{phrasesData.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Total</ThemedText>
            </View>
          </View>
        </ThemedView>
      </LinearGradient>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              color: Colors[colorScheme ?? 'light'].text,
              backgroundColor: Colors[colorScheme ?? 'light'].background,
              borderColor: Colors[colorScheme ?? 'light'].icon,
            }
          ]}
          placeholder="Search phrases..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {filteredPhrases.map((phrase, index) => (
          <TouchableOpacity key={phrase.id} activeOpacity={0.9}>
            <LinearGradient
              colors={colorScheme === 'dark' 
                ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] 
                : ['#ffffff', '#f8f9fa']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* AI Badge */}
              <View style={styles.aiBadge}>
                <IconSymbol name="sparkles" size={9} color="#FFD700" />
                <ThemedText style={styles.aiBadgeText}>AI</ThemedText>
              </View>
            <ThemedView style={styles.phraseHeader}>
              <ThemedView style={styles.numberBadge}>
                <ThemedText style={styles.numberText}>{index + 1}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.phraseContent}>
                <ThemedText type="defaultSemiBold" style={styles.phrase}>
                  &quot;{phrase.phrase}&quot;
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.representationContainer}>
              <ThemedText style={styles.label}>Shorthand Form</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.shorthand}>
                {phrase.shorthandRepresentation}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.divider} />

            <ThemedView style={styles.detailsSection}>
              <ThemedText style={styles.detailLabel}>How to write:</ThemedText>
              <ThemedText style={styles.description}>
                {phrase.description}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.usageSection}>
              <ThemedText style={styles.detailLabel}>Example usage:</ThemedText>
              <ThemedText style={styles.usage}>
              &quot;{phrase.usage}&quot;
            </ThemedText>
          </ThemedView>
            </LinearGradient>
          </TouchableOpacity>
        ))}        {filteredPhrases.length === 0 && (
          <ThemedView style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>No phrases found</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Try a different search term
            </ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.tipSection}>
          <ThemedText type="defaultSemiBold" style={styles.tipTitle}>
            💡 Pro Tip
          </ThemedText>
          <ThemedText style={styles.tipText}>
            Phrases are written by joining the strokes smoothly without lifting your pen. 
            Practice the most common phrases first to build speed and fluency.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  statsContainer: {
    marginTop: 4,
  },
  statsText: {
    fontSize: 13,
    opacity: 0.6,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 8,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  phraseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  phraseContent: {
    flex: 1,
    justifyContent: 'center',
  },
  phrase: {
    fontSize: 18,
    lineHeight: 24,
  },
  representationContainer: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  shorthand: {
    fontSize: 24,
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginVertical: 12,
  },
  detailsSection: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    opacity: 0.7,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  usageSection: {
    backgroundColor: 'rgba(100, 150, 200, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  usage: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.5,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.4,
  },
  tipSection: {
    backgroundColor: 'rgba(255, 200, 100, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  aiInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  aiInfoText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.95)',
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    gap: 4,
  },
  aiBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
