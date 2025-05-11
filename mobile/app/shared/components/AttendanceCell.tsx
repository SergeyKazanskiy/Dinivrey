import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { cellStyles, groupStyles } from '../styles/appStyles';


export type Props = {
  first_name: string;
  last_name: string;
  checked: boolean;
  onCheck: () => void;
};
  
export const AttendanceCell: React.FC<Props> = ({first_name, last_name, checked, onCheck}) => {
  return (
    <View style={[styles.container, styles.section]}>
      <Text style={[styles.text]}>
        {first_name} {last_name}
      </Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    marginVertical: 2
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#ddd',
    fontWeight: '400',
    fontSize: 18
  }
});


