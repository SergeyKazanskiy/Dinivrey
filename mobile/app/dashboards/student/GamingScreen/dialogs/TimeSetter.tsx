import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store';
import { WrapperDialog } from './WrapperDialog';
import { objectToJson } from '@/app/shared/utils';


const format = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};


export function TimeSetter() {
  const { round_times, currentRound, isTimeSetter } = useStore();
  const { setRoundTime, hideTimeSetter } = useStore();
 
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const initialTime: number = round_times[currentRound.round - 1];
    setSeconds(initialTime)
  },[isTimeSetter])

  
  const increment = () => setSeconds((prev) => Math.min(prev + 30, 99 * 60));
  const decrement = () => setSeconds((prev) => Math.max(prev - 30, 0));

  return (
    <WrapperDialog
      visible={isTimeSetter} 
      title='SET ROUND TIME'
      onClose={hideTimeSetter}
    >
      <View style={styles.row}>
        <TouchableOpacity onPress={increment} style={styles.iconButton}>
          <Ionicons name="chevron-up" size={32} color="#ddd" />
        </TouchableOpacity>

        <Text style={styles.timeText}>{format(seconds)}</Text>

        <TouchableOpacity onPress={decrement} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={32} color="#ddd" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton}
        onPress={() => (setRoundTime(currentRound.round, seconds), hideTimeSetter())}>
        <Text style={styles.saveButtonText}>Save round time</Text>
      </TouchableOpacity>
    </WrapperDialog>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconButton: {
    padding: 10,
  },
  timeText: {
    fontSize: 40,
    color: 'white',
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
