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
      <View style={styles.header}>
        <View style={{paddingLeft: 6, marginBottom: 4}}>
          <Text style={styles.title}>{name}</Text>

          <View style={styles.section}>
            <Text style={styles.label}>time: </Text>
            <Text style={styles.value}>{time},</Text>

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
            containerStyle={{padding: 0, top: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}}
            checkedColor='#ddd'
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    marginVertical: 6,
    marginHorizontal: 1,
    paddingVertical: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 4,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 4,
  },
  title: {
    fontSize: 16,
    color: '#AFEEEE',//AFEEEE
    padding: 4,
    marginVertical: 4,
    fontWeight: '400'
  },
  label: {
    fontSize: 15,
    color: '#A7CFF5',
  },
  value: {
    fontSize: 15,
    //fontWeight: '400', F29F56
    color: '#DEB887',
    marginRight: 8
  },
});


