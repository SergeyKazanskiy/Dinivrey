import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { cellStyles, widgetStyles } from '../../../../shared/styles/appStyles';

import { useStore } from '../../store';
import { EventCell } from '../../../../shared/components/EventCell';


export type Props = {
  onClick: () => void;
};

export const GamesList: React.FC<Props> = ({onClick}) => {
  const { events } = useStore();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <FlatList data={events} renderItem={({ item }) =>
          <TouchableOpacity onPress={onClick}>
            <EventCell title={item.title} date={item.date} event={item.type} address={item.desc}/> 
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
