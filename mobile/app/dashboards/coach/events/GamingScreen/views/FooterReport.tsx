import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { LinearGradient } from 'expo-linear-gradient';


export function FooterReport() {
  const { gameDate, teams_totals, currentRole, round_times } = useStore();

  return (
    <LinearGradient colors={['#A90F11', '#15803d']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      style={{flexDirection: 'row', justifyContent: 'space-around'}}
    >
      <View style={styles.summary}>
        <Text style={styles.winner}>🏆</Text>
        <Text style={styles.score}>{teams_totals[0].info.points}</Text>
        <Text style={styles.score}>{teams_totals[0].info.tags}</Text>
        <Text style={styles.score}>{teams_totals[0].info.rescues}</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.winner}>🏆</Text>
        <Text style={styles.score}>{teams_totals[1].info.points}</Text>
        <Text style={styles.score}>{teams_totals[1].info.tags}</Text>
        <Text style={styles.score}>{teams_totals[1].info.rescues}</Text>
      </View>
    </LinearGradient>
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
