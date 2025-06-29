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
import { EditAlert } from './alerts/EditAlert';
import { Ionicons } from '@expo/vector-icons';
import { months } from '../../../../shared/constants';
import { AddCompetitionAlert } from './alerts/AddCompetitionAlert';
import { CoachesScreen } from './views/CoachesScreen';
import { DeleteEventAlert } from './alerts/DeleteEventAlert';
import { getTimestamp } from '../../../../shared/utils';


export default function EventsScreen() {
  const { days, camp_id, year, month, camps, camp_inx, event_id } = useStore();
  const { isSchedulesView, isEditAlert} = useStore();
  const { loadGroups, loadEvents, loadShedules, setToday } = useStore();
  const { showEditAlert, hideEditAlert, showAddAlert, showDeleteAlert } = useStore();

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
      const dateTime = new Date();
      setToday(dateTime.getTime());
    }, [])
  );

  const title = camp_inx > -1 ? camps[camp_inx]?.name + ' - ' + months[month] + '' : 'Camp'

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title={title} onClick={() => router.back()}>
        {!isSchedulesView && event_id > 0 &&
          <Ionicons name='menu-outline' size={21} color="#D1FF4D" onPress={showEditAlert}/>}
        {!isSchedulesView && event_id === 0 &&
          <Ionicons name='add-circle-outline' size={21} color="#D1FF4D" onPress={showAddAlert}/>}
      </CustomNavbar>

      <EditAlert isOpen={isEditAlert} onEdit={showAddAlert} onDelete={showDeleteAlert} onClose={hideEditAlert}/>
      <AddCompetitionAlert/>
      <DeleteEventAlert/>

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

      <CoachesScreen/>
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