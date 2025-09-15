import React from "react";
import { View } from "react-native";
import Svg, { Line, Path, Text } from "react-native-svg";


type Point = { x: string; y: number };

interface StepChartProps {
  data: Point[];
  width: number;
  height: number;
}

export const StepChart: React.FC<StepChartProps> = ({ data, width, height }) => {
  const margin = { top: 16, right: 16, bottom: 30, left: 30 };

  // Ось Y: масштаб от 0 до максимума
  const maxY = Math.max(...data.map(d => d.y));
  const stepY = maxY <= 3 ? 1 : maxY <= 6 ? 2 : 3; // шаг делений
  const yTicks = Array.from({ length: Math.floor(maxY / stepY) + 1 }, (_, i) => i * stepY);

  const yScale = (value: number) =>
    height - margin.bottom - (value / maxY) * (height - margin.top - margin.bottom);

  // Ось X: равномерное распределение дат
  const xScale = (index: number) =>
    margin.left +
    (index / (data.length - 1)) * (width - margin.left - margin.right);

  // Построение ступенчатого path
  let pathD = "";
  data.forEach((d, i) => {
    const x = xScale(i);
    const y = yScale(d.y);
    if (i === 0) {
      pathD = `M${x},${y}`;
    } else {
      const prevX = xScale(i - 1);
      const prevY = yScale(data[i - 1].y);
      pathD += ` H${x} V${y}`;
    }
  });

  return (
    <View>
      <Svg width={width} height={height}>
        {/* Горизонтальные линии + подписи Y */}
        {yTicks.map(t => (
          <React.Fragment key={t}>
            <Line
              x1={margin.left}
              x2={width - margin.right}
              y1={yScale(t)}
              y2={yScale(t)}
              stroke="#ccc"
              strokeDasharray="4"
            />
            <Text
              x={margin.left - 10}
              y={yScale(t) + 4}
              fontSize="12"
              fill="gray"
              textAnchor="end"
            >
              {t}
            </Text>
          </React.Fragment>
        ))}

        {/* Вертикальные линии + подписи X */}
        {data.map((d, i) => (
          <React.Fragment key={d.x}>
            <Line
              x1={xScale(i)}
              x2={xScale(i)}
              y1={margin.top}
              y2={height - margin.bottom}
              stroke="#ccc"
              strokeDasharray="4"
            />
            <Text
              x={xScale(i)}
              y={height - margin.bottom + 20}
              fontSize="12"
              fill="gray"
              textAnchor="middle"
            >
              {d.x}
            </Text>
          </React.Fragment>
        ))}

        {/* Заливка под графиком */}
        <Path
          d={`${pathD} V${yScale(0)} H${xScale(0)} Z`}
          fill="orange"
          opacity={0.1}
        />

        {/* Линия */}
        <Path d={pathD} stroke="orange" strokeWidth={3} fill="none" />
      </Svg>
    </View>
  );
};
