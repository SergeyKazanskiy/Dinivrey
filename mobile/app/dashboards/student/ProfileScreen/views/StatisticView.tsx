import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';
import { useStore } from '../../store';
import { RadarChart } from '../../../../shared/components/RadarChart';


export type Props = {
  onExam: (metric: string) => void;
};

export const StatisticView = ({ onExam }: Props) => {
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
      <RadarChart exam={last_test} onExam={onExam} />

      <View style={styles.section}>
        <Text style={[screenStyles.gold]}>Caughted: {last_game.caughted}</Text>
        <Text style={[screenStyles.gold]}>Freeded: {last_game.freeded}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  title: {
    
  },
  section: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
