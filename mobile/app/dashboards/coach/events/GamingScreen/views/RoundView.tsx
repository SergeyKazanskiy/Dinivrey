import { View, Text } from 'react-native';
import { useStore } from '../../store';
import { PlayerCell } from '../components/PlayerCell';
import { Player, Team, Role } from '../../model';


type Props = {
  team: Team;
  round: number;
  role: Role;
  title: string;
};

export function RoundView({ team, round, role, title }: Props) {
  const { gamers } = useStore();

  const teamGamers = gamers.filter(el => el.team === team )!;
  const players: Player[] = teamGamers.map(el => ({
      id: 0,
      name: el.name || '',
      age: 0,
      points: role === Role.CHASER ? el.caught : el.freeded,
      team: team,
      is_survived: el.is_survived
  }));

  return (
    <View style={{ marginVertical: 12 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
        {title}
      </Text>

      {players.map((el, idx) => (
        <PlayerCell key={idx} name={el.name} isSurvived={el.is_survived} points={el.points} />
      ))}
    </View>
  );
};
