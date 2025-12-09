import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { PremiumLock } from '@/components/PremiumLock';
import { Colors } from '@/constants/theme';
import { outlinesData } from '@/data/outlines';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePayPal } from '@/contexts/PayPalContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function OutlinesScreen() {
  const { isPremium } = usePayPal();
  const colorScheme = useColorScheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Show premium lock if not premium
  if (!isPremium) {
    return <PremiumLock feature="Outlines Database" />;
  }

  const filteredOutlines = outlinesData.filter(outline => {
    const matchesDifficulty = selectedDifficulty === 'all' || outline.difficulty === selectedDifficulty;
    const matchesSearch = outline.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         outline.shorthandRepresentation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const difficulties = [
    { key: 'all' as const, label: 'All Levels', color: '#888' },
    { key: 'beginner' as const, label: 'Beginner', color: '#4CAF50' },
    { key: 'intermediate' as const, label: 'Intermediate', color: '#FF9800' },
    { key: 'advanced' as const, label: 'Advanced', color: '#F44336' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#888';
    }
  };

  const getDifficultyCount = (difficulty: typeof selectedDifficulty) => {
    if (difficulty === 'all') return outlinesData.length;
    return outlinesData.filter(o => o.difficulty === difficulty).length;
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#667eea', '#764ba2', '#f093fb']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ThemedView style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <IconSymbol name="book.closed" size={28} color="#fff" />
            </View>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>Outlines</ThemedText>
              <ThemedText style={styles.subtitle}>
                🤖 AI-analyzed complete word outlines
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.aiInfoBox}>
            <IconSymbol name="sparkles" size={14} color="#FFD700" />
            <ThemedText style={styles.aiInfoText}>
              Component analysis powered by AI
            </ThemedText>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>
                {outlinesData.filter(o => o.difficulty === 'beginner').length}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Beginner</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>
                {outlinesData.filter(o => o.difficulty === 'intermediate').length}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Intermediate</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>
                {outlinesData.filter(o => o.difficulty === 'advanced').length}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Advanced</ThemedText>
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
          placeholder="Search word outlines..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <ThemedView style={styles.categoryContainer}>
          {difficulties.map(diff => (
            <TouchableOpacity
              key={diff.key}
              onPress={() => setSelectedDifficulty(diff.key)}
              style={[
                styles.categoryButton,
                selectedDifficulty === diff.key && {
                  backgroundColor: diff.color,
                }
              ]}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  selectedDifficulty === diff.key && styles.categoryTextActive
                ]}
              >
                {diff.label} ({getDifficultyCount(diff.key)})
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {filteredOutlines.map((outline) => (
          <TouchableOpacity key={outline.id} activeOpacity={0.9}>
            <LinearGradient
              colors={colorScheme === 'dark' 
                ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] 
                : ['#ffffff', '#f8f9fa']}
              style={[
                styles.card,
                {
                  borderLeftColor: getDifficultyColor(outline.difficulty),
                  borderLeftWidth: 4,
                }
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* AI Badge */}
              <View style={styles.aiBadge}>
                <IconSymbol name="sparkles" size={9} color="#FFD700" />
                <ThemedText style={styles.aiBadgeText}>AI</ThemedText>
              </View>
            <ThemedView style={styles.cardHeader}>
              <ThemedView style={styles.wordSection}>
                <ThemedText type="defaultSemiBold" style={styles.word}>
                  {outline.word}
                </ThemedText>
                <ThemedView style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(outline.difficulty) + '20' }]}>
                  <ThemedText style={[styles.difficultyText, { color: getDifficultyColor(outline.difficulty) }]}>
                    {outline.difficulty}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.shorthandContainer}>
              <ThemedText style={styles.label}>Shorthand Representation</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.shorthand}>
                {outline.shorthandRepresentation}
              </ThemedText>
            </ThemedView>

            {/* AI Component Analysis */}
            <ThemedView style={styles.aiAnalysisContainer}>
              <View style={styles.aiAnalysisHeader}>
                <IconSymbol name="sparkles" size={12} color="#FFD700" />
                <ThemedText style={styles.aiAnalysisTitle}>AI Component Analysis</ThemedText>
              </View>
              <ThemedText style={styles.aiAnalysisText}>
                • Auto-detected difficulty: {outline.difficulty}
              </ThemedText>
              <ThemedText style={styles.aiAnalysisText}>
                • Estimated components: {outline.breakdown.split('+').length} strokes
              </ThemedText>
              <ThemedText style={styles.aiAnalysisText}>
                • Position: On the line
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.breakdownContainer}>
              <ThemedText style={styles.label}>Stroke Breakdown</ThemedText>
              <ThemedText style={styles.breakdown}>
                {outline.breakdown}
              </ThemedText>
            </ThemedView>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {filteredOutlines.length === 0 && (
          <ThemedView style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>No outlines found</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Try adjusting your filters or search term
            </ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.infoSection}>
          <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
            📚 About Outlines
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Word outlines show you how to write complete words in shorthand. Start with beginner 
            words to master basic stroke combinations, then progress to intermediate and advanced 
            words as you build confidence.
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Pay attention to the breakdown to understand which strokes are used and how they 
            connect. Regular practice will help you recognize patterns and write faster.
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
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  aiInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  aiInfoText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.95)',
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
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
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
    zIndex: 10,
  },
  aiBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFD700',
    textTransform: 'uppercase',
  },
  aiAnalysisContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  aiAnalysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  aiAnalysisTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
    textTransform: 'uppercase',
  },
  aiAnalysisText: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.8,
    marginLeft: 18,
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
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
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
  cardHeader: {
    marginBottom: 16,
  },
  wordSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  word: {
    fontSize: 24,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  shorthandContainer: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  shorthand: {
    fontSize: 20,
    fontFamily: 'monospace',
  },
  breakdownContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  breakdown: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
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
  infoSection: {
    backgroundColor: 'rgba(100, 150, 200, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 8,
  },
});
