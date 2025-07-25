import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { PlayerCell } from '../components/PlayerCell';
import { Gamer, Player, Team, Role } from '../../model';
import { LinearGradient } from 'expo-linear-gradient';


type Props = {
  team: Team;
  round: number;
  role: Role;
  title: string;
};

export function RoundView({ team, round, role, title }: Props) {
  const { gamers } = useStore();

  const teamGamers: Gamer[] = gamers.filter(el => el.team === team )!;
  const players: Player[] = teamGamers.map(el => ({
      id: 0,
      name: el.name || '',
      age: 0,
      points: role === Role.CHASER ? el.caught : el.freeded,
      team: team,
      is_survived: el.is_survived,
      role
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {players.map((el, idx) => (
        <PlayerCell key={idx}
          name={el.name}
          isSurvived={role === Role.EVADER ? el.is_survived : undefined}
          points={el.points}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'flex-end',
    fontSize: 17,
    color: '#eee',
    fontWeight: '500',
    paddingRight: 14
  },
});