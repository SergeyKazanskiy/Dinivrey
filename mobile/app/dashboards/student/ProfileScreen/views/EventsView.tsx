import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { cellStyles, widgetStyles } from '../../../../shared/styles/appStyles';
import { useStore } from '../../store';
import { EventCell } from '../../../../shared/components/EventCell';
import { formatDateTime } from '../../../../shared/utils';


export const EventsView = () => {
  const { upcoming_events } = useStore();

  return (
    <View style={styles.container}>
      <FlatList data={upcoming_events}
        keyExtractor={(index) => '№' + index}
        renderItem={({ item }) => 

          <EventCell title={item.type} event={item.type} desc={item.desc}
            date={ formatDateTime(item.timestamp).date + ', ' + formatDateTime(item.timestamp).time}
          />           
        } style={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  summary: {    
    paddingTop: 20,
    paddingBottom: 10
  },
  list: {    
    borderRadius: 10,
  },
});
