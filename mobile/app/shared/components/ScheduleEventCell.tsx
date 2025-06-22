import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles } from '../styles/appStyles';
import { Button } from '@rneui/themed';
import { Group } from '../../dashboards/coach/students/model';


export type Props = {
  group: string;
  time: string;
};
  
export const ScheduleEventCell: React.FC<Props> = ({group, time}) => {
  return (
    <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.group}>{group}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  group: {
    fontSize: 16,
    color: 'gold'
  },
  time: {
    fontSize: 16,
    color: '#A4FAAA'
  },
});

