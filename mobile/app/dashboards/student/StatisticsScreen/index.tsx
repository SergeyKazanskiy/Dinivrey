import { useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ImageBackground, Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { screenStyles } from '../../../shared/styles/appStyles';
import { useStore } from '../store';
import { CalendarView } from './views/CalendarView';
import { ChartView } from './views/ChartView';
import { DatesView } from './views/DatesView';
import { TableView } from './views/TableView';


export default function StatisticsScreen() {
  const { timestamp,  metricName } = useStore();
  const { loadStatistics, togleStatistic } = useStore();

  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        <Pressable style={{ marginRight: 15 }} onPress={togleStatistic} >
          <Ionicons name='repeat-outline' size={21} color="#D1FF4D" />
        </Pressable>
    });
  }, [navigation]);

  return (
    <ImageBackground source={require('../../../../assets/images/BackDinivrey.jpg')}
      style={styles.background} resizeMode='cover'
    >
      <CalendarView/>
      {timestamp > 0 &&
        <>
          <Text style={styles.metric}>{metricName}</Text>
          <ChartView/>
          <DatesView/>
          <TableView/>
          <Text style={[screenStyles.gold, styles.comment]}>Comment</Text>
        </>
      }
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
  navButton: {
    color: '#D1FF4D',
    fontSize: 15,
  },
  metric: {
    color: 'gold',
    fontSize: 15,
    fontWeight: 400,
    left: 26,
    paddingTop: 10
  },
  comment: {
    marginTop: 'auto', 
    textAlign: 'center',
    paddingBottom: 20
  },
});

//<Text style={styles.navButton}>{isTests ? 'Test' : 'Game'}</Text>