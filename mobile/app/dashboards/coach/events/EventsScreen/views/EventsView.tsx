import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { CoachEventCell } from '../../../../../shared/components/CoachEventCell';
import { formatDateTime } from '../../../../../shared/utils';
import { Icon } from '@rneui/themed';


export function EventsView({ day,  weekday }: {day: number, weekday: string}) {
  const [expanded, setExpanded] = useState(false);

  const { events, groups } = useStore();
  const { selectEvent } = useStore();

  const dayEvents = events.filter(el => el.day === day);

  const router = useRouter();

  function handlePress(event_id: number, group_id: number) {
    selectEvent(event_id, group_id);
    router.push(`/dashboards/coach/events`)
  }

  return (
    <>
      <View style={styles.group}>
        
        <ListItem.Accordion
          containerStyle={styles.group}
          isExpanded={expanded}
          icon={{}}
          content={
            <>
              <Icon name={expanded ? 'chevron-down' : 'chevron-right'}
                type="material-community" color="white" style={{ marginRight: 10 }} />

              <ListItem.Content>
                <ListItem.Title style={styles.title}>{day}. {weekday}</ListItem.Title>
              </ListItem.Content>
            </>
          }
          onPress={() => setExpanded(!expanded)}
        />
      </View>
      {expanded &&
          <FlatList data={dayEvents}
            renderItem={({ item }) =>
              <CoachEventCell
                type={item.type}
                time={formatDateTime(item.timestamp).time}
                desc={item.desc}
                group1={groups.find(el => el.id === item.group1_id)!}
                onGroup={(group_id) => handlePress(item.id, group_id)}
                group2={groups.find(el => el.id === item.group2_id)}
              />
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