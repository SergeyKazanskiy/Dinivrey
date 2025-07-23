import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { RoundReport } from '../views/RoundReport';
import { FooterReport } from '../views/FooterReport';
import { Team, Role } from '../../model';
import { LinearGradient } from 'expo-linear-gradient';


const formatSec = (s: number) =>
  `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;


export const GameReport = () => {
  const { gameDate, teams_totals, currentRole, round_times } = useStore();
  const { hideGameReport } = useStore();

  const role_2 = currentRole
  const role_1 = role_2 === Role.CHASER ? Role.EVADER : Role.CHASER

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dinivrey - {gameDate}</Text>
        <Pressable onPress={hideGameReport}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
      </View>
     
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <RoundReport round={1} time={formatSec(round_times[1])}
          role_1={role_2} total_1={teams_totals[0].freeded + '+' + teams_totals[0].survived}
          role_2={role_1} total_2={teams_totals[0].caught + '+' + teams_totals[0].bonus}
        />
        <RoundReport round={2} time={formatSec(round_times[1])}
          role_1={role_2} total_1={teams_totals[1].caught + '+' + teams_totals[1].bonus}
          role_2={role_1} total_2={teams_totals[1].freeded + '+' + teams_totals[1].survived}
        />
        <FooterReport/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  capsule: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  close: {
    color: 'white',
    fontSize: 18,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  summary: {
    marginTop: 24,
    alignItems: 'center',
  },
  winner: {
    color: 'gold',
    fontSize: 20,
    fontWeight: 'bold',
  },
  score: {
    color: 'white',
    marginTop: 4,
  },
});
