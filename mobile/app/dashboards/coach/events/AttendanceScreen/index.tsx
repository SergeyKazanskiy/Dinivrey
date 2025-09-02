import { useCallback, useState } from 'react';
import { StyleSheet, Platform, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, CheckBox } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../store';
import { StudentsView } from './views/StudentsView';
import { AttendanceView } from './views/AttendanceView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { CustomAlert } from '../../../../shared/components/CustomAlert';
import { LoadingAlert } from '../../../../shared/components/LoadingAlert';
import { isPast, isToday, isFuture, getWeekHourMinute} from '../../../../shared/utils';
import { ButtonsView } from './views/ButtonsView';
import { DrillsView } from './views/DrillsView';
import DrillsScreen from '../DrillsScreen';
import { NotificationsView } from '../AttendanceScreen/views/NotificationsView';


export default function AttendanceScreen() {
  const { isStudentsView, isAttendanceView, students, event_timestamp, isAllChecked, event_type, group_name } = useStore();
  const { studentsAmount, attendancesAmount, isSendingReport, isReportSent, wasReportSent, games, attendances} = useStore();
  const { isNotificationsModal, notifications } = useStore();
  const { loadAttendances, addAttendances, deleteAttendances, setAllChecked, loadWasReportSent } = useStore();
  const { openDrillsModal, loadEventDrills, sendAttedanceReport, closeSuccessAlert, selectGameReport } = useStore();
  const { loadGames, showNotificationsModal, hideNotificationsModal } = useStore();

  const [isCreateAlert, setIsCreateAlert] = useState<boolean>(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState<boolean>(false);
  const [isMailAlert, setIsMailAlert] = useState<boolean>(false);
  const [tense, setTenses] = useState<string>('');

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadEventDrills();
      loadAttendances();
      loadWasReportSent();
      loadGames();
    }, [])
  );

  function handleAddBlank() {
    if (isPast(event_timestamp)) {
      setTenses('past');
      setIsCreateAlert(true);
      return
    } else if (isFuture(event_timestamp)) {
      setTenses('future');
      setIsCreateAlert(true);
      return
    }
    addAttendances();
  }

  function handleDeleteBlank() {
    if (isAttendanceView) {
      setIsDeleteAlert(true); //??? lenght>0
    }
  }

  function handleSendEmail() {
    sendAttedanceReport();
    setIsMailAlert(false)
  }

  const checkedStudents = attendances.filter(el => el.present)

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title={`${group_name} (${attendancesAmount}/${studentsAmount})`} onClick={() => router.back()}>
        {!wasReportSent && <Ionicons name='airplane-outline' size={20} color='#D1FF4D' style={{ marginRight: 8, marginTop: 0 }}
          onPress={()=>setIsMailAlert(true)}
        />}
        {wasReportSent && <Ionicons name='checkmark-done-circle-outline' size={22} color='#D1FF4D' style={{ marginRight: 8, marginTop: -1 }}
          onPress={()=>setIsMailAlert(true)}
        />}
      </CustomNavbar>

      <CustomAlert visible={isMailAlert} title="Send email!"
        buttonText='Send'
        handleYes={handleSendEmail}
        onClose={() => setIsMailAlert(false)}>
        {!wasReportSent && <Text style={styles.alertText}>An email will be sent with a list of attendees.</Text>}  
        {wasReportSent && <Text style={styles.alertText}>The report has already been sent, should send it again?</Text>}  
      </CustomAlert>

      <LoadingAlert visible={isSendingReport} title="Sending email!"/>

      <CustomAlert visible={isReportSent} title="Successfully!"
        onClose={closeSuccessAlert}>
        <Text style={styles.alertText}>The attendance report has been sent.</Text>
      </CustomAlert>

      <CustomAlert visible={isCreateAlert} title="Attention!"
        onClose={() => setIsCreateAlert(false)}>
        <Text style={styles.alertText}>Unable to create blank in the {tense}</Text>
      </CustomAlert>

      <CustomAlert visible={isDeleteAlert} 
        title="Attention! Really delete?"
        buttonText='Yes'
        handleYes={() => {deleteAttendances(); setIsDeleteAlert(false)}}
        onClose={() => setIsDeleteAlert(false)}>
        <Text style={styles.alertText}>Deleting a list will delete all entered data.</Text>
      </CustomAlert>

      <CustomAlert visible={isNotificationsModal} title="Notifications!"
        onClose={hideNotificationsModal}>
        <NotificationsView/>
      </CustomAlert>

      <ButtonsView event_type={event_type}
        onAdd={openDrillsModal}
        onExam={()=>router.push(`/dashboards/coach/events/TestingScreen`)}
        onGame={()=>router.push(`/dashboards/coach/events/GamingScreen`)}
        games={games}
        onGameReport={(id)=>(selectGameReport(id), router.push(`/dashboards/coach/events/GameReport`))}
        isNotifications={notifications.length > 0}
        onNotifications={showNotificationsModal}
      />

      <ScrollView>
        <DrillsView/>

        <View style={styles.container}>
            <View style={styles.section}>
              {isStudentsView && <Button disabled={students.length === 0} type='outline'
                buttonStyle={styles.button} titleStyle={styles.title} containerStyle={{marginLeft: 2}}
                onPress={handleAddBlank}>Add Blank</Button>}
              {isAttendanceView && <Button size='sm' color="blue" type='outline'
                buttonStyle={styles.button} titleStyle={styles.title} containerStyle={{marginLeft: 2}}
                onPress={handleDeleteBlank}>Delete Blank</Button>}

              <View style={[styles.section, {marginRight: 11}]}>
                {isAttendanceView && checkedStudents.length === 0 && <>
                  <Text style={[styles.allSelect, {paddingTop: 4}]}>All select</Text>

                  <CheckBox checked={isAllChecked} onPress={setAllChecked}
                    iconType="material-community" checkedIcon="checkbox-outline" uncheckedIcon={'checkbox-blank-outline'}
                    containerStyle={{margin:0, padding: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}} checkedColor='#ddd'
                  />
                </>}
              </View>
            </View>
        
            {isStudentsView && <StudentsView/>}
            {isAttendanceView && <AttendanceView/>}
        </View>
      </ScrollView>

      <DrillsScreen/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  summary: { 
    marginTop: 'auto', 
    paddingBottom: 20
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    color: 'gold'
  },
  allSelect: {
    fontSize: 16,
    color: 'gold'
  },
  alertText: {
    fontSize: 15,
    color: '#ddd'
  },
});