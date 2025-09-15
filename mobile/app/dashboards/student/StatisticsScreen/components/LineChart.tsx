import { objectToJson } from '@/app/shared/utils';
import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';

interface Props {
  labels: string[];
  values: number[];
  w: number;
  h?: number;
}

export function LineChart({ labels, values, w, h=180 }: Props) {
  const data = {
    labels: labels, // days
    datasets: [
      {
        data: values,
        color: () => `rgba(255, 165, 31, 0.7)`,
        strokeWidth: 4,
      },
    ],
  };

  return (
    <RNLineChart data={data} width={w} height={h}
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',

        propsForLabels: { fontSize: 14 },
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // texts color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 2,
        propsForDots: {r: "4", strokeWidth: "1", stroke: '#D1FF4D'}, // points color
      }}
      bezier
      style={{ borderRadius: 16, borderColor: '#000', borderBottomWidth: 4, borderRightWidth: 6 }}
    />
  );
}
