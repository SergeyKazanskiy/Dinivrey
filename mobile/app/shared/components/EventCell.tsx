import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles } from '../styles/appStyles';
import { EventType } from '../models/Event';

export type Props = {
  type: string;
  date: string;
  time: string;
  desc: string;
};
  
export const EventCell: React.FC<Props> = ({type, date, time, desc}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={cellStyles.title}> ❤️    {type}</Text>
            <Text style={cellStyles.date}>{time}</Text>
        </View>
        <View style={styles.desc}>
            <Text style={[cellStyles.type, {marginRight: 10}]}>{date}</Text>
            <Text style={cellStyles.description}>{desc}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)'
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


