import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ImageBackground, View, Image, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { EventsView}  from './views/EventsView';
import { screenStyles } from '../../../shared/styles/appStyles';
import { CalendarView } from './views/CalendarView';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';


export default function EventsScreen() {
  const router = useRouter()
  const { loadLastEvent, selectEvent } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadLastEvent();
    }, [])
  );

  const openEventScreen = (event_id: number) => {
    selectEvent(event_id);
    router.push('/dashboards/student/EventsScreen/GameScreen');
  };

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <View style={styles.container}>
        <CalendarView/>
        
        <EventsView onClick={openEventScreen}/>
      </View>
      <Text style={[screenStyles.gold, styles.summary]}>In most cases you win !</Text>
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