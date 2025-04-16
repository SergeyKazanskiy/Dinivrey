import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip,);

interface Props {
  labels: string[];
  values: number[];
}

export function LineChart({labels, values}: Props) {

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: values,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return <Line options={{responsive: true}} data={data} style={{width: '260px', height: '200px'}}/>;
}
