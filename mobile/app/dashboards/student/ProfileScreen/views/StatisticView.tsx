import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { widgetStyles } from '../../../../shared/styles/appStyles';
import { useStore } from '../../store';
import { RadarChart } from '../../../../shared/components/RadarChart';


export const StatisticView = () => {
  const { last_test, last_game } = useStore();

  const exam = {
    speed: 6.4,
    stamina: 8.2,
    climbing: 5.3,
    evasion: 7.1,
    hiding: 3.9,
  };
  
  return (
    <View style={styles.container}>
      <Text style={[widgetStyles.title]}>Statistics</Text>
      <RadarChart exam={exam} />

      <View style={styles.section}>
        <Text style={[widgetStyles.title]}>Caughted: {last_game.caughted}</Text>
        <Text style={[widgetStyles.title]}>Freeded: {last_game.freeded}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: 'gray'
  },
  title: {
    
  },
  section: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'gray'
  },
});
