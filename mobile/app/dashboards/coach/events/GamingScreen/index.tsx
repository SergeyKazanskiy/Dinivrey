import { StyleSheet, ScrollView, Platform, View, Pressable } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { useRouter, Stack } from 'expo-router';
import { PlayersView } from './views/PlayersView';
import { HeaderView } from './views/HeaderView';
import { AddingPopup } from './popups/AddingPopup';
import { RemovingPopup } from './popups/RemovingPopup';
import { Ionicons } from '@expo/vector-icons';
import { Student } from '../model';


export default function GamingScreen() {
    const { isHeader, isGreen, attendances } = useStore();
    const { setAvailableStudents, toggleHeader, toggleTeam } = useStore();

    const router = useRouter();

    useEffect(() => {
      const availables = attendances.filter(el => el.present === true);
      const students: Student[] = availables.map(el => ({
        id: el.id,
        first_name: el.first_name,
        last_name: el.last_name,
        age: 8,
      }));
      setAvailableStudents(students);
    }, [])

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title='Dinivrey - Game Mode' onClick={() => router.back()}>
        <View style={styles.row}>
          <Pressable style={{ marginRight: 20}} onPress={toggleHeader} >
            <Ionicons name={ isHeader ? 'chevron-up' : 'chevron-down'} size={20} color='#D1FF4D'/>
          </Pressable>
          <Pressable style={{ marginRight: 8 }} onPress={toggleTeam} >
            <Ionicons name='repeat-outline' size={20} color="#D1FF4D" />
          </Pressable>
        </View>
      </CustomNavbar>

      <View style={styles.row}>
        <View style={styles.section}>
          {isHeader && <HeaderView isGreen={isGreen} role='Chasers' />}

          <PlayersView isGreen={isGreen}/>
        </View>
        <View style={styles.section}>
           {isHeader && <HeaderView isGreen={!isGreen} role='Evaders'/>}

          <PlayersView isGreen={!isGreen}/>
        </View>
      </View>

      <AddingPopup/>
      <RemovingPopup/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 760 : undefined,
    maxHeight: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
   // height: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
   // height: '100%',
  },
  section: {
    flex: 1,
    width: '50%',
   // height: '100%',
    paddingHorizontal: 4
  }
});