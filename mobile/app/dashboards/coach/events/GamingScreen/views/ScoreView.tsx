import { StyleSheet, Text, View } from 'react-native';
import { useStore } from '../../store';
import { Team } from '../../model';

interface Props {
  team: Team;
}

export function ScoreView({ team }: Props) {
  const { players, isHeader } = useStore();

  const teamPlayers = players.filter(el => el.team === team);
  const totalScore = teamPlayers.reduce((sum, p) => sum + p.points, 0);
  
  return (
    <>
    {isHeader && 
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreText}>Team Score: {totalScore}</Text>
        <Text style={styles.playerCount}>Player Count: {teamPlayers.length}</Text>
      </View>
      }

      <View style={[styles.tableHeader, !isHeader &&
        {backgroundColor: team === Team.GREEN ? '#15803d' : '#A90F11'}]}>
          
        <Text style={styles.column}>Player</Text>
        <Text style={styles.column}>Points</Text>
        <Text style={styles.column}>Actions</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#334155',
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 12
  },
  column: {
    color: 'white',
    fontWeight: '600',
  },
  scoreBoard: {
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreText: {
    color: 'gold',
    fontSize: 15,
  },
  playerCount: {
    color: '#ccc',
    paddingRight: 2
  },
});