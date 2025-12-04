import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleNavigation = (route: string) => {
    console.log('Navigation button pressed:', route);
    Alert.alert('Button Pressed', `Navigating to: ${route}`);
    try {
      router.push(route as any);
      console.log('Navigation successful to:', route);
    } catch (error) {
      console.error('Navigation failed:', error);
      Alert.alert('Navigation Error', String(error));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#667eea', '#764ba2', '#f093fb']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ThemedView style={styles.header}>
          <View style={styles.aiIconContainer}>
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              style={styles.aiIcon}
            >
              <IconSymbol name="sparkles" size={32} color="#fff" />
            </LinearGradient>
          </View>
          <ThemedText type="title" style={styles.title}>
            AI-Powered Shorthand
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Learn smarter with intelligent recognition
          </ThemedText>
        </ThemedView>
      </LinearGradient>

      <ThemedView style={styles.content}>
        {/* AI Recognition Gateway - Main Feature */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🤖 AI-Powered Learning Gateway
          </ThemedText>
          <ThemedText style={styles.text}>
            Our AI recognition system uses your reference materials to provide instant 
            feedback and guide your learning journey.
          </ThemedText>
          
          <TouchableOpacity 
            onPress={() => handleNavigation('/(tabs)/recognize')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.ctaCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              pointerEvents="none"
            >
              <View style={styles.ctaContent} pointerEvents="none">
                <View style={styles.ctaIconWrapper} pointerEvents="none">
                  <IconSymbol name="camera.fill" size={40} color="#fff" />
                </View>
                <View style={styles.ctaText} pointerEvents="none">
                  <ThemedText style={styles.ctaTitle}>
                    Try AI Recognition
                  </ThemedText>
                  <ThemedText style={styles.ctaSubtitle}>
                    Write a stroke and let AI identify it instantly
                  </ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={24} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ThemedView>

        {/* Quick Stats */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📚 Reference-Based Learning
          </ThemedText>
          <ThemedText style={styles.text}>
            Every lesson, stroke, and outline is extracted from official Pitman 
            Shorthand reference materials. Learn authentic, standard shorthand.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🎯 AI-Enhanced Learning Path
          </ThemedText>
          
          <TouchableOpacity 
            onPress={() => handleNavigation('/(tabs)/recognize')}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={colorScheme === 'dark' ? ['rgba(102, 126, 234, 0.2)', 'rgba(118, 75, 162, 0.2)'] : ['#667eea', '#764ba2']}
              style={[styles.featureCard, styles.aiFeatureCard]}
              pointerEvents="none"
            >
              <View style={styles.featureItem} pointerEvents="none">
                <LinearGradient
                  colors={['#4facfe', '#00f2fe']}
                  style={[styles.featureIcon, styles.aiFeatureIcon]}
                  pointerEvents="none"
                >
                  <IconSymbol name="sparkles" size={28} color="#fff" />
                </LinearGradient>
                <View style={styles.featureText} pointerEvents="none">
                  <ThemedText type="defaultSemiBold" style={styles.aiFeatureTitle}>
                    AI Recognition (Core)
                  </ThemedText>
                  <ThemedText style={styles.featureDescription}>
                    Practice and get instant AI feedback on your strokes
                  </ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => handleNavigation('/(tabs)/strokes')}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={colorScheme === 'dark' ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] : ['#ffffff', '#f8f9fa']}
              style={styles.featureCard}
              pointerEvents="none"
            >
              <View style={styles.featureItem} pointerEvents="none">
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.featureIcon}
                  pointerEvents="none"
                >
                  <IconSymbol name="pencil.line" size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.featureText} pointerEvents="none">
                  <ThemedText type="defaultSemiBold">Strokes</ThemedText>
                  <ThemedText style={styles.featureDescription}>
                    24 consonants, 12 vowels from reference book
                  </ThemedText>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleNavigation('/(tabs)/shortforms')}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={colorScheme === 'dark' ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] : ['#ffffff', '#f8f9fa']}
              style={styles.featureCard}
              pointerEvents="none"
            >
              <View style={styles.featureItem} pointerEvents="none">
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  style={styles.featureIcon}
                  pointerEvents="none"
                >
                  <IconSymbol name="text.badge.checkmark" size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.featureText} pointerEvents="none">
                  <ThemedText type="defaultSemiBold">Shortforms</ThemedText>
                  <ThemedText style={styles.featureDescription}>
                    Master abbreviated forms of common words
                  </ThemedText>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleNavigation('/(tabs)/phrases')}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={colorScheme === 'dark' ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] : ['#ffffff', '#f8f9fa']}
              style={styles.featureCard}
              pointerEvents="none"
            >
              <View style={styles.featureItem} pointerEvents="none">
                <LinearGradient
                  colors={['#4facfe', '#00f2fe']}
                  style={styles.featureIcon}
                  pointerEvents="none"
                >
                  <IconSymbol name="text.quote" size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.featureText} pointerEvents="none">
                  <ThemedText type="defaultSemiBold">Phrases</ThemedText>
                  <ThemedText style={styles.featureDescription}>
                    Practice frequently used phrase combinations
                  </ThemedText>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleNavigation('/(tabs)/outlines')}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={colorScheme === 'dark' ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] : ['#ffffff', '#f8f9fa']}
              style={styles.featureCard}
              pointerEvents="none"
            >
              <View style={styles.featureItem} pointerEvents="none">
                <LinearGradient
                  colors={['#fa709a', '#fee140']}
                  style={styles.featureIcon}
                  pointerEvents="none"
                >
                  <IconSymbol name="book.fill" size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.featureText} pointerEvents="none">
                  <ThemedText type="defaultSemiBold">Outlines</ThemedText>
                  <ThemedText style={styles.featureDescription}>
                    Study complete word representations
                  </ThemedText>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleNavigation('/(tabs)/qa')}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={colorScheme === 'dark' ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'] : ['#ffffff', '#f8f9fa']}
              style={styles.featureCard}
              pointerEvents="none"
            >
              <View style={styles.featureItem} pointerEvents="none">
                <LinearGradient
                  colors={['#30cfd0', '#330867']}
                  style={styles.featureIcon}
                  pointerEvents="none"
                >
                  <IconSymbol name="questionmark.circle.fill" size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.featureText} pointerEvents="none">
                  <ThemedText type="defaultSemiBold">Q&A Guidelines</ThemedText>
                  <ThemedText style={styles.featureDescription}>
                    Get answers to common questions and tips
                  </ThemedText>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            How AI Powers Your Learning
          </ThemedText>
          
          <ThemedView style={styles.principle}>
            <ThemedText type="defaultSemiBold">✨ Instant Recognition</ThemedText>
            <ThemedText style={styles.text}>
              Write any stroke and get immediate AI feedback on accuracy. Our model 
              is trained on authentic Pitman reference materials.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.principle}>
            <ThemedText type="defaultSemiBold">📊 Smart Progress Tracking</ThemedText>
            <ThemedText style={styles.text}>
              AI analyzes your writing patterns and suggests areas for improvement, 
              helping you learn more efficiently.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.principle}>
            <ThemedText type="defaultSemiBold">🎯 Personalized Practice</ThemedText>
            <ThemedText style={styles.text}>
              Get customized exercises based on your skill level and areas that need 
              more practice.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.principle}>
            <ThemedText type="defaultSemiBold">🔍 Complete Outline Analysis</ThemedText>
            <ThemedText style={styles.text}>
              AI recognizes consonants, vowels, diphthongs, and triphthongs in complete 
              word outlines - just like a human expert!
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Your AI-Guided Learning Journey
          </ThemedText>
          <ThemedText style={styles.text}>
            Start with the <ThemedText type="defaultSemiBold">AI Recognition</ThemedText> tab 
            to practice strokes and get instant feedback. Then explore{' '}
            <ThemedText type="defaultSemiBold">Strokes</ThemedText>,{' '}
            <ThemedText type="defaultSemiBold">Shortforms</ThemedText>, and{' '}
            <ThemedText type="defaultSemiBold">Outlines</ThemedText> - all backed by 
            authentic reference materials.
          </ThemedText>
          <ThemedText style={styles.text}>
            The AI learns your style and adapts to help you improve faster than traditional 
            methods alone.
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.section, styles.motivationSection]}>
          <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            style={styles.motivationCard}
          >
            <IconSymbol name="lightbulb.fill" size={32} color="#fff" />
            <ThemedText style={styles.motivationText}>
              &quot;AI + Practice = Mastery&quot;
            </ThemedText>
            <ThemedText style={styles.motivationAuthor}>
              Learn smarter, not just harder
            </ThemedText>
          </LinearGradient>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  aiIconContainer: {
    marginBottom: 16,
  },
  aiIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
    opacity: 0.8,
  },
  ctaCard: {
    borderRadius: 24,
    padding: 24,
    marginTop: 16,
    marginBottom: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ctaIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  aiFeatureCard: {
    borderWidth: 2,
    borderColor: 'rgba(79, 172, 254, 0.3)',
  },
  aiFeatureIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
  },
  aiFeatureTitle: {
    color: '#fff',
  },
  featureCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  featureText: {
    flex: 1,
  },
  featureDescription: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 4,
  },
  principle: {
    marginBottom: 16,
    paddingLeft: 8,
  },
  motivationSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  motivationCard: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  motivationText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#fff',
  },
  motivationAuthor: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  bookQualityBanner: {
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#48bb78',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  bannerIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
  },
  bannerBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  bannerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bannerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
});
