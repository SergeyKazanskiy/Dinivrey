import { StyleSheet, ScrollView, Platform, View } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../store';
// import { ProfileView } from './views/ProfileView';
// import { PerentsView } from './views/PerentsView';
// import { AddressView } from './views/AddressView';
 import { LinearGradient } from 'expo-linear-gradient';
// import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
// import { AttendanceView } from './views/AttendanceView';
 import { useRouter } from 'expo-router';
 import { CustomNavbar } from '../../../../shared/components/CustomNavbar';


export default function ProfileScreen() {
    // const { loadStudent } = useStore();

  const router = useRouter();

    // useFocusEffect(
    //   useCallback(() => {
    //     loadStudent();
    //   }, [])
    // );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
       <CustomNavbar title='Students' onClick={() => router.back()}/>
      {/* <CustomNavbar title='Student' onClick={() => router.back()}/>

      <ScrollView style={styles.container}>
        <ProfileView/>
        <PerentsView/>
        <AddressView/>
      </ScrollView>

      <View style={styles.summary}>
        <AttendanceView/>
      </View> */}
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
  summary: { 
    marginTop: 'auto', 
    paddingBottom: 20
  },
});