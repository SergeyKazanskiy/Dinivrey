import { View, Text } from 'react-native';
import { useStore } from '../../store';
import { PlayerCell } from '../cells/PlayerCell';


type Props = {
  team: 'Red' | 'Green';
  round: number;
  role: 'Evader' | 'Chaser';
  title: string;
};

export function RoundView({ team, round, role, title }: Props) {
  const { rounds } = useStore();

  const teamRound = rounds.find(el => el.team === team && el.round === round && el.role === role )!;
  const players = teamRound.players;

  return (
    <View style={{ marginVertical: 12 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
        {title}
      </Text>

      {players.map((p, idx) => (
        <PlayerCell key={idx} name={p.name} status={p.status} points={p.points} />
      ))}
    </View>
  );
};
