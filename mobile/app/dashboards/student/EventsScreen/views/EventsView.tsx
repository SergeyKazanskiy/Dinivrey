import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { formatDateTime } from '../../../../shared/utils';
import { useStore } from '../../store';
import { EventCell } from '../../../../shared/components/EventCell';


export type Props = {
  onClick: (event_id: number) => void;
};

export const EventsView: React.FC<Props> = ({onClick}) => {
  const { events } = useStore();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <FlatList data={events} renderItem={({ item }) =>
          <TouchableOpacity onPress={() => onClick(item.id)}>
            <EventCell title={item.type} event={item.type} desc={item.desc}
            date={ formatDateTime(item.timestamp).date + ', ' + formatDateTime(item.timestamp).time}/> 
          </TouchableOpacity>        
            } style={styles.list} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6
  },
  summary: {    
    paddingTop: 26,
    paddingBottom: 10
  },
  list: {    
    borderRadius: 10,
  },
});
