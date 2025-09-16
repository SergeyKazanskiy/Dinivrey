import { StyleSheet, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useStore } from '../../store';
import { objectToJson } from '../../../../shared/utils';
import { ChartCell } from '../components/ChartCell';
import { ExamGradientColors, RuleTests } from '../../../../shared/constants';
import { ChartWidget } from '../components/ChartWidget';


export function ChartsView() {
  const { metrics, metricName, timestamps, metrics_modal } = useStore();
  const { showExamChartModal, hideExamChartModal } = useStore();

  const screenWidth = Platform.OS === 'web' ? 360 : Dimensions.get("window").width;
  
  return (
      <View style={styles.container}>
        {RuleTests.map(item => (
          <TouchableOpacity onPress={() => showExamChartModal(item)}>

            {item === metricName ?
              <ChartWidget key={item}
                metricName={metricName}
                timestamps={timestamps}
                metrics_modal={metrics_modal}
                w={screenWidth - 58}
                onHide={hideExamChartModal}/>
            :
              <ChartCell key={item}
                exam={item}
                metrics={metrics.filter(el => el.name === item)}
                colors={ExamGradientColors[item]}
                onShow={() => showExamChartModal(item)}
              />
            }
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

