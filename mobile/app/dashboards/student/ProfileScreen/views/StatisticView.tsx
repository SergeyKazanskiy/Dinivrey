import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';
import { useStore } from '../../store';
//import { RadarChart } from '../components/RadarChart';
import { StatsIndicators } from '../../../../shared/components/StatsIndicators';
import { RadarChart } from '../../../../shared/components/RadarChart';


export type Props = {
  onExam: (metric: string) => void;
  onGame: (metric: string) => void;
  onLiders: () => void;
};

export const StatisticView = ({ onExam, onGame, onLiders }: Props) => {
  const { last_test, last_game } = useStore();

  return (
    <View style={styles.container}>
      <RadarChart test={last_test} onExam={onExam} onLiders={onLiders} />

      {/* <View style={styles.section}>
        <RadarChart test={last_test} onExam={onExam} onLiders={onLiders} />
        <StatsIndicators stats={[last_test.climbing, last_test.stamina, last_test.speed, last_test.evasion, last_test.hiding]}/>  
      </View> */}
      
      <View style={[styles.section, { paddingHorizontal: 16 }]}>
        <TouchableOpacity onPress={() => onGame('Caughted')}>
          <Text style={[screenStyles.gold]}>Caughted: {last_game.caughted}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => onGame('Freeded')}>
          <Text style={[screenStyles.gold]}>Freeded: {last_game.freeded}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12
  },
  title: {
    
  },
  section: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
