import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { cellStyles, groupStyles } from '../styles/appStyles';


export type Props = {
  first_name: string;
  last_name: string;
};
  
export const StudentCell: React.FC<Props> = ({first_name, last_name}) => {
  return (
    <View style={[styles.container, styles.section]}>
      <Text style={[groupStyles.title, {marginRight: 10}]}>
        {first_name} {last_name}
      </Text>
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
});


