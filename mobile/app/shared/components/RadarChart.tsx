import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { ImagesPath } from '../constants';


type Exam = {
  speed: number;
  stamina: number;
  climbing: number;
  evasion: number;
  hiding: number;
};

type RadarChartProps = {
  exam: Exam;
};

const labels = ['climbing', 'stamina', 'speed', 'evasion', 'hiding'];

export const RadarChart: React.FC<RadarChartProps> = ({ exam }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;

  const icons = [
    `${ImagesPath}/icons/tests/Climbing.png`,
    `${ImagesPath}/icons/tests/Stamina.png`,
    `${ImagesPath}/icons/tests/Speed.png`,
    `${ImagesPath}/icons/tests/Evasion.png`,
    `${ImagesPath}/icons/tests/Hiding.png`,
  ];

  const values = [
    exam.climbing,
    exam.stamina,
    exam.speed,
    exam.evasion,
    exam.hiding,
  ];

  const average = (
    values.reduce((acc, v) => acc + v, 0) / values.length
  ).toFixed(1);

  const angleSlice = (Math.PI * 2) / 5;

  const getPoint = (value: number, i: number) => {
    const angle = i * angleSlice - Math.PI / 2;
    const r = (value / 10) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const points = values.map((v, i) => {
    const { x, y } = getPoint(v, i);
    return `${x},${y}`;
  }).join(' ');

  const outerPoints = labels.map((_, i) => {
    const { x, y } = getPoint(10, i);
    return { x, y };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="black" stopOpacity="1" />
            <Stop offset="100%" stopColor="white" stopOpacity="1" />
          </RadialGradient>
        </Defs>

        <Circle cx={center} cy={center} r={radius} fill="url(#grad)" />
        <Polygon points={points} fill="limegreen" stroke="black" strokeWidth={1}/>

        {outerPoints.map((p, i) => (
          <Line key={i}
            x1={center} y1={center} x2={p.x} y2={p.y}
            stroke="white" strokeWidth={1}
          />
        ))}
      </Svg>

      {outerPoints.map((p, i) => (
        <Image key={i} source={{ uri: icons[i] }}
          style={[ styles.icon, { left: p.x - 15, top: p.y - 15 }]}
        />
      ))}

      {values.map((v, i) => {
        const { x, y } = getPoint(v, i);
        return (
          <Text key={i}
            style={[styles.valueText, { left: x - 10, top: y - 10 }]}
          >
            {v.toFixed(1)}
          </Text>
        );
      })}

      <Text style={styles.centerText}>{average}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
  },
  valueText: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  centerText: {
    position: 'absolute',
    left: 140,
    top: 140,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
