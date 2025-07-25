import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { RoundReport } from '../views/RoundReport';
import { FooterReport } from '../views/FooterReport';
import { Team, Role } from '../../model';
import { PopupWrapper } from '../../../../../shared/components/PopupWrapper';


const formatSec = (s: number) =>
  `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const GameReport = () => {
  const { gameDate, teams_totals, currentRole, round_times, isGameReport, first_chaser_team } = useStore();
  const { hideGameReport, hideReport } = useStore();

  const titleHeader = 'Dinivrey - ' + formatDate(gameDate)
   
   const role_2 =  first_chaser_team === Team.GREEN ? Role.CHASER : Role.EVADER
   const role_1 = role_2 === Role.CHASER ? Role.EVADER : Role.CHASER

  return (
    <PopupWrapper visible={isGameReport} title={titleHeader} onClose={hideGameReport}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={styles.section}>
            <Text style={styles.text}>Players - {teams_totals[0].amount} </Text>
            <Text style={styles.text}>Players - {teams_totals[1].amount} </Text>
          </View>
                
          <RoundReport round={1} time={formatSec(round_times[1])}
            role_1={role_1} total_1={teams_totals[1].freeded + '+' + teams_totals[1].survived}
            role_2={role_2} total_2={teams_totals[0].caught + '+' + teams_totals[0].bonus}
          />
          <RoundReport round={2} time={formatSec(round_times[1])}
            role_1={role_2} total_1={teams_totals[1].caught + '+' + teams_totals[1].bonus}
            role_2={role_1} total_2={teams_totals[0].freeded + '+' + teams_totals[0].survived}
          />
          <FooterReport/>
        </ScrollView>
      </View>
    </PopupWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#1E2A38',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
