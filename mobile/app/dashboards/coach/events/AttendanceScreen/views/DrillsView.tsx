import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { DrillCell } from '../../../../../shared/components/DrillCell';


export function DrillsView() {
  const { eventDrills } = useStore();
  const { loadDrill, updateEventDrill } = useStore();

  const [expanded, setExpanded] = useState(false);

  const router = useRouter();

  function handleSelect( eventDrill_id: number) {
    loadDrill(eventDrill_id);
    router.push(`/dashboards/coach/events/DrillScreen`);
  }

  return (
    <View style={styles.container}>
      <ListItem.Accordion containerStyle={styles.group} isExpanded={expanded} icon={{}}
        content={
          <>
            <Icon name={expanded ? 'chevron-down' : 'chevron-right'}
              type="material-community" color="white" style={{ marginRight: 10 }} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Drills</ListItem.Title>
            </ListItem.Content>
          </>
        }
        onPress={() => setExpanded(!expanded)}
      />
      {expanded &&
        <FlatList data={eventDrills} contentContainerStyle={{paddingBottom: 24}}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => handleSelect(item.drill_id)}>
              <DrillCell
                name={item.name}
                time={item.time}
                level={item.level}
                checked={item.completed}
                onCheck={() => updateEventDrill(item.id, item.completed)}
              />
            </TouchableOpacity>
          } style={styles.list}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16
  },
  list: {
    borderRadius: 10
  },
});