import React from 'react';
import { ImageBackground, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { create } from 'zustand';
import { screenStyles } from '../../../shared/styles/appStyles';

type Metric = {
  name: string;
  score: string;
  additional: string;
};

type GraphData = {
  value: number;
  label: string;
};

type StatisticsState = {
  year: number;
  month: string;
  graphData: GraphData[];
  metrics: Metric[];
  nextMonth: () => void;
  prevMonth: () => void;
  nextYear: () => void;
  prevYear: () => void;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Mock data function
const generateMockData = (year: number, month: string) => {
  const graphData: GraphData[] = Array.from({ length: 5 }, (_, index) => ({
    value: Math.floor(Math.random() * 10) + 1,
    label: `Day ${index + 1}`,
  }));

  const metrics: Metric[] = [
    { name: 'Speed', score: `${Math.floor(Math.random() * 3) + 8}/10`, additional: '8 sec for 60 m' },
    { name: 'Stamina', score: `${Math.floor(Math.random() * 3) + 8}/10`, additional: '300 m in 1:30 min' },
    { name: 'Climbing', score: `${Math.floor(Math.random() * 3) + 8}/10`, additional: '15 sec' },
    { name: 'Evasion', score: `${Math.floor(Math.random() * 3) + 8}/10`, additional: '' },
    { name: 'Hiding', score: `${Math.floor(Math.random() * 3) + 8}/10`, additional: '' },
  ];

  return { graphData, metrics };
};

// Zustand store
const useStatisticsStore = create<StatisticsState>((set, get) => ({
  year: 2025,
  month: 'February',
  graphData: generateMockData(2025, 'February').graphData,
  metrics: generateMockData(2025, 'February').metrics,
  nextMonth: () => {
    const { year, month } = get();
    const currentMonth = months.indexOf(month);
    if (currentMonth === 11) {
      const newYear = year + 1;
      const newMonth = months[0];
      const newData = generateMockData(newYear, newMonth);
      set({ year: newYear, month: newMonth, graphData: newData.graphData, metrics: newData.metrics });
    } else {
      const newMonth = months[currentMonth + 1];
      const newData = generateMockData(year, newMonth);
      set({ month: newMonth, graphData: newData.graphData, metrics: newData.metrics });
    }
  },
  prevMonth: () => {
    const { year, month } = get();
    const currentMonth = months.indexOf(month);
    if (currentMonth === 0) {
      const newYear = year - 1;
      const newMonth = months[11];
      const newData = generateMockData(newYear, newMonth);
      set({ year: newYear, month: newMonth, graphData: newData.graphData, metrics: newData.metrics });
    } else {
      const newMonth = months[currentMonth - 1];
      const newData = generateMockData(year, newMonth);
      set({ month: newMonth, graphData: newData.graphData, metrics: newData.metrics });
    }
  },
  nextYear: () => {
    const { year, month } = get();
    const newYear = year + 1;
    const newData = generateMockData(newYear, month);
    set({ year: newYear, graphData: newData.graphData, metrics: newData.metrics });
  },
  prevYear: () => {
    const { year, month } = get();
    const newYear = year - 1;
    const newData = generateMockData(newYear, month);
    set({ year: newYear, graphData: newData.graphData, metrics: newData.metrics });
  },
}));

const StatisticsScreen: React.FC = () => {
  const { year, month, graphData, metrics, nextMonth, prevMonth, nextYear, prevYear } =
    useStatisticsStore();
/*
      const { year, month, events } = useStore();
      const { selectDate, selectEvent } = useStore();
    
      useEffect(() => {
        selectDate(getCurrentYear(), getCurrentMonth());
      }, [selectDate]);
*/
  return (
        <ImageBackground source={require('../../../../assets/images/BackDinivrey.jpg')}
          style={styles.background} resizeMode='cover'
        >
    <ScrollView style={styles.container}>

      <View style={styles.section}>
        <View style={styles.header}>
          <TouchableOpacity onPress={prevYear}>
            <Text style={styles.controlButton}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.year}>{year}</Text>
          <TouchableOpacity onPress={nextYear}>
            <Text style={styles.controlButton}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <TouchableOpacity onPress={prevMonth}>
            <Text style={styles.controlButton}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.month}>{month}</Text>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={styles.controlButton}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LineChart
        data={graphData}
        width={320}
        height={200}
        thickness={2}
        color="#FFD700"
        showVerticalLines
        verticalLinesColor="#37474F"
        hideDataPoints
        startFillColor="#2E7D32"
        endFillColor="#1B5E20"
        curved
        xAxisLabelTextStyle={{ color: '#D9E021', fontSize: 12 }}
        yAxisTextStyle={{ color: '#D9E021', fontSize: 12 }} // Изменение цвета и размера текста на оси Y
        yAxisColor="#37474F" // Цвет линии оси Y
        xAxisColor="#37474F" // Цвет линии оси X
      />
      <Image style={styles.image} source={require('../../../../assets/images/weeks.png')}/>
      <View style={styles.metricsTable}>
        <Text style={styles.tableHeader}>Metrics</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Metric</Text>
          <Text style={styles.tableCol}>Score</Text>
          <Text style={styles.tableCol}>Additionally</Text>
        </View>
        {metrics.map((metric, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{metric.name}</Text>
            <Text style={styles.tableCol}>{metric.score}</Text>
            <Text style={styles.tableCol}>{metric.additional}</Text>
          </View>
        ))}
      </View>
      <Text style={[screenStyles.summary, {alignSelf: 'center', marginTop: 26}]}>You are good!</Text>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
  },
  image: {
    marginBottom: -16,
    width: 320,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D9E021',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  year: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  month: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  controlButton: {
    fontSize: 20,
    color: '#FFD700',
    paddingHorizontal: 8,
  },
  metricsTable: {
    marginVertical: 16,
    backgroundColor: '#263238',
    borderRadius: 8,
    padding: 8,
  },
  tableHeader: {
    fontSize: 18,
    color: '#D9E021',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#37474F',
  },
  tableCol: {
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    fontSize: 16,
    color: '#D9E021',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default StatisticsScreen;
