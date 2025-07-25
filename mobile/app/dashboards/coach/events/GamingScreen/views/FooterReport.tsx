import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { LinearGradient } from 'expo-linear-gradient';
import { Team } from '../../model';


function formatWinnerTitle(team: Team, winner: string | null): string {
  if (winner) {
    const prefix = team === winner ? 'Winner ' : '';
    const corona = team === winner ? '🏆' : '';

    return prefix + team + ' Team '// + corona
  } else {
    return team + 'Team 🤝'
  }
}

export function FooterReport() {
  const { teams_totals, winner } = useStore();

  return (
    <LinearGradient colors={['#A90F11', '#15803d']}
      locations={[0.45, 0.55]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.summary}>
        <Text style={styles.winner}>{formatWinnerTitle(teams_totals[1].team, winner)}</Text>
        <Text style={styles.score}>Points: {teams_totals[1].info.points}</Text>
        <Text style={styles.score}>Tags: {teams_totals[1].info.tags}</Text>
        <Text style={styles.score}>Rescues: {teams_totals[1].info.rescues}</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.winner}>{formatWinnerTitle(teams_totals[0].team, winner)}</Text>
        <Text style={styles.score}>Points: {teams_totals[0].info.points}</Text>
        <Text style={styles.score}>Tags: {teams_totals[0].info.tags}</Text>
        <Text style={styles.score}>Rescues: {teams_totals[0].info.rescues}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 16,
    marginTop: 16
  },
  summary: {
    width: '50%',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  winner: {
    color: 'gold',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4
  },
  score: {
    color: '#eee',
    fontSize: 14,
    marginVertical: 2,
  },
});
