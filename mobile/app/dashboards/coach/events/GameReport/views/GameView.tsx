import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { RoundReport } from '../../GamingScreen/views/RoundReport';
import { FooterReport } from '../../GamingScreen/views/FooterReport';
import { Team, Role } from '../../model';



const formatSec = (s: number) =>
  `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

export const GameView = () => {
  const { teams_totals, currentRole, round_times } = useStore();
  const { hideGameReport, hideReport } = useStore();

  const role_2 = currentRole
  const role_1 = role_2 === Role.CHASER ? Role.EVADER : Role.CHASER

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#1E2A38',
   // paddingHorizontal: 4,
    paddingBottom: 8,
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
