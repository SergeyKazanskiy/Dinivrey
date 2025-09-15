import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useStore } from '../../store';
import { formatDateTime } from '../../../../shared/utils';
import { objectToJson } from '../../../../shared/utils';
import { ChartCell } from '../components/ChartCell';
import { ExamGradientColors, RuleTests } from '../../../../shared/constants';


export function ChartView2() {
  const { metrics, showExamChartModal } = useStore();

  return (
      <View style={styles.container}>
        {RuleTests.map(item => (
          <TouchableOpacity onPress={() => showExamChartModal(item)}>
            <ChartCell key={item}
              exam={item}
              metrics={metrics.filter(el => el.name === item)}
              colors={ExamGradientColors[item]}
            />
          </TouchableOpacity>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16
  },
});

