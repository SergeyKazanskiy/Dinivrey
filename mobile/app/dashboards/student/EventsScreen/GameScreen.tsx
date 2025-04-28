import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { screenStyles } from '../../../shared/styles/appStyles';

//import { PerfomenceView } from './views/PerfomenceView';
//import { AchievesView } from './views/AchievesView';
//import { RewardsView } from './views/RewardsView';


const GameScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Text>Reserve</Text>
      </View>
      <Text style={[screenStyles.summary, styles.summary]}>The game was cool!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1A1C21',
    padding: 16,
    paddingTop: 0,
  },
  container: {
    flex: 1,
    alignContent: 'space-between'
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 10
  },
  summary: { 
    textAlign: 'center',   
    paddingTop: 80,
  },
});

export default GameScreen;