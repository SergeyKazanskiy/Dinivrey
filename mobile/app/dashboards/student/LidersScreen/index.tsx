import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchView } from './views/SearchView';
import { GroupField } from './views/GroupField';
import { SportsView } from './views/SportsView';
import { LidersList } from './views/LidersList';


const LidersScreen = () => {
  return (
    <View style={styles.container}>
      <SearchView/>
      <GroupField/>
      <SportsView/>
      <LidersList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1C21',
    padding: 16,
    height: '100%'
  },
  
});

export default LidersScreen;
