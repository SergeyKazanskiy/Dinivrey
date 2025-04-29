import { StyleSheet, View } from 'react-native';
import { useStore } from '../../store';
import { LineChart } from '../../../../shared/components/LineChart';
import { formatDateTime } from '../../../../shared/utils';
import { objectToJson } from '../../../../shared/utils';


export function ChartView() {
  const {  metricName, timestamps, metrics } = useStore();
  
  function getLabels() {
    const labels = timestamps.map(el => formatDateTime(el).date);
    return labels
  }

  function getValuess() {
    const filtred = metrics.filter(el => el.name === metricName);
    const values = filtred.map(el => el.score);
    return values
  }

  return (
    <View style={styles.container}>
        <LineChart w={326}
          labels={getLabels()}
          values={getValuess()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    //backgroundColor: 'green'
  },
});

