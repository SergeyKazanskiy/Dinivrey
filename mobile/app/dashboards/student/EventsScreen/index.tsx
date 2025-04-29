import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ImageBackground, View, Image, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { EventsView}  from './views/EventsView';
import { screenStyles } from '../../../shared/styles/appStyles';
import { CalendarView } from './views/CalendarView';
import { useStore } from '../store';


export default function EventsScreen() {
  const router = useRouter()
  const { year, month, events } = useStore();
  const { selectDate, selectEvent } = useStore();

  useFocusEffect(
    useCallback(() => {
      //selectDate(getCurrentYear(), getCurrentMonth());
    }, [])
  );

  const openEventScreen = (event_id: number) => {
    selectEvent(event_id);
    router.push('/dashboards/student/EventsScreen/GameScreen');
  };

  return (
    <ImageBackground source={require('../../../../assets/images/BackDinivrey.jpg')}
      style={styles.background} resizeMode='cover'
    >
      <View style={styles.container}>
        <CalendarView/>
        
        <EventsView onClick={openEventScreen}/>
      </View>
      <Text style={[screenStyles.summary, styles.summary]}>In most cases you win !</Text>
    </ImageBackground>
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
    textAlign: 'center',
    paddingTop: 26,
    paddingBottom: 10
  }
});

/*
<Text style={styles.title}>Stack Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => router.push('/student/details')}
      />
      */