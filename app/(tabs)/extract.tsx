import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ShortformInputScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [word, setWord] = useState('');
  const [description, setDescription] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [category, setCategory] = useState('common');
  const [savedForms, setSavedForms] = useState<any[]>([]);

  const categories = ['common', 'pronouns', 'verbs', 'business', 'special'];

  const handleSave = () => {
    if (!word.trim()) {
      Alert.alert('Error', 'Please enter a word');
      return;
    }

    const newForm = {
      id: `sf_${Date.now()}`,
      word: word.trim(),
      description: description.trim(),
      page: pageNumber.trim(),
      category,
      dateAdded: new Date().toISOString(),
    };

    setSavedForms([...savedForms, newForm]);
    
    // Save to file
    saveToFile([...savedForms, newForm]);
    
    // Clear form
    setWord('');
    setDescription('');
    setPageNumber('');
    
    Alert.alert('Success', `Shortform "${newForm.word}" saved!`);
  };

  const saveToFile = async (forms: any[]) => {
    try {
      const tsContent = generateTypeScriptFile(forms);
      const json = JSON.stringify(forms, null, 2);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  const generateTypeScriptFile = (forms: any[]) => {
    const formsArray = forms.map(form => `  {
    id: '${form.id}',
    word: '${form.word}',
    shorthandRepresentation: 'See page ${form.page}',
    description: '${form.description || 'Pitman shortform'}',
    category: '${form.category}',
    source: 'Shorthand Book p.${form.page}',
  }`).join(',\n');

    return `// Extracted Pitman Shortforms from Textbook
// Generated: ${new Date().toISOString()}

import { Shortform } from '@/types/shorthand';

export const extractedShortforms: Shortform[] = [
${formsArray}
];

export default extractedShortforms;
`;
  };

  const exportData = () => {
    const json = JSON.stringify(savedForms, null, 2);
    Alert.alert(
      'Export Ready',
      `${savedForms.length} shortforms ready to export.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={isDark ? ['#1a1a2e', '#16213e'] : ['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <IconSymbol name="pencil.circle.fill" size={40} color="#ffffff" />
        <ThemedText style={styles.headerTitle}>Extract Shortforms</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Input shortforms from the textbook
        </ThemedText>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        {/* Instructions */}
        <View style={[styles.instructionCard, isDark && styles.cardDark]}>
          <ThemedText style={styles.instructionTitle}>📖 How to Use:</ThemedText>
          <ThemedText style={styles.instructionText}>
            1. Open the Shorthand Book PDF from Resources tab{'\n'}
            2. Find the shortforms section{'\n'}
            3. Enter each shortform word below{'\n'}
            4. Add the page number for reference{'\n'}
            5. Click Save to add to the list{'\n'}
            6. Export when done to update the app
          </ThemedText>
        </View>

        {/* Input Form */}
        <View style={[styles.formCard, isDark && styles.cardDark]}>
          <ThemedText style={styles.formTitle}>Add Shortform</ThemedText>
          
          <ThemedText style={styles.label}>Word *</ThemedText>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            value={word}
            onChangeText={setWord}
            placeholder="e.g., I, you, have, shall..."
            placeholderTextColor="#999"
          />

          <ThemedText style={styles.label}>Description / Rule</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea, isDark && styles.inputDark]}
            value={description}
            onChangeText={setDescription}
            placeholder="How it's written in Pitman (optional)"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />

          <ThemedText style={styles.label}>Page Number</ThemedText>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            value={pageNumber}
            onChangeText={setPageNumber}
            placeholder="e.g., 45"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <ThemedText style={styles.label}>Category</ThemedText>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={category === cat ? ['#667eea', '#764ba2'] : ['#ddd', '#eee']}
                  style={styles.categoryButton}
                >
                  <ThemedText 
                    style={[styles.categoryText, category === cat && styles.categoryTextActive]}
                  >
                    {cat}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.saveButton}
            >
              <IconSymbol name="checkmark.circle.fill" size={24} color="#ffffff" />
              <ThemedText style={styles.saveButtonText}>Save Shortform</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Saved Items */}
        {savedForms.length > 0 && (
          <>
            <View style={styles.statsContainer}>
              <ThemedText style={styles.statsTitle}>
                ✅ Saved: {savedForms.length} shortforms
              </ThemedText>
              
              <TouchableOpacity onPress={exportData} activeOpacity={0.7}>
                <LinearGradient
                  colors={['#4facfe', '#00f2fe']}
                  style={styles.exportButton}
                >
                  <IconSymbol name="square.and.arrow.up.fill" size={20} color="#ffffff" />
                  <ThemedText style={styles.exportButtonText}>Export All</ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
              {savedForms.map((form, index) => (
                <View key={form.id} style={[styles.listItem, isDark && styles.cardDark]}>
                  <View style={styles.listItemHeader}>
                    <ThemedText style={styles.listItemWord}>{form.word}</ThemedText>
                    <View style={[styles.badge, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
                      <ThemedText style={styles.badgeText}>p.{form.page}</ThemedText>
                    </View>
                  </View>
                  {form.description && (
                    <ThemedText style={styles.listItemDesc}>{form.description}</ThemedText>
                  )}
                  <ThemedText style={styles.listItemCategory}>
                    Category: {form.category}
                  </ThemedText>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={{ height: 40 }} />
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  instructionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  exportButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  listItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listItemWord: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  listItemDesc: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 6,
  },
  listItemCategory: {
    fontSize: 12,
    opacity: 0.5,
    fontStyle: 'italic',
  },
});
