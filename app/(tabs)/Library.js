import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TEACHING_PROGRAMS=[
  {
    id: 1,
    name: 'JET Programme',
    country: 'Japan',
    fullName: 'Japan Exchange and Teaching Programme',
    description: 'Government-sponsored program placing participants in schools and community organizations throughout Japan.',
    requirements: [
      'Bachelor\'s degree',
      'Native English speaker or high English proficiency',
      'Under 40 years old (in most cases)',
      'Citizen of participating country'
    ],
    benefits: [
      'Competitive salary (¥3.36M - ¥3.96M annually)',
      'Flight allowance',
      'Health insurance',
      'Paid vacation',
      'Professional development opportunities'
    ],
    applicationPeriod: 'October - November (for August departure)',
    website: 'https://jetprogramme.org',
    iconColor: '#FF6B6B'
  },
  {
    id: 2,
    name: 'EPIK',
    country: 'South Korea',
    fullName: 'English Program in Korea',
    description: 'Government program recruiting native English speakers to teach in Korean public schools.',
    requirements: [
      'Bachelor\'s degree from accredited university',
      'Native English speaker',
      'Clean criminal background check',
      'Health check clearance'
    ],
    benefits: [
      'Monthly salary (1.8M - 2.7M KRW)',
      'Furnished housing or housing stipend',
      'Round-trip airfare',
      'Settlement allowance',
      'Severance pay (1 month salary)',
      'Health insurance (50% covered)'
    ],
    applicationPeriod: 'February/August intakes',
    website: 'https://www.epik.go.kr',
    iconColor: '#24e0d4'
  },
  {
    id: 3,
    name: 'NET Scheme',
    country: 'Hong Kong',
    fullName: 'Native English-Speaking Teacher Scheme',
    description: 'EDB initiative bringing Native English Teachers to improve English language teaching in Hong Kong schools.',
    requirements: [
      'Bachelor\'s degree in English or related field',
      'Recognized teacher qualification',
      'Native English speaker',
      'Teaching experience preferred'
    ],
    benefits: [
      'Monthly salary (HK$30,165 - HK$51,380)',
      'Gratuity payment after contract',
      'Baggage allowance',
      'Annual leave',
      'Medical benefits'
    ],
    applicationPeriod: 'Rolling applications',
    website: 'https://www.edb.gov.hk/net',
    iconColor: '#95E1D3'
  }
];

export default function ResourceLibraryScreen() {

  const openWebsite = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Cannot open link', 'Your device cannot open this URL.');
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      console.error('Failed to open URL:', err);
      Alert.alert('Error', 'Failed to open the website. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style = {styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Resource Library</Text>
          <Text style={styles.subtitle}>Library of government sponsored EFL programs.</Text>
        </View>

        {TEACHING_PROGRAMS.map((program) => (
          <View key={program.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{program.name}</Text>
              <Text style={styles.cardSubtitle}>{program.country}</Text>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.fullName}>{program.fullName}</Text>
              <Text style={styles.description}>{program.description}</Text>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Requirements</Text>
                {program.requirements.map((item, index) => (
                  <Text key={`${program.id}-req-${index}`} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Benefits</Text>
                {program.benefits.map((item, index) => (
                  <Text key={`${program.id}-ben-${index}`} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Application period</Text>
                <Text style={styles.infoText}>{program.applicationPeriod}</Text>
              </View>

              <TouchableOpacity
                style={styles.websiteButton}
                onPress={() => openWebsite(program.website)}
              >
                <Text style={styles.websiteButtonText}>Official website</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#FF9494',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 5,
  },
  subtitle: {
    color: '#FF9494',
    fontSize: 16,
    fontFamily: 'Arial',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFB4B4',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFF5E4',
    borderBottomColor: '#FFB4B4',
    borderBottomWidth: 2,
  },
  cardTitle: {
    color: '#FF9494',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  cardSubtitle: {
    color: '#FF9494',
    fontSize: 14,
    fontFamily: 'Arial',
    marginTop: 2,
  },
  cardBody: {
    padding: 16,
  },
  fullName: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FF9494',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listItem: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  infoText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  websiteButton: {
    backgroundColor: '#FF9494',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  websiteButtonText: {
    color: '#FFF5E4',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
