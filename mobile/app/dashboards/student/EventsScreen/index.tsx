import { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { EventsView}  from './views/EventsView';
import { screenStyles } from '../../../shared/styles/appStyles';
import { getCurrentYear, getCurrentMonth } from '../../../shared/utils';
import { useStore } from '../store';


export default function EventsScreen() {
  const router = useRouter()
  const { year, month, events } = useStore();
  const { selectDate, selectEvent } = useStore();

  useEffect(() => {
    selectDate(getCurrentYear(), getCurrentMonth());
  }, [selectDate]);

  const openEventScreen = (event_id: number) => {
    //router.push('/dashboards/student/EventsScreen/GameScreen');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../../../assets/images/Calendar.png')}/>
        <EventsView onClick={openEventScreen}/>
      </View>
      <Text style={[screenStyles.summary, styles.summary]}>In most cases you win !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1A1C21',
    padding: 16,
    paddingTop: 0,
    height: '100%'
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