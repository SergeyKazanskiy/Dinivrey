import { useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { EventsView}  from './views/EventsView';
import { screenStyles } from '../../../shared/styles/appStyles';
import { CalendarView } from './views/CalendarView';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SchedulesView } from './views/SchedulesView';


export default function EventsScreen() {
  const { isEventsView, student } = useStore();
  const { loadLastEvent, selectEvent, togleEvents, loadSchedule } = useStore();

  const navigation = useNavigation();
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      loadLastEvent();
      loadSchedule(student.group_id);
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        <Pressable style={{ marginRight: 24 }} onPress={togleEvents} >
          <Ionicons name='repeat-outline' size={21} color="#D1FF4D" />
        </Pressable>
    });
  }, [navigation]);

  const openEventScreen = (event_id: number) => {
    selectEvent(event_id);
   // router.push('/dashboards/student/EventsScreen/GameScreen');
  };

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <View style={styles.container}>

        {isEventsView &&
          <>
            <CalendarView/>
            <EventsView onClick={openEventScreen}/>
          </>
        }
        {!isEventsView &&
          <>
            <Text style={[screenStyles.gold, {marginTop: 10, marginBottom: 12, marginLeft: 4}]}>Group schedule</Text>
            <SchedulesView/>
          </>
         }
       
      </View>
      {isEventsView && <Text style={[screenStyles.gold, styles.summary]}>In most cases you win !</Text>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
  },
  container: {
    flex: 1,
    alignContent: 'space-between'
  },
  image: {
    width: 320,
    resizeMode: 'contain'
  },
  summary: {
    marginTop: 'auto', 
    textAlign: 'center',
    paddingBottom: 30
  }
});

/*
<Text style={styles.title}>Stack Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => router.push('/student/details')}
      />
      */