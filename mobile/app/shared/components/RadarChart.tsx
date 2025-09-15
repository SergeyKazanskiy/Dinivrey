import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Svg, { Polygon, Line, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { ImagesPath } from '../constants';
import { Test } from '@/app/dashboards/student/model';


type Exam = {
  speed: number;
  stamina: number;
  climbing: number;
  evasion: number;
  hiding: number;
};

type RadarChartProps = {
  test: Partial<Test>;
  onExam: (metricName: string) => void;
  onLiders: () => void;
};

const labels = ['climbing', 'stamina', 'speed', 'evasion', 'hiding'];

export const RadarChart: React.FC<RadarChartProps> = ({ test, onExam, onLiders }) => {
  const { width } = useWindowDimensions();
  const size = Math.min(width * 0.6, 300);
  const center = size / 2;
  const radius = size * 0.35;

  const icons = [
    `${ImagesPath}/icons/tests/Climbing.png`,
    `${ImagesPath}/icons/tests/Stamina.png`,
    `${ImagesPath}/icons/tests/Speed.png`,
    `${ImagesPath}/icons/tests/Evasion.png`,
    `${ImagesPath}/icons/tests/Hiding.png`,
  ];

  const values = [
    test.climbing || 0,
    test.stamina || 0,
    test.speed || 0,
    test.evasion || 0,
    test.hiding || 0,
  ];

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

  const mainPolyPoints = values.map((_, i) => {
    const { x, y } = getPoint(10, i);
    return `${x},${y}`;
  }).join(' ');

  const outerPoints = values.map((_, i) => getPoint(10, i)); // 10 = max value

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="55%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="#464646ff" stopOpacity="1" />
            <Stop offset="40%" stopColor="#7d7d7dff" stopOpacity="1" />
            <Stop offset="75%" stopColor="#d8d8d8ff" stopOpacity="1" />
          </RadialGradient>
        </Defs>

        {/* Main polygon as background */}
        <Polygon
          points={mainPolyPoints}
          fill="url(#grad)"
          stroke="yellow"
          strokeWidth={7}
        />

        {/* Полигон чтоб закрыть градиент */}
        <Polygon
          points={points}
          fill="#9caa00ff"
          stroke="#edff27ff"
          strokeWidth={3}
        />

        {/* Lines from center to polygon corners */}
        {values.map((_, i) => {
          const { x, y } = getPoint(10, i); // max value radius
          return (
            <Line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="white"
              strokeWidth={2}
            />
          );
        })}

        {/* Polygon for actual values */}
        <Polygon
          points={points}
          fill="#9caa00ff"
          fillOpacity={0.9}
          stroke="#edff27ff"
          strokeWidth={3}
        />
      </Svg>

      {outerPoints.map((p, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.iconWrapper, { left: p.x - 20, top: p.y - 20 }]} // center icon
          onPress={() => onExam(labels[i])}
        >
          <Image source={{ uri: icons[i] }} style={styles.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute', // ← важно!
  },
  icon: {
    width: 40,
    height: 40,
    // position: 'absolute',
  },
  valueText: {
    position: 'absolute',
    color: '#D1FF4D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centerText: {
    position: 'absolute',
  },
  average: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
