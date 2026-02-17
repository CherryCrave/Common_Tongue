import { StyleSheet, Text } from 'react-native';
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
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Resource Library</Text>
        <Text style={styles.subtitle}>Library of government sponsored EFL programs.</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FF9494',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FF9494',
    fontSize: 16,
    fontFamily: 'Arial',
  },
});
