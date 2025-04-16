import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles } from '../styles/appStyles';
import { EventType } from '../models/Event';

export type Props = {
  title: string;
  date: string;
  event: EventType;
  address: string;
};
  
export const EventCell: React.FC<Props> = ({title, date, event, address}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={cellStyles.title}> ❤️   {title}</Text>
            <Text style={cellStyles.date}>{date}</Text>
        </View>
        <View style={styles.desc}>
            <Text style={[cellStyles.type, {marginRight: 10}]}>{event}</Text>
            <Text style={cellStyles.description}>{address}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5F6B47',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  desc: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //marginBottom: 8,
  },
});


