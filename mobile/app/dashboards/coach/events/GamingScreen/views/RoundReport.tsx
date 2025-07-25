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
        locations={[0.45, 0.55]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={[styles.section, {paddingVertical: 12}]}
      >
        <Text style={styles.text}> {Team.RED} Team - {role_1}</Text>
        <Text style={styles.text}> {Team.GREEN} Team - {role_2}</Text> 
      </LinearGradient>

      <LinearGradient colors={['#15803d', '#A90F11']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.wrapperRound}
      >
        <Text style={styles.round}>Round {round}</Text> 
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
        
        <View style={[styles.section, {paddingBottom: 4}]}>
          <Text style={styles.capsule}>Total points: {total_1}</Text>
          <Text style={styles.capsule}>{time}</Text>
          <Text style={styles.capsule}>Total points: {total_2}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   // flex: 1,
   // height: '100%',
    //paddingVertical: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 16,
    color: '#eee',
    fontWeight: '500',
  },
  capsule: {
    borderRadius: 16,
    backgroundColor: '#ddd',
    padding: 8,
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
  wrapperRound: {
    width: 90,
    alignSelf: 'center',
    top: -12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444'
  },
  round: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
