import { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, Platform, View, Text } from 'react-native';
import { Button, CheckBox } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../store';
import { widgetStyles } from '../../../../shared/styles/appStyles';
import { StudentsView } from './views/StudentsView';
import { AttendanceView } from './views/AttendanceView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { CustomAlert } from '../../../../shared/components/CustomAlert';
import { isPast, isToday, isFuture} from '../../../../shared/utils';


export default function AttendanceScreen() {
  const { isStudentsView, isAttendanceView, students, timestamp, isAllChecked } = useStore();
  const { loadAttendances, addAttendances, deleteAttendances, setAllChecked } = useStore();

  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [tense, setTenses] = useState<string>('');

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadAttendances();
    }, [])
  );

  function handleAddBlank() {
    if (isPast(timestamp)) {
      setTenses('past');
      setIsAlert(true);
      return
    } else if (isFuture(timestamp)) {
      setTenses('future');
      setIsAlert(true);
      return
    }
    addAttendances();
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Students' onClick={() => router.back()}/>

      <CustomAlert visible={isAlert}  title="Attention!"
        onClose={() => setIsAlert(false)}>
        <Text>Unable to create blank in the {tense}</Text>
      </CustomAlert>

       <View style={styles.container}>
          <View style={styles.section}>
            {isStudentsView && <Button size='sm' disabled={students.length === 0} color="blue"
                onPress={handleAddBlank}>Add Blank</Button>}
            {isAttendanceView && <Button size='sm' color="blue" type='outline'
                onPress={deleteAttendances}>Delete Blank</Button>}

            <View style={[styles.section, {marginRight: 11}]}>
              <Text style={[widgetStyles.title, {paddingTop: 4}]}>All select</Text>
              <CheckBox checked={isAllChecked} onPress={setAllChecked}
                iconType="material-community" checkedIcon="checkbox-outline" uncheckedIcon={'checkbox-blank-outline'}
                containerStyle={{margin:0, padding: 0, backgroundColor: 'rgba(45, 75, 10, 0.3)'}} checkedColor='#ddd'
              />
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
  },
  summary: { 
    marginTop: 'auto', 
    paddingBottom: 20
  },
});