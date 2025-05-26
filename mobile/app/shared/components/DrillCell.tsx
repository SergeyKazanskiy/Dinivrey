import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cellStyles, groupStyles } from '../styles/appStyles';
import { CheckBox } from '@rneui/themed';


export type Props = {
  name: string;
  time: string;
  level: string;
  checked: boolean;
  onCheck: () => void;
};
  
export const DrillCell: React.FC<Props> = ({name, time, level, checked, onCheck}) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>{name}</Text>

          <View style={styles.section}>
            <Text style={styles.label}>time: </Text>
            <Text style={styles.value}>{time}</Text>

            <Text style={styles.label}>level: </Text>
            <Text style={styles.value}>{level}</Text>
          </View>
        </View>
          
        <CheckBox
          checked={checked}
          onPress={onCheck}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={'checkbox-blank-outline'}
          containerStyle={{margin:0, padding: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}}
          checkedColor='#ddd'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    marginVertical: 6
  },
  section: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#ddd',
    padding: 4
  },
  label: {
    fontSize: 15,
    color: 'gold',
  },
  value: {
    fontSize: 15,
    color: '#ccc',
    width: 100
  },
});


