import { StyleSheet, Text, View } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { useStore } from '../../store';
import { Team, Role } from '../../model';


interface Props {
  team: Team;
  role: Role;
}

export function TitleView({ team, role }: Props) {
  const { blockPlayersAdding } = useStore();
  const { showAddingPopup, showRemovingPopup, setCurrentTeam, setCurrentRole } = useStore();

  const teamName = team + ' Team'

  return (
    <View style={team === Team.GREEN ? styles.firstTeam : styles.secondTeam}> 
      <View style={styles.container}>
        <Text style={styles.teamName}>{teamName}</Text>
        
        <View style={styles.wrapperAdd}>
          <Icon name="person-add" type="ionicon" color="#333" size={18}
            disabled={blockPlayersAdding}
            onPress={() => (setCurrentTeam(team), setCurrentRole(role), showAddingPopup())}
          />
        </View>
        
        <View style={styles.wrapperRemove}>
          <Icon name="delete" type="material" color='#A90F11' size={21}
            disabled={blockPlayersAdding}
            onPress={() => (setCurrentTeam(team), setCurrentRole(role), showRemovingPopup())}
          />
        </View>
        <Text style={styles.role}>Role: {role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  firstTeam: {
    backgroundColor: '#15803d',
  },
  secondTeam: {
    backgroundColor: '#A90F11',
  },
  teamName: {
    minWidth: 110,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  role: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  wrapperAdd: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444'
  },
  wrapperRemove: {
    backgroundColor: '#ddd',
    padding: 6,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#444'
  },
});