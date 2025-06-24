import { StyleSheet, ScrollView, Platform, View } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store';
import { ProfileView } from './views/ProfileView';
import { PerentsView } from './views/PerentsView';
import { AddressView } from './views/AddressView';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { AttendanceView } from './views/AttendanceView';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../../../shared/components/ScreenWrapper';
import CommentsScreen from '../CommentsScreen';
import { RadarChart } from './views/RadarChart';
import { StatsIndicators } from '../../../../shared/components/StatsIndicators';

export default function ProfileScreen() {
  const { isCommentsScreen, last_test, student_id } = useStore();
  const { loadStudent, showComments } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStudent(student_id);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Student' onClick={() => router.back()}>
        <Ionicons name='clipboard-outline' size={20} color='#D1FF4D' style={{ marginRight: 8, marginTop: 0 }}
          onPress={()=>showComments(true)}
        />
      </CustomNavbar>

      <ScreenWrapper visible={isCommentsScreen} title='Coach comments' onClose={() => showComments(false)}>
        <CommentsScreen/>
      </ScreenWrapper>

      <ScrollView style={styles.container}>
        <ProfileView/>
        <PerentsView/>
        <AddressView/>

        <View style={styles.section}>
          <RadarChart test={last_test} onExam={(exam)=>{}}/>
          <StatsIndicators stats={[last_test.climbing, last_test.stamina, last_test.speed, last_test.evasion, last_test.hiding]}/>  
        </View>
      </ScrollView>

      <View style={styles.summary}>
        <AttendanceView/>
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
    justifyContent: 'space-between'
  },
  summary: { 
    marginTop: 'auto', 
    paddingBottom: 20
  },
});