import { StyleSheet, FlatList, TouchableOpacity, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';


export function GroupsView() {
  const { groups } = useStore();
  const { selectGroup, showAddGroupAlert, setGroup } = useStore();

  const router = useRouter();

  function handleSelect(group_id: number, groupInx: number) {
    selectGroup(group_id, groupInx);
    setGroup(groups[groupInx]);
    router.push(`/dashboards/manager/groups/GroupScreen`);
  }

  return (
    <>
      <FlatList data={groups} contentContainerStyle={{paddingBottom: 24}}
          renderItem={({ item, index }) =>
          <TouchableOpacity key={item.id} style={styles.group}
              onPress={() => handleSelect(item.id, index)}>

              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        } style={styles.list}
      />
      <Pressable onPress={showAddGroupAlert} style={{ marginTop: 8, marginLeft: 8}}>
        <Ionicons name='add-circle-outline' size={26} color='rgb(180, 216, 158)' />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3,
    padding: 10,
    borderRadius: 4
  },
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list: {
    marginTop: 8
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16,
    paddingBottom: 4
  },
  description: {
    color: '#A7CFF5',
    fontSize: 14,
    fontWeight: 'medium'
  }
});