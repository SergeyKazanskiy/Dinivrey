import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { useStore } from '../store';
import { CalendarView } from './views/CalendarView';
import { EventsView } from './views/EventsView';

export default function GroupsScreen() {
  const { days } = useStore();
  const { loadGroups } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadGroups(1);
    }, [])
  );

  return (
    <>
      <CalendarView/>
      
      <ScrollView style={styles.wrapper}> 
        {days.map(day => (
          <EventsView key={day.day} day={day.day} weekday={day.weekday}/>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    padding: 16,
  },
});