import { ListItem } from '../../../../../shared/components/CustomListItem';
import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../store';
import { ScheduleEventCell } from '../../../../../shared/components/ScheduleEventCell';
import { Icon } from '../../../../../shared/components/CustomIcon';


export function SchedulesView({ day, weekday }: {day: number, weekday: string}) {
  const [expanded, setExpanded] = useState(false);

  const { filtredSchedules, groups } = useStore();
  const { showCoachesView } = useStore();

  const dayEvents = filtredSchedules.filter(el => el.weekday === day);

  return (
    <View style={styles.container}>
        <ListItem.Accordion containerStyle={styles.group} isExpanded={expanded} icon={{}}
          content={
            <>
              <Icon name={expanded ? 'chevron-down' : 'chevron-right'}
                type="material-community" color="white" style={{ marginRight: 10 }} />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>{weekday}</ListItem.Title>
              </ListItem.Content>
            </>
          }
          onPress={() => setExpanded(!expanded)}
        />
      {expanded &&
          <FlatList data={dayEvents} 
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              <TouchableOpacity style={item.id === 0 && { opacity: 0.6}}
                onPress={() => showCoachesView(item.id)}
              >
                <ScheduleEventCell
                  group={groups.find(el => el.id === item.group_id)?.name || ''}
                  time={item.hour + ':' + item.minute + ' - ' + (item.hour + 1) + ':' + item.minute }
                  coach={item.coach_name}
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
    paddingHorizontal: 16,
  },
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3
  },
  title: { color: '#ddd', fontWeight: '500', fontSize: 16 },
  list: { borderRadius: 10, paddingBottom: 16 },
});