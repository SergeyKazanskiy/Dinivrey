import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../../../shared/components/CustomButton';
import { useStore } from '../../store';


export function TimerView() {
  const { isTimerRunning, timer_start_time, isPointsFixing } = useStore();
  const { onTimerStart, onTimerStop, onTimerFinish } = useStore();

  const [timeLeft, setTimeLeft] = useState(timer_start_time);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTimeLeft(timer_start_time);
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
  }, [timer_start_time]);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            onTimerFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    if (!isTimerRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => clearInterval(intervalRef.current!);
  }, [isTimerRunning]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}`.padStart(2, '0') + ':' + `${s % 60}`.padStart(2, '0');

  return (
    <View style={styles.container}>
        <Button
          title={isPointsFixing ? 'NEXT' : isTimerRunning ? 'STOP' : 'START'}
          buttonStyle={styles.button}
          titleStyle={styles.label}
          onPress={() => (isTimerRunning ? onTimerStop(timeLeft) : onTimerStart())}
        />
        <Text style={styles.time}>{formatTime(timeLeft)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  label: {
    color: '#222'
  },
});