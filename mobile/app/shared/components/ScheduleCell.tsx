import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles } from '../styles/appStyles';
import { Button, CheckBox } from '@rneui/themed';


export type Props = {
  group: string;
  type: string;
  time: string;
  checked: boolean;
  onCheck: () => void;
};
  
export const ScheduleCell: React.FC<Props> = ({ group, type, time, checked, onCheck }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <CheckBox checked={checked}
              onPress={onCheck}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon={'checkbox-blank-outline'}
              containerStyle={{margin:0, padding: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}}
              checkedColor='#ddd'
            />
        <Text style={styles.group}>{group}</Text>
      </View>
  
      <Text style={styles.type}>{type}</Text>

      <View style={styles.section}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.icon}> ⇢ </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    padding: 10,
    marginVertical: 4
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  group: {
    fontSize: 16,
    color: '#ddd'
  },
  type: {
    fontSize: 16,
    color: 'gold'
  },
  time: {
    fontSize: 15,
    color: 'green'
  },
  icon: {
    paddingTop: 1,
    fontSize: 24,
  },
});

