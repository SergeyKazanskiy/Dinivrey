import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';


type Props = {
  start_time: number;  
  isRunning: boolean;
  isReset?: boolean;
  onEnd: () => void;
  style?: any;
};

export const Timer: React.FC<Props> = ({ start_time, isRunning, isReset, onEnd, style }) => {
  const [timeLeft, setTimeLeft] = useState(start_time);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset
  useEffect(() => {
    setTimeLeft(start_time);
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
  }, [isReset, start_time]);

  // Start/Stop
  useEffect(() => {
    if (isRunning && timeLeft > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            onEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const format = (s: number) =>
    `${Math.floor(s / 60)}`.padStart(2, '0') + ':' + `${s % 60}`.padStart(2, '0');

  return <Text style={style}>{format(timeLeft)}</Text>;
};

