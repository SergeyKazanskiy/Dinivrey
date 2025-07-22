import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { useStore } from '../../store';
import { ScoreView } from './ScoreView';
import { Player, Team, Role } from '../../model';


interface Props {
  team: Team;
  role: Role;
}

export function PlayersView({ team, role }: Props) {
  const { players, blockPointsAdding } = useStore();
  const { removePoint, addPoint } = useStore();

  const teamPlayers = players.filter(el => el.team === team);

  return (
    <View style={styles.container}>
      <ScoreView team={team} role={role}/>

      <FlatList
        data={teamPlayers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.row}>
            <Text style={styles.column}>{item.name}</Text>
            <Text style={styles.column2}>{item.points}</Text>
            <View style={styles.actions}>
              <Button
                icon={<Icon name="remove" color="white" />}
                buttonStyle={styles.removeBtn}
                disabled={blockPointsAdding}
                onPress={() => removePoint(item.id)}
              />
              <Button
                icon={<Icon name="add" color="white" />}
                buttonStyle={styles.addBtn}
                disabled={blockPointsAdding}
                onPress={() => addPoint(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 4,
    paddingHorizontal: 8,
    //height: '100%'
  },
  column: {
    minWidth: 92,
    color: '#ccc',
    fontWeight: '600',
  },
  column2: {
    borderLeftWidth: 2,
    borderLeftColor: '#1e293b',
    borderRightWidth: 2,
    borderRightColor: '#1e293b',

    paddingHorizontal: 30,
    color: '#ccc',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    paddingHorizontal: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomColor: '#1e293b',
    borderBottomWidth: 1,
  },
  addBtn: {
    backgroundColor: '#22c55e',
    height: 36,
    width: 36,
    marginLeft: 8,
    borderRadius: 4
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    height: 36,
    width: 36,
    borderRadius: 4
  },
});