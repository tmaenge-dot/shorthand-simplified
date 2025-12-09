import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { PremiumLock } from '@/components/PremiumLock';
import { Colors } from '@/constants/theme';
import { shortformsData } from '@/data/shortforms';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePayPal } from '@/contexts/PayPalContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ShortformsScreen() {
  const { isPremium } = usePayPal();
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'common' | 'pronouns' | 'verbs' | 'business' | 'legal' | 'medical' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Show premium lock if not premium
  if (!isPremium) {
    return <PremiumLock feature="Shortforms Library" />;
  }

  const filteredShortforms = shortformsData.filter(shortform => {
    const matchesCategory = selectedCategory === 'all' || shortform.category === selectedCategory;
    const matchesSearch = shortform.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shortform.shorthandRepresentation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { key: 'all' as const, label: 'All' },
    { key: 'common' as const, label: 'Common' },
    { key: 'pronouns' as const, label: 'Pronouns' },
    { key: 'verbs' as const, label: 'Verbs' },
    { key: 'business' as const, label: 'Business' },
    { key: 'special' as const, label: 'Special' },
  ];

  const getCategoryCount = (category: typeof selectedCategory) => {
    if (category === 'all') return shortformsData.length;
    return shortformsData.filter(s => s.category === category).length;
  };

  return (
    <ThemedView style={styles.container}>
      {/* AI-Enhanced Header */}
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#f093fb', '#764ba2', '#667eea']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <IconSymbol name="text.badge.star" size={28} color="#fff" />
            </View>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>Shortforms</ThemedText>
              <ThemedText style={styles.subtitle}>
                🤖 Auto-extracted and categorized by AI
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.aiExtractionInfo}>
            <IconSymbol name="sparkles" size={14} color="#FFD700" />
            <ThemedText style={styles.aiExtractionText}>
              {shortformsData.length} shortforms from official Pitman reference
            </ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerSubtext}>
          Abbreviated forms of common words
        </ThemedText>
      </ThemedView>

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
          placeholder="Search shortforms..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <View style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.key}
              onPress={() => setSelectedCategory(category.key)}
              style={[
                styles.categoryButton,
                selectedCategory === category.key && {
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                }
              ]}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  selectedCategory === category.key && styles.categoryTextActive
                ]}
              >
                {category.label} ({getCategoryCount(category.key)})
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {filteredShortforms.map((shortform) => (
          <TouchableOpacity key={shortform.id} activeOpacity={0.9}>
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

              <View style={styles.cardContent}>
              <View style={styles.wordSection}>
                <ThemedText style={styles.label}>Word</ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.word}>
                  {shortform.word}
                </ThemedText>
              </View>

              <View style={styles.arrowContainer}>
                <ThemedText style={styles.arrow}>→</ThemedText>
              </View>

              <View style={styles.shorthandSection}>
                <ThemedText style={styles.label}>Shorthand</ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.shorthand}>
                  {shortform.shorthandRepresentation}
                </ThemedText>
              </View>
            </View>

            <ThemedText style={styles.description}>
              {shortform.description}
            </ThemedText>

            <View style={styles.categoryBadge}>
              <ThemedText style={styles.categoryBadgeText}>
                {shortform.category.charAt(0).toUpperCase() + shortform.category.slice(1)}
              </ThemedText>
            </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {filteredShortforms.length === 0 && (
          <ThemedView style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>No shortforms found</ThemedText>
          </ThemedView>
        )}
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
  aiExtractionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  aiExtractionText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.95)',
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerSubtext: {
    fontSize: 14,
    opacity: 0.7,
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  wordSection: {
    flex: 1,
  },
  shorthandSection: {
    flex: 1,
  },
  arrowContainer: {
    paddingHorizontal: 12,
  },
  arrow: {
    fontSize: 24,
    opacity: 0.5,
  },
  label: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  word: {
    fontSize: 18,
  },
  shorthand: {
    fontSize: 20,
    fontFamily: 'monospace',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.5,
  },
});
