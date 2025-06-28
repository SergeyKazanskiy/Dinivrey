import { StyleSheet, FlatList, TouchableOpacity, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cellStyles } from '../../../../../shared/styles/appStyles';
import { useStore } from '../../store';


export function GroupsView() {
  const { coachGroups, coach_group_id } = useStore();
  const { selectGroup, loadFreeGroups } = useStore();

  return (
    <View style={styles.container}>
      <FlatList data={coachGroups} contentContainerStyle={{paddingBottom: 24}}
          renderItem={({ item, index }) =>
          <TouchableOpacity key={item.id} style={[styles.group, item.id === coach_group_id && styles.selected ]}
            onPress={() => selectGroup(item.id)}>

              <Text style={styles.title}>{item.name}</Text>
              <Text style={cellStyles.description}>{item.desc}</Text>
          </TouchableOpacity>
        } style={styles.list}
      />
      <Pressable onPress={loadFreeGroups} style={{ marginLeft: 8}}>
          <Ionicons name='add-circle-outline' size={26} color='rgb(180, 216, 158)' />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 16,
  },
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
  selected: {
    borderColor: 'yellow',
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  text: {
      fontSize: 16,
      color: 'gold'
  },
});