import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widgetStyles, cellStyles } from '../../../../shared/styles/appStyles';

import { useStore } from '../../store';
import { PerfomenceCell } from '../../../../shared/components/PerfomenceCell';


export const RewardsView = () => {
  const { student } = useStore();

  return (
    <View style={styles.container}>
      <Text style={[widgetStyles.title, styles.title]}>Additional rewards</Text>
      <View style={[widgetStyles.background, styles.section]}>
        <Text style={cellStyles.title }>You should also practice jumping</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 10
  },
  section: {  
    minHeight: 120,  
    borderRadius: 10,
    padding: 10
  },
});
