import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { useStore } from '../../store';
import { Timer } from '../components/Timer';
import { LinearGradient } from 'expo-linear-gradient';


export function FooterView() {
  const { isTimerRunning, currentRound, round_times, blockTimeSettings, timerSartTime} = useStore();
  const { showTimeSetter, onTimerFinish } = useStore();

  return (
    <View style={styles.container}>
      <Timer start_time={timerSartTime} isRunning={isTimerRunning} onEnd={onTimerFinish}/>

      <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapperRound} >
        <Text style={styles.round}>{currentRound.round}</Text>    
      </LinearGradient>
      
      <View style={styles.timeSetting}>
        <Text style={styles.time}>{round_times[currentRound.round - 1]}</Text>
        <Button
          title="SET" 
          buttonStyle={styles.setButton} 
          titleStyle={[styles.setText]}
          disabled={blockTimeSettings}
          onPress={showTimeSetter}
        />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  wrapperRound: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444'
  },
  round: {
    color: 'white',
    fontWeight: '600',
  },
  timeSetting: {
    backgroundColor: '#ddd',
    padding: 6,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#444'
  },
  time: {
    color: 'white',
    fontWeight: '600',
  },
  setButton: {
    backgroundColor: '#bbb',
    minWidth: 120,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  setText: {
    color: '#222'
  },
});