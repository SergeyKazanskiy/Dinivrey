import React from 'react';
import { Box, Text, Image, AbsoluteCenter, chakra, useToken } from '@chakra-ui/react';
import { Test } from '../model';
import { ImagesPath } from '../../../shared/constants';


const ChakraSvg = chakra('svg');
const ChakraLine = chakra('line');
const ChakraPolygon = chakra('polygon');
const ChakraCircle = chakra('circle');
const ChakraDefs = chakra('defs');
const ChakraRadialGradient = chakra('radialGradient');
const ChakraStop = chakra('stop');

type RadarChartProps = {
  test: Test;
  onExam: (exam: string) => void;
};

const labels = ['climbing', 'stamina', 'speed', 'evasion', 'hiding'];

export const RadarChart: React.FC<RadarChartProps> = ({ test, onExam }) => {
  const size = 240;
  const center = size / 2 - 4;
  const radius = size * 0.43;

  const icons = [
    `${ImagesPath}/icons/tests/Climbing.png`,
    `${ImagesPath}/icons/tests/Stamina.png`,
    `${ImagesPath}/icons/tests/Speed.png`,
    `${ImagesPath}/icons/tests/Evasion.png`,
    `${ImagesPath}/icons/tests/Hiding.png`,
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

  const points = values
    .map((v, i) => {
      const { x, y } = getPoint(v, i);
      return `${x},${y}`;
    })
    .join(' ');

  const outerPoints = labels.map((_, i) => {
    const { x, y } = getPoint(10, i);
    return { x, y };
  });

  return (
    <Box position="relative" textAlign="center">
      <Box position="relative" w={`${size}px`} h={`${size}px`} mx="auto">
        <ChakraSvg width={size} height={size}>
          <ChakraDefs>
            <ChakraRadialGradient id="grad" cx="50%" cy="50%" r="50%">
              <ChakraStop offset="0%" stopColor="black" stopOpacity="1" />
              <ChakraStop offset="100%" stopColor="white" stopOpacity="1" />
            </ChakraRadialGradient>
          </ChakraDefs>

          <ChakraCircle cx={center} cy={center} r={radius}
            fill="url(#grad)" fillOpacity="0.8" stroke="limegreen" strokeWidth="5"/>
          {outerPoints.map((p, i) => (
            <ChakraLine key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="white" strokeWidth="2"/>
          ))}
          <ChakraPolygon points={points} fill="green" fillOpacity="0.9" stroke="limegreen" strokeWidth="3"/>
        </ChakraSvg>

        {outerPoints.map((p, i) => (
          <Box key={i} position="absolute" left={`${p.x - 25}px`} top={`${p.y + 50}px`} cursor="pointer"
            onClick={() => onExam(labels[i])}
          >
            <Image src={icons[i]} boxSize="50px" />
          </Box>
        ))}

        <AbsoluteCenter pt="24px" pr="4px">
          <Text fontSize="3xl" fontWeight="bold" color="white">
            {average}
          </Text>
        </AbsoluteCenter>
      </Box>
    </Box>
  );
};
