import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useStore } from '../../store';
import { LineChart } from './LineChart';
import { formatDateTime } from '../../../../shared/utils';
import { objectToJson } from '../../../../shared/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { ExamGradientColors, ExamIcons } from '../../../../shared/constants';
import { CalendarView } from '../views/CalendarView';
import { Metric } from '../../model';
import { Ionicons } from '@expo/vector-icons';


interface Props {
  metricName: string;
  timestamps: number[];
  metrics_modal: Metric[];
  w: number;
  onHide: () => void;
}

export function ChartWidget({metricName, timestamps, metrics_modal, w, onHide}: Props) {
  const colors = ExamGradientColors[metricName];

  function getLabels() {
    const labels = timestamps.map(el => formatDateTime(el).date);
    return labels
  }

  function getValues() {
    const filtred = metrics_modal.filter(el => el.name === metricName);
    const values = filtred.map(el => el.score);
    return values
  }

  return (
    <LinearGradient colors={[colors[0], colors[1]]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View style={styles.icon}>
            <Image source={ExamIcons[metricName]} style={styles.image} />
          </View>
          <Text style={styles.title}>{metricName}</Text>
        </View>

        <TouchableOpacity style={{top: -4, right: -8}} onPress={onHide}>
          <Ionicons name="arrow-up-circle" size={28} color="white" />
        </TouchableOpacity>
        <View style={{width: '50%'}}></View>
      </View>

      <LineChart w={w} h={180}
        labels={getLabels()}
        values={getValues()}
      />
    
      <View style={[styles.calendar, {backgroundColor: colors[0]}]}>
        <CalendarView/>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16
  },
  widget: {
    borderRadius: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#444',
    backgroundColor: '#fff',
    height: 200
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    top: - 8,
    left: - 14,
  },
  image: {
    height: 52,
    width: 52,
   // backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  calendar: {
    marginTop: 4,
   // backgroundColor: 'green',
    borderRadius: 28
  }
});

