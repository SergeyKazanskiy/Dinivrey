import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform, Text } from 'react-native';
import { useStore } from '../store';
import { EventsView } from './views/EventsView';
import { LinearGradient } from 'expo-linear-gradient';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';
import { ButtonsView } from './views/ButtonsView';
import { ScreenWrapper } from '../../../../shared/components/ScreenWrapper';
import HistoryScreen from '../HistoryScreen';
import CompetitionsScreen from '../CompetitionsScreen';
import { CustomAlert } from '../../../../shared/components/CustomAlert';
import { TypesView } from './views/TypesView';


export default function EventsScreen() {
  const [isPast, setIsPast] = useState(false);
  const [isFuture, setIsFuture] = useState(false);
  const [eventType, setEventType] = useState('Training');

  const { schedule_days, isEventAddAlert } = useStore();
  const { loadGroups, loadSchedules, closeAddAlert, addEvent } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadGroups(1, () => {
        loadSchedules();
      });
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <ButtonsView onPast={() => setIsPast(true)} onFuture={()=>setIsFuture(true)}/>

      <ScreenWrapper visible={isPast} title='History' onClose={() => setIsPast(false)}>
        <HistoryScreen/>
      </ScreenWrapper>

      <ScreenWrapper visible={isFuture} title='Competitions' onClose={() => setIsFuture(false)}>
        <CompetitionsScreen/>
      </ScreenWrapper>

      <CustomAlert visible={isEventAddAlert} 
        title="Adding an event!"
        buttonText='Save'
        handleYes={() => {addEvent(eventType)}}
        onClose={closeAddAlert}>
          <Text style={{color: 'gold', fontSize: 16, paddingTop: 4}}>Select the type:</Text>
          <TypesView type={eventType} onType={setEventType}/>
      </CustomAlert>

      {schedule_days.length === 0 && <Text style={[widgetStyles.label, styles.title]}>No events</Text>}
      
      {schedule_days.length > 0 && <ScrollView> 
        {schedule_days.map(day => (
          <EventsView key={day.day} day={day.day} weekday={day.weekday}/>
        ))}
      </ScrollView>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {   
    paddingTop: 60,
    alignSelf:'center'
  },
});