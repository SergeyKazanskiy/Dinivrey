import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { cellStyles, widgetStyles } from '../../../../shared/styles/appStyles';
import { useStore } from '../../store';
import { EventCell } from '../../../../shared/components/EventCell';
import { formatDateTime } from '../../../../shared/utils';


export type Props = {
  onClick: (event_id: number, timestamp: number) => void;
};

export const EventsView: React.FC<Props> = ({onClick}) => {
  const { upcoming_events } = useStore();

  return (
    <View style={styles.container}>
      <FlatList data={upcoming_events}
        keyExtractor={(index) => '№' + index}
        renderItem={({ item }) => 

        <TouchableOpacity onPress={() => onClick(item.id, item.timestamp)}>
          <EventCell
            type={item.type}
            date={ formatDateTime(item.timestamp).date}
            time={formatDateTime(item.timestamp).time}
            desc={item.desc}
          />  
        </TouchableOpacity>
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
