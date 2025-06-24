import { StyleSheet, FlatList, TouchableOpacity, Text, View } from 'react-native';
import { cellStyles } from '../../../../../shared/styles/appStyles';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';


export function GroupsView() {
  const { groups } = useStore();
  const { selectGroup } = useStore();

  const router = useRouter();

  function handleSelect(group_id: number) {
    selectGroup(group_id);
    router.push(`/dashboards/manager/groups/StudentsScreen`);
  }

  return (
    <FlatList data={groups} contentContainerStyle={{paddingBottom: 24}}
        renderItem={({ item, index }) =>
        <TouchableOpacity key={item.id} style={styles.group}
            onPress={() => handleSelect(item.id)}>

            <Text style={styles.title}>{item.name}</Text>
            <Text style={cellStyles.description}>{item.description}</Text>
        </TouchableOpacity>
      } style={styles.list}
    />
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
    paddingBottom: 8
  },
});