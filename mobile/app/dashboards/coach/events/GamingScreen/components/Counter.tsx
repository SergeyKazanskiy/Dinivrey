import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';


type Props = {
  rounds: number;         
  isRunning: boolean;   
  isReset: boolean;    
  onEnd: () => void;  
  style?: any; 
};

export const Counter: React.FC<Props> = ({ rounds, isRunning, isReset, onEnd, style }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset
  useEffect(() => {
    setCurrentRound(1);
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
  }, [isReset, rounds]);

  // Start/Stop
  useEffect(() => {
    if (isRunning && currentRound <= rounds && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentRound((prev) => {
          const next = prev + 1;
          if (next > rounds) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            onEnd();
            return prev; // Оставляем последнее значение
          }
          return next;
        });
      }, 1000);
    }

    if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  return <Text style={style}>Round: {currentRound}</Text>;
};
