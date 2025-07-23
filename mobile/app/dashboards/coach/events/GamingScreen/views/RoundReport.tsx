import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { RoundView } from './RoundView';
import { Team, Role } from '../../model';
import { LinearGradient } from 'expo-linear-gradient';


interface Props {
  round: number
  time: string

  role_1: Role;
  total_1: string;

  role_2: Role;
  total_2: string;
}

export function RoundReport({ round, time, role_1, total_1, role_2, total_2 }: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#A90F11', '#15803d']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{flexDirection: 'row', justifyContent: 'space-around'}}
      >
        <Text style={styles.text}> {Team.RED} Team - {role_1}</Text>
        <Text style={styles.text}> {Team.GREEN} Team - {role_2}</Text> 
      </LinearGradient>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <RoundView
            team={Team.RED} role={role_1} round={round}
            title={role_1 === Role.CHASER ? 'Rescues' : 'Tags'}
        />
          <RoundView
              team={Team.GREEN} role={role_2} round={round}
              title={role_2 === Role.CHASER ? 'Rescues' : 'Tags'}
          />
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.capsule}>Total points: {total_1}</Text>
          <Text style={styles.capsule}>{time}</Text>
          <Text style={styles.capsule}>Total points: {total_2}</Text>
        </View>
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
