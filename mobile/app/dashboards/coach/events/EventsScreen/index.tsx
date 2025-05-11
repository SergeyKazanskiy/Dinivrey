import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { useStore } from '../store';
import { CalendarView } from './views/CalendarView';
import { EventsView } from './views/EventsView';
import { LinearGradient } from 'expo-linear-gradient';


export default function EventsScreen() {
  const { days } = useStore();
  const { loadGroups } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadGroups(1);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <CalendarView/>
      
      <ScrollView> 
        {days.map(day => (
          <EventsView key={day.day} day={day.day} weekday={day.weekday}/>
        ))}
      </ScrollView>
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
});