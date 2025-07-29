import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { formatDateTime } from '../../../../shared/utils';
import { useStore } from '../../store';
import { CompetitionCell } from '../components/CompetitionCell';


export type Props = {
  onClick: (event_id: number) => void;
};

export const EventsView: React.FC<Props> = ({onClick}) => {
  const { events, event_id } = useStore();

  return (
    <ScrollView style={styles.container}>
      <FlatList data={events}
        renderItem={({ item }) =>
        <TouchableOpacity
          style={item.id === event_id ? styles.itemSelected :  styles.item}
          onPress={() => onClick(item.id)}>

          <CompetitionCell
            date={formatDateTime(item.timestamp).date}  
            time={formatDateTime(item.timestamp).time}
            desc={item.desc}
            group1={item.group1}
            group2={item.group2}
          />
        </TouchableOpacity>        
        } style={styles.list}
      />
    </ScrollView>
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
  item: {    
    marginBottom: 8,
  },
  itemSelected: {   
    marginBottom: 8, 
    backgroundColor: '#555'
  },
});
