import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { PremiumLock } from '@/components/PremiumLock';
import { intersectionsData } from '@/data/intersections';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePayPal } from '@/contexts/PayPalContext';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function IntersectionsScreen() {
  const { isPremium } = usePayPal();
  const colorScheme = useColorScheme();

  // Show premium lock if not premium
  if (!isPremium) {
    return <PremiumLock feature="Intersections Guide" />;
  }
  
  // Group intersections by category
  const primaryIntersections = intersectionsData.filter(i => i.category === 'primary');
  const combinationIntersections = intersectionsData.filter(i => i.category === 'combination');
  const extendedIntersections = intersectionsData.filter(i => i.category === 'extended');
  const infoItems = intersectionsData.filter(i => i.category === 'info');

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#FF9800', '#F44336', '#E91E63']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ThemedView style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <IconSymbol name="arrow.triangle.branch" size={28} color="#fff" />
            </View>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>Intersections</ThemedText>
              <ThemedText style={styles.subtitle}>
                🤖 AI-detected positions and patterns
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.aiInfoBox}>
            <IconSymbol name="sparkles" size={14} color="#FFD700" />
            <ThemedText style={styles.aiInfoText}>
              Intersection patterns extracted from reference
            </ThemedText>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>{primaryIntersections.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Primary</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>{combinationIntersections.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Combo</ThemedText>
            </View>
            <View style={styles.statBox}>
              <ThemedText style={styles.statNumber}>{extendedIntersections.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Extended</ThemedText>
            </View>
          </View>
        </ThemedView>
      </LinearGradient>
      
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Intersections</ThemedText>
          <ThemedText style={styles.subtitle}>
            Special strokes written through or close to outlines to represent complete words
          </ThemedText>
        </ThemedView>

        {/* Info Section */}
        {infoItems.map((item) => (
          <ThemedView key={item.id} style={styles.infoBox}>
            {/* AI Badge */}
            <View style={styles.aiBadgeSmall}>
              <IconSymbol name="sparkles" size={8} color="#FFD700" />
              <ThemedText style={styles.aiBadgeTextSmall}>AI</ThemedText>
            </View>
            
            <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
              📋 {item.word}
            </ThemedText>
            <ThemedText style={styles.infoText}>{item.description}</ThemedText>
            <ThemedText style={styles.infoUsage}>{item.usage}</ThemedText>
            {item.examples.map((example, idx) => (
              <ThemedText key={idx} style={styles.ruleItem}>
                • {example}
              </ThemedText>
            ))}
          </ThemedView>
        ))}

        {/* Primary Intersections - The 3 Main Ones */}
        <Collapsible title="⭐ Primary Intersections (The Essential 3)">
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionDescription}>
              These are the three main intersections used in Pitman Shorthand for business writing.
            </ThemedText>
            {primaryIntersections.map((intersection) => (
              <ThemedView key={intersection.id} style={styles.card}>
                <ThemedView style={styles.cardHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.word}>
                    {intersection.word.toUpperCase()}
                  </ThemedText>
                  <ThemedText style={styles.stroke}>
                    Intersected {intersection.intersectedStroke}
                  </ThemedText>
                </ThemedView>
                
                <ThemedView style={styles.cardBody}>
                  <ThemedText style={styles.description}>
                    {intersection.description}
                  </ThemedText>
                  
                  <ThemedText style={styles.label}>Usage:</ThemedText>
                  <ThemedText style={styles.usage}>
                    {intersection.usage}
                  </ThemedText>
                  
                  <ThemedText style={styles.label}>Position:</ThemedText>
                  <ThemedText style={styles.position}>
                    {intersection.position}
                  </ThemedText>
                  
                  <ThemedText style={styles.label}>Examples:</ThemedText>
                  {intersection.examples.map((example, idx) => (
                    <ThemedText key={idx} style={styles.example}>
                      • {example}
                    </ThemedText>
                  ))}
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </Collapsible>

        {/* Combination Intersections */}
        <Collapsible title="🔗 Combination Intersections">
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionDescription}>
              Multiple intersections used together, common in business names.
            </ThemedText>
            {combinationIntersections.map((intersection) => (
              <ThemedView key={intersection.id} style={styles.card}>
                <ThemedView style={styles.cardHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.word}>
                    {intersection.word.toUpperCase()}
                  </ThemedText>
                  <ThemedText style={styles.stroke}>
                    {intersection.intersectedStroke}
                  </ThemedText>
                </ThemedView>
                
                <ThemedView style={styles.cardBody}>
                  <ThemedText style={styles.description}>
                    {intersection.description}
                  </ThemedText>
                  
                  <ThemedText style={styles.label}>Usage:</ThemedText>
                  <ThemedText style={styles.usage}>
                    {intersection.usage}
                  </ThemedText>
                  
                  <ThemedText style={styles.label}>Examples:</ThemedText>
                  {intersection.examples.map((example, idx) => (
                    <ThemedText key={idx} style={styles.example}>
                      • {example}
                    </ThemedText>
                  ))}
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </Collapsible>

        {/* Extended Intersections */}
        <Collapsible title="📍 Extended Intersections">
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionDescription}>
              Additional intersections for addresses, titles, and common terms.
            </ThemedText>
            {extendedIntersections.map((intersection) => (
              <ThemedView key={intersection.id} style={styles.card}>
                <ThemedView style={styles.cardHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.word}>
                    {intersection.word.toUpperCase()}
                  </ThemedText>
                  <ThemedText style={styles.stroke}>
                    Intersected {intersection.intersectedStroke}
                  </ThemedText>
                </ThemedView>
                
                <ThemedView style={styles.cardBody}>
                  <ThemedText style={styles.description}>
                    {intersection.description}
                  </ThemedText>
                  
                  <ThemedText style={styles.label}>Examples:</ThemedText>
                  {intersection.examples.map((example, idx) => (
                    <ThemedText key={idx} style={styles.example}>
                      • {example}
                    </ThemedText>
                  ))}
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </Collapsible>

        <ThemedView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Total Intersections: {intersectionsData.filter(i => i.category !== 'info').length}
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
  aiBadgeSmall: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
    zIndex: 10,
  },
  aiBadgeTextSmall: {
    fontSize: 7,
    fontWeight: '800',
    color: '#FFD700',
    textTransform: 'uppercase',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 12,
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1976d2',
  },
  infoText: {
    marginBottom: 8,
    lineHeight: 20,
  },
  infoUsage: {
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 20,
  },
  ruleItem: {
    marginLeft: 8,
    marginTop: 4,
    lineHeight: 20,
  },
  section: {
    padding: 16,
  },
  sectionDescription: {
    marginBottom: 16,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  word: {
    fontSize: 18,
    color: '#1976d2',
  },
  stroke: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  cardBody: {
    padding: 12,
  },
  description: {
    marginBottom: 12,
    lineHeight: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  usage: {
    marginBottom: 8,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  position: {
    marginBottom: 8,
    lineHeight: 20,
  },
  example: {
    marginLeft: 8,
    marginTop: 4,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontStyle: 'italic',
    opacity: 0.6,
  },
});
