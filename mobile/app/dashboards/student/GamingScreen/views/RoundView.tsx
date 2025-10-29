import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { Gamer, Player, Team, Role } from '../../model';
import { Icon } from '../../../../shared/components/CustomIcon';


type Props = {
  team: Team;
  round: number;
  role: Role;
  title: string;
};

export function RoundView({ team, role, title }: Props) {
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

      {players.map((item) => (
        <View key={item.id} style={[styles.cell]}>
          <View style={styles.row}>

            {item.is_survived && item.role === Role.EVADER &&
              <Icon name="checkbox-marked-outline" type="material-community" size={20} color='green'/>}
            {!item.is_survived && item.role === Role.EVADER &&
              <Icon name="close-box-outline" type="material-community" size={20} color='red' />}

            <Text style={styles.text}>{item.name}</Text>
          </View>

          <Text style={styles.capsule}>{item.points}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginHorizontal: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
    paddingVertical: 2,

    backgroundColor: '#ddd',
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    alignSelf: 'flex-end',
    fontSize: 17,
    color: '#eee',
    fontWeight: '500',
    paddingRight: 14
  },
   text: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500'
  },
  capsule: {
    borderRadius: 10,
    backgroundColor: '#eee',
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
});