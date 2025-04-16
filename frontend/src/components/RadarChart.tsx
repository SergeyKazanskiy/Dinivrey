import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip} from 'chart.js';
import { Radar } from 'react-chartjs-2';


ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface Props {
  labels: string[];
  values: number[];
}

export function RadarChart({labels, values}: Props) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Radar style={{width: '200px', height: '200px'}} data={data}/>;
}
