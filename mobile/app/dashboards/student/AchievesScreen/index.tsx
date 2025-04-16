import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { widgetStyles, screenStyles } from '../../../shared/styles/appStyles';
import { AchievesView } from './views/AchievesView';
import { AchievesView2 } from './views/AchievesView2';
import { AchievesView3 } from './views/AchievesView3';


export const AchievesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={[widgetStyles.title, styles.title]}>Individual achievements</Text>
      <AchievesView/>

      <Text style={[widgetStyles.title, styles.title]}>Team Achievements</Text>
      <AchievesView2/>

      <Text style={[widgetStyles.title, styles.title]}>Additional rewards</Text>
      <AchievesView3/>
      <Text style={[screenStyles.summary, styles.summary]}>You still have a little time left !</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1C21',
    padding: 16,
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 10
  },
  summary: { 
    textAlign: 'center',   
    paddingTop: 80,
    //paddingBottom: 10
  },
});

export default AchievesScreen;