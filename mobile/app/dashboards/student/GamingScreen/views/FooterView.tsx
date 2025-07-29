import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { useStore } from '../../store';
import { TimerView } from './TimerView';
import { LinearGradient } from 'expo-linear-gradient';
import { objectToJson } from '@/app/shared/utils';


const formatTime = (s: number) =>
  `${Math.floor(s / 60)}`.padStart(2, '0') + ':' + `${s % 60}`.padStart(2, '0');


export function FooterView() {
  const { currentRound, round_times, blockTimeSettings} = useStore();
  const { showTimeSetter } = useStore();

 // alert(currentRound.round + '_' + round_times[0]+ '_' + round_times[1]) //!!!
  const time = round_times[currentRound.round - 1];

  return (
    <View style={styles.container}>
      <TimerView/>

      <LinearGradient colors={['#A90F11', '#15803d']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.wrapperRound}
      >
       <Text style={styles.round}>Round {currentRound.round}</Text> 
      </LinearGradient>
      
      <View style={styles.timeSetting}>
        <Text style={styles.time}>{formatTime(time)}</Text>
        <Button
          title="SET" 
          buttonStyle={styles.button} 
          titleStyle={[styles.label]}
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
  button: {
    backgroundColor: '#bbb',
    //minWidth: 120,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  label: {
    color: '#222'
  },
});