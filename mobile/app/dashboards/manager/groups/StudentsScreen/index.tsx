import React, { useCallback } from 'react';
import { Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { useStore } from '../store';
import { StudentsView } from './views/StudentsView';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';


export default function StudentsScreen() {
  const { group_id, groups } = useStore();
  const { loadStudents, clearStudents } = useStore();

  const group = groups.find(el => el.id === group_id)
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStudents(group_id);
    }, [])
  );

  function handleBack() {
    //router.push("/dashboards/manager/groups/GroupScreen")
    router.back();
    clearStudents();
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title={ group?.name || 'Group'} onClick={handleBack}/>

      <StudentsView/>
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
});