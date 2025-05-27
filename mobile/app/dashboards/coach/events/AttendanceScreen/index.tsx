import { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, Platform, View, Text } from 'react-native';
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
import { isPast, isToday, isFuture, getWeekHourMinute} from '../../../../shared/utils';
import { ButtonsView } from './views/ButtonsView';
import { DrillsView } from './views/DrillsView';
import DrillsScreen from '../DrillsScreen';


export default function AttendanceScreen() {
  const { isStudentsView, isAttendanceView, students, event_timestamp, isAllChecked } = useStore();
  const { loadAttendances, addAttendances, deleteAttendances, setAllChecked, openDrillsModal, loadEventDrills } = useStore();

  const [isCreateAlert, setIsCreateAlert] = useState<boolean>(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState<boolean>(false);
  const [isMailAlert, setIsMailAlert] = useState<boolean>(false);
  const [tense, setTenses] = useState<string>('');

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadEventDrills();
      loadAttendances();
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
//push("/dashboards/coach")
  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Students' onClick={() => router.back()}>
      <Ionicons name='airplane-outline' size={20} color='#D1FF4D' style={{ marginRight: 8, marginTop: 0 }}
          onPress={()=>setIsMailAlert(true)}
        />
      </CustomNavbar>

      <CustomAlert visible={isMailAlert}  title="Send email!" buttonText='Send'
        handleYes={() => setIsMailAlert(false)}
        onClose={() => setIsMailAlert(false)}>
        <Text style={{color:'#ddd'}}>An email will be sent with a list of attendees.</Text>
      </CustomAlert>

      <CustomAlert visible={isCreateAlert}  title="Attention!"
        onClose={() => setIsCreateAlert(false)}>
        <Text style={{color:'#ddd'}}>Unable to create blank in the {tense}</Text>
      </CustomAlert>

      <CustomAlert visible={isDeleteAlert} 
        title="Attention! Really delete?"
        buttonText='Yes'
        handleYes={() => {deleteAttendances(); setIsDeleteAlert(false)}}
        onClose={() => setIsDeleteAlert(false)}>
        <Text style={{color:'#ddd'}}>Deleting a list will delete all entered data.</Text>
      </CustomAlert>

      <ButtonsView onAdd={openDrillsModal} onExam={()=>{}} onGame={()=>{}}/>
      <DrillsView/>
      <DrillsScreen/>

      <View style={styles.container}>
          <View style={styles.section}>
            {isStudentsView && <Button disabled={students.length === 0} type='outline'
              buttonStyle={styles.button} titleStyle={styles.title} containerStyle={{marginLeft: 2}}
              onPress={handleAddBlank}>Add Blank</Button>}
            {isAttendanceView && <Button size='sm' color="blue" type='outline'
              buttonStyle={styles.button} titleStyle={styles.title} containerStyle={{marginLeft: 2}}
              onPress={handleDeleteBlank}>Delete Blank</Button>}

            <View style={[styles.section, {marginRight: 11}]}>
              {isAttendanceView && <Text style={[styles.allSelect, {paddingTop: 4}]}>All select</Text>}

              {isAttendanceView && <CheckBox checked={isAllChecked} onPress={setAllChecked}
                iconType="material-community" checkedIcon="checkbox-outline" uncheckedIcon={'checkbox-blank-outline'}
                containerStyle={{margin:0, padding: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}} checkedColor='#ddd'
              />}
            </View>
          </View>

          {isStudentsView && <StudentsView/>}
          {isAttendanceView && <AttendanceView/>}
      </View>  
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
});