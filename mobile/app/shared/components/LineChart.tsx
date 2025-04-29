import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';

interface Props {
  labels: string[];
  values: number[];
  w: number;
}

export function LineChart({ labels, values, w }: Props) {

  const data = {
    labels: labels, // days
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(209, 255, 77, ${opacity})`, //line color
        strokeWidth: 8,
        //backgroundColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity * 0.5})`, 
      },
    ],
  };

  return (
    <RNLineChart
      data={data}
      width={w}
      height={200}
      chartConfig={{
        propsForLabels: {
          fontSize: 14,
          //fontWeight: 800
        },
        backgroundGradientFrom: 'rgba(45, 75, 10, 0.1)',
        backgroundGradientTo: 'rgba(45, 75, 10, 0.3)',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // texts color
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        decimalPlaces: 2,
        propsForDots: {r: "4", strokeWidth: "1", stroke: 'gold'}, // points color '#D1FF4D'
      }}
      bezier // smoose line
      style={{ borderRadius: 8,}}
    />
  );
}
