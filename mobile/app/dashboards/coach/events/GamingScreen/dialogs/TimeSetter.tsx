import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store';


const format = (m: number) => `${String(m).padStart(2, '0')}:00`;


export function TimeSetter() {
  const { round_times, currentRound } = useStore();
  const { setRoundTime } = useStore();

  const initialTime: number = round_times[currentRound] // sec
  const [minutes, setMinutes] = useState(initialTime / 60);

  const increment = () => setMinutes((prev) => Math.min(prev + 1, 99));
  const decrement = () => setMinutes((prev) => Math.max(prev - 1, 0));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={increment} style={styles.iconButton}>
          <Ionicons name="chevron-up" size={32} color="black" />
        </TouchableOpacity>

        <Text style={styles.timeText}>{format(minutes)}</Text>

        <TouchableOpacity onPress={decrement} style={styles.iconButton}>
          <Ionicons name="chevron-down" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton}
        onPress={() => setRoundTime(currentRound, minutes * 60)}>
        <Text style={styles.saveButtonText}>Save round time</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
  },
  timeText: {
    fontSize: 40,
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
