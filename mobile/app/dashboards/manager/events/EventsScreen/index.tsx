import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform, Text } from 'react-native';
import { useStore } from '../store';
import { FilterView } from './views/FilterView';
import { WeekEventsView } from './views/WeekEventsView';
import { GroupEventsView } from './views/GroupEventsView';
import { LinearGradient } from 'expo-linear-gradient';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';
import { useRouter, Stack } from 'expo-router';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';


export default function EventsScreen() {
  const { isWeekFilter, days, camp_id, year, month, week, group_inx, groups } = useStore();
  const { loadGroupEvents, loadWeekEvents } = useStore();
  
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (isWeekFilter) {
        loadWeekEvents(camp_id, year, month, week)
      } else {
        loadGroupEvents(groups[group_inx].id, year, month)
      }
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title='Camp' onClick={() => router.back()}/>

      <FilterView/>

      {isWeekFilter &&
        <>
          {days.length === 0 && <Text style={[widgetStyles.label, styles.title]}>No events</Text>}
          
          {days.length > 0 &&
          <ScrollView> 
            {days.map(day => (
              <WeekEventsView key={day.day} day={day.day} weekday={day.weekday}/>
            ))}
          </ScrollView>}
        </>
      }
      {!isWeekFilter && <GroupEventsView/>}
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
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  title: {   
    paddingTop: 60,
    alignSelf:'center'
  },
});