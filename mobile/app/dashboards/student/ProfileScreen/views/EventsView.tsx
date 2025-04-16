import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { cellStyles, widgetStyles } from '../../../../shared/styles/appStyles';

import { useStore } from '../../store';
import { EventCell } from '../../../../shared/components/EventCell';


export const EventsView = () => {
  const { events } = useStore();

  return (
    <View style={styles.container}>
      <Text style={[widgetStyles.title, styles.summary]}>Upcoming class</Text>
      <FlatList data={events} renderItem={({ item }) =>
        <EventCell title={item.title} date={item.date} event={item.type} address={item.desc}/>           
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
