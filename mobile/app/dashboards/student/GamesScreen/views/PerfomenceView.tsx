import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';

import { useStore } from '../../store';
import { PerfomenceCell } from '../../../../shared/components/PerfomenceCell';


export const PerfomenceView = () => {
  const { student } = useStore();

  return (
    <View style={styles.container}>
      <Text style={[widgetStyles.title, styles.title]}>Individual performance</Text>
      <View style={[widgetStyles.background, styles.section]}>
        <PerfomenceCell label='The number of players caught:' value='3'/>
        <PerfomenceCell label='The number of salvations:' value='2'/>
        <PerfomenceCell label='Average deviation time:' value='4'/>
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
  summary: {    
    textAlign: 'center',
    paddingTop: 26,
    paddingBottom: 10
  },
  section: {    
    borderRadius: 10,
    padding: 16
  },
});
