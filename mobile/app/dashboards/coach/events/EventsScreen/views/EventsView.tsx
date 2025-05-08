import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { EventCell } from '../../../../../shared/components/EventCell';
import { formatDateTime } from '../../../../../shared/utils';
import { Icon } from '@rneui/themed';


export function EventsView({ day,  weekday }: {day: number, weekday: string}) {
  const [expanded, setExpanded] = useState(false);

  const { events } = useStore();
  const { selectEvent } = useStore();

  const dayEvents = events.filter(el => el.day === day);

  const router = useRouter();

  function handlePress(id: number) {
    selectEvent(id);
    router.push(`/dashboards/coach/events`)
  }

  return (
    <>
      <View style={styles.group}>
        <Icon name={expanded ? 'chevron-down' : 'chevron-right'}
          type="material-community" color="white" style={{ marginRight: 10 }} />
        <ListItem.Accordion
          content={
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{day}. {weekday}</ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded}
          onPress={() => setExpanded(!expanded)}
        />
      </View>
      {expanded &&
          <FlatList data={dayEvents}
            renderItem={({ item }) =>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handlePress(item.id)}>
    
              <EventCell
                type={item.type}
                date={formatDateTime(item.timestamp).date}
                time={formatDateTime(item.timestamp).time}
                desc={item.desc}
              /> 
            </TouchableOpacity>        
            } style={styles.list}
          />
        }
    </>
  );
}

const styles = StyleSheet.create({
  group: { backgroundColor: '4b5320', borderWidth: 1, borderColor: 'green' },
  title: { color: 'white', fontWeight: 'bold' },
  list: { borderRadius: 10 },
  item: { marginBottom: 8 },
});