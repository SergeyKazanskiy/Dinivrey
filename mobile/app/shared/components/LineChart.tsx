import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';

interface Props {
  labels: string[];
  values: number[];
}

export function LineChart({ labels, values }: Props) {
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // цвет линии
        strokeWidth: 2, // толщина линии
      },
    ],
  };

  return (
    <RNLineChart
      data={data}
      width={260}  // можно поставить screenWidth или фиксированную ширину
      height={200}
      chartConfig={{
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // цвет подписей
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 2,
        propsForDots: {
          r: "3",
          strokeWidth: "1",
          stroke: "#ff6384", // цвет вокруг точек
        },
      }}
      bezier // чтобы линия была сглаженная
      style={{
        borderRadius: 8,
      }}
    />
  );
}
