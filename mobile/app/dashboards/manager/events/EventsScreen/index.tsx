import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform, Text } from 'react-native';
import { useStore } from '../store';
import { FilterView } from './views/FilterView';
import { SchedulesView } from './views/SchedulesView';
import { EventsView } from './views/EventsView';
import { LinearGradient } from 'expo-linear-gradient';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';
import { useRouter, Stack } from 'expo-router';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { Ionicons } from '@expo/vector-icons';
import { months } from '../../../../shared/constants';
import { AddCompetitionAlert } from './alerts/AddCompetitionAlert';


export default function EventsScreen() {
  const { isSchedulesView, days, camp_id, year, month, group_inx, groups, camps, camp_inx } = useStore();
  const { loadGroups, loadEvents, loadShedules, togleFilter, showAddAlert } = useStore();
  
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadGroups(camp_id, () => {
        if (isSchedulesView) {
          loadShedules(camp_id)
        } else {
          loadEvents(camp_id, year, month)
        }
      })
    }, [])
  );

  const title: string = camps[camp_inx].name + ' - ' + months[month] + ''

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title={title}onClick={() => router.back()}>
        {!isSchedulesView &&
          <Ionicons name='add-circle-outline' size={21} color="#D1FF4D" onPress={showAddAlert}/>}
      </CustomNavbar>

      <AddCompetitionAlert/>
      <FilterView/>

      {isSchedulesView &&
        <>
          {days.length === 0 && <Text style={[widgetStyles.label, styles.title]}>No events</Text>}
          
          {days.length > 0 &&
          <ScrollView> 
            {days.map(day => (
              <SchedulesView key={day.day} day={day.day} weekday={day.weekday}/>
            ))}
          </ScrollView>}
        </>
      }
      {!isSchedulesView && <EventsView/>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
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