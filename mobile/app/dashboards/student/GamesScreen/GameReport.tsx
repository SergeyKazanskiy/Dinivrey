import { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { useStore } from '../store';
import { RoundReport } from '../GamingScreen/views/RoundReport';
import { FooterReport } from '../GamingScreen/views/FooterReport';
import { Team, Role } from '../model';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { CustomNavbar } from '../../../shared/components/CustomNavbar';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatSec = (s: number) =>
  `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;


const GameReport = () => {
  const { teams_totals, currentRole, round_times, gameDate, game_report_id } = useStore();
  const { loadGameReport } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadGameReport(game_report_id);
    }, [])
  );

  const router = useRouter();
  const navigation = useNavigation();

  const role_2 = currentRole
  const role_1 = role_2 === Role.CHASER ? Role.EVADER : Role.CHASER

  const titleHeader = 'Dinivrey - ' + formatDate(gameDate)

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push('/dashboards/student/GamesScreen'); 
    }
  };

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title={titleHeader} onClick={handleBack}/>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={styles.section}>
            <Text style={styles.text}>Players - {teams_totals[0].amount} </Text>
            <Text style={styles.text}>Players - {teams_totals[1].amount} </Text>
          </View>
                
          <RoundReport round={1} time={formatSec(round_times[1])}
            role_1={role_1} total_1={teams_totals[0].freeded + '+' + teams_totals[0].survived}
            role_2={role_2} total_2={teams_totals[0].caught + '+' + teams_totals[0].bonus}
          />
          <RoundReport round={2} time={formatSec(round_times[1])}
            role_1={role_2} total_1={teams_totals[1].caught + '+' + teams_totals[1].bonus}
            role_2={role_1} total_2={teams_totals[1].freeded + '+' + teams_totals[1].survived}
          />
          <FooterReport/>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
    marginRight: 48,
  },
  container: {
    // flex: 1,
    // width: '100%',
    // paddingBottom: 8,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#ddd',
    fontWeight: '500',
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});

export default GameReport;