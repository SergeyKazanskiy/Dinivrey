import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export type Props = {
  group: string;
  time: string;
  coach: string;
};
  
export const ScheduleEventCell: React.FC<Props> = ({group, time, coach}) => {
  return (
    <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.group}>{group}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.row}>
          {/* <Text style={styles.title}>Coach: </Text> */}
          <Text style={styles.name}>{coach}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 1,
    paddingVertical: 10,
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
  row: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  group: {
    fontSize: 16,
    color: 'gold'
  },
  time: {
    fontSize: 16,
    color: '#A4FAAA'
  },
  title: {
    fontSize: 15,
    color: '#A7CFF5',
  },
  name: {
    fontSize: 15,
    color: '#A7CFF5',
  },
});

