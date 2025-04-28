import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';

import { useStore } from '../../store';
import { AddressCell } from '../../../../shared/components/AddressCell';


export const AddressView = () => {
  const { student } = useStore();

  return (
    <View style={styles.container}>
      <Text style={[screenStyles.summary, styles.summary]}>Dear house</Text>
      <View style={[widgetStyles.background, styles.address]}>
        <AddressCell label='City:' value={student.first_name}/>
        <AddressCell label='Street:' value={student.first_name}/>
        <AddressCell label='House:' value={student.first_name}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  summary: {    
    textAlign: 'center',
    paddingTop: 26,
    paddingBottom: 10
  },
  address: {    
    borderRadius: 10,
    padding: 10
  },
});
