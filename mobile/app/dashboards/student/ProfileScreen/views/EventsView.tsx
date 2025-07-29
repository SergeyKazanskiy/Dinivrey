import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';
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
      {upcoming_events.length === 0 && 
        <View style={styles.col}>
          <Text style={styles.text}>No events</Text>
        </View>
      }     
      {upcoming_events.length > 0 &&
        <FlatList data={upcoming_events}
          keyExtractor={(index) => '№' + index}
          renderItem={({ item }) => 

          <TouchableOpacity onPress={() => onClick(item.id, item.timestamp)}>
            <EventCell
              type={item.type}
              date={formatDateTime(item.timestamp).date}
              time={formatDateTime(item.timestamp).time}
              desc={item.desc}
            />  
          </TouchableOpacity>
          } style={styles.list} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120
  },
  summary: {    
    paddingTop: 20,
    paddingBottom: 10
  },
  list: {    
    borderRadius: 10,
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'center',    // центр по вертикали
    alignItems: 'center',        // центр по горизонтали
    padding: 16,
    flex: 1 
  },
  text: {
    paddingLeft: 6,
    color: '#D1FF4D',
    fontSize: 17,
    fontWeight: 500
  },
});
