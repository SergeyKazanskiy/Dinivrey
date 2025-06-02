import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { cellStyles, groupStyles } from '../styles/appStyles';
import { formatSeconds } from '../../shared/utils';


export type Props = {
  checked: boolean;
  onCheck: () => void;
  name: string;
  value: string;
  onClick: () => void;
};
  
export const TesterCell: React.FC<Props> = ({  checked, onCheck, name, value, onClick }) => {
  return (
    <View style={[styles.container, styles.sectionStart]}>
      <CheckBox
        checked={checked}
        onPress={onCheck}
        iconType="material-community"
        checkedIcon="checkbox-outline"
        uncheckedIcon={'checkbox-blank-outline'}
        containerStyle={styles.check}
        checkedColor='#ddd'
      />
      <TouchableOpacity style={styles.sectionBetween} onPress={() => { if (checked) onClick() }}>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text style={[groupStyles.title, {marginRight: 2}]}>
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    borderRadius: 8,
    padding: 10,
    paddingLeft: 2,
    marginVertical: 2 //gap???
  },
  sectionStart: {
    flex: 1,
    flexDirection: 'row',
  },
  sectionBetween: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  check: {
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    padding: 0,
    margin:0, 
  },
  name: {
    color: '#ddd',
    fontWeight: '400',
    fontSize: 17,
    paddingTop: 2
  }
});


