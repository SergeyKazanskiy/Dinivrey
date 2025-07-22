import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { useStore } from '../../store';
import { Timer } from '../components/Timer';
import { LinearGradient } from 'expo-linear-gradient';
import { objectToJson } from '@/app/shared/utils';


const format = (m: number) => `${String(m).padStart(2, '0')}:00`;


export function FooterView() {
  const { isTimerRunning, currentRound, round_times, blockTimeSettings, timer_start_time} = useStore();
  const { isTimeSetter } = useStore();
  const { showTimeSetter, onTimerStart, onTimerStop, onTimerFinish, } = useStore();

  const time = round_times[currentRound.round - 1] / 60;
  //alert(objectToJson(round_times))
  return (
    <View style={styles.container}>
      <View style={styles.timeSetting}>
        <Button
          title={isTimerRunning ? 'STOP' : "START" }
          buttonStyle={styles.setButton} 
          titleStyle={[styles.setText]}
          onPress={() => isTimerRunning ? onTimerStop() : onTimerStart()}
        />
        <Timer
          start_time={timer_start_time}
          isRunning={isTimerRunning}
          style={styles.time}
          onEnd={onTimerFinish}
        />
      </View>


      <LinearGradient colors={['#A90F11', '#15803d']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.wrapperRound}
      >
       <Text style={styles.round}>Round {currentRound.round}</Text> 
      </LinearGradient>
      
        <View style={styles.timeSetting}>
          <Text style={styles.time}>{format(time)}</Text>
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444'
  },
  round: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  timeSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 160,
    paddingHorizontal: 8,

    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#444'
  },
  time: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  setButton: {
    backgroundColor: '#bbb',
    //minWidth: 120,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  setText: {
    color: '#222'
  },
});