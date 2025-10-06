import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Svg, { Polygon, Line, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { BACKEND_APP_IMAGES_URL } from '../../../../../shared/constants';
import { Test } from '../../model';

type RadarChartProps = {
  test: Test;
  onExam: (exam: string) => void;
};

const labels = ['climbing', 'stamina', 'speed', 'evasion', 'hiding'];

export const RadarChart: React.FC<RadarChartProps> = ({ test, onExam }) => {
  const { width } = useWindowDimensions();
  const size = Math.min(width * 0.8, 240);
  const center = size / 2 - 4;
  const radius = size * 0.43;

  const icons = [
    `${BACKEND_APP_IMAGES_URL}/icons/tests/Climbing.png`,
    `${BACKEND_APP_IMAGES_URL}/icons/tests/Stamina.png`,
    `${BACKEND_APP_IMAGES_URL}/icons/tests/Speed.png`,
    `${BACKEND_APP_IMAGES_URL}/icons/tests/Evasion.png`,
    `${BACKEND_APP_IMAGES_URL}/icons/tests/Hiding.png`,
  ];

  const values = [
    test.climbing,
    test.stamina,
    test.speed,
    test.evasion,
    test.hiding,
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
       <Text style={styles.label}>Statistics</Text>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="black" stopOpacity="1" />
            <Stop offset="100%" stopColor="white" stopOpacity="1" />
          </RadialGradient>
        </Defs>

        <Circle cx={center} cy={center} r={radius}
          fill="url(#grad)" fillOpacity={0.8} stroke="limegreen" strokeWidth={5}/>
        
        {outerPoints.map((p, i) => (
          <Line key={i}
            x1={center} y1={center} x2={p.x} y2={p.y}
            stroke="white" strokeWidth={2}
          />
        ))}
        <Polygon points={points} fill="green"  fillOpacity={0.9} stroke="limegreen" strokeWidth={3}/>
      </Svg>

      {outerPoints.map((p, i) => (
        <TouchableOpacity key={i}
          style={[styles.iconWrapper, { left: p.x - 24, top: p.y + 50 }]}
          onPress={() => onExam(labels[i])} >

          <Image key={i} source={{ uri: icons[i] }}
            style={styles.icon}
          />
        </TouchableOpacity>
      ))}

      {/* {values.map((v, i) => {
        const { x, y } = getPoint(v, i);
        return (
          <Text key={i}
            style={[styles.valueText, { left: x+2, top: y - 18 }]}
          >
            {v.toFixed(1)}
          </Text>
        );
      })} */}
      <TouchableOpacity  style={styles.centerText}>
        <Text style={styles.average}>{average}</Text>
      </TouchableOpacity>
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
    width: 50,
    height: 50,
    //position: 'absolute',
  },
  valueText: {
    position: 'absolute',
    color: '#D1FF4D',
    fontWeight: 'bold',
    fontSize: 15,
  },
  centerText: {
    position: 'absolute',
    paddingTop: 24,
    paddingRight: 4
  },
  average: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
    label: {
    marginRight: 3,
    marginBottom: 24,
    backgroundColor: '#000',
    color: '#ddd',
    //fontWeight: 'bold', 
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
