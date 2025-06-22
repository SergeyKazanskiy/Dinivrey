import { ListItem } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { CampEventCell } from '../../../../../shared/components/CampEventCell';
import { formatDateTime } from '../../../../../shared/utils';
import { Icon } from '@rneui/themed';
import { TypesView } from '../views/TypesView';


export function EventsView() {
  const { filtredEvents, groups } = useStore();

  function handlePressGroup( event_id: number, group_id: number, timestamp: number, group_number: number) {
    // selectEvent(event_id, group_id, timestamp, group_number);
    
    // if (event_id === 0) {
    //   openAddAlert(group_id, timestamp);
    // } else {
    //   router.push(`/dashboards/coach/events`);
    // }
  }

  return (
    <>
      <FlatList data={filtredEvents}
        renderItem={({ item }) =>
          <CampEventCell key={item.id}
            type={item.type}  
            date={formatDateTime(item.timestamp).date}
            time={formatDateTime(item.timestamp).time}
            desc={item.desc}
            group1={groups.find(el => el.id === item.group1_id)!}
            onGroup={(group_id, group_number) => handlePressGroup(item.id, group_id, item.timestamp, group_number)}
            group2={groups.find(el => el.id === item.group2_id)}
          />
        } style={styles.list}
      />
      <View style={styles.types}>
        <TypesView/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3
  },
  title: { color: '#ddd', fontWeight: '500', fontSize: 16 },
  list: { padding: 16 },
  types: { 
    marginTop: 'auto', 
    textAlign: 'center',
    padding: 16
  },
});