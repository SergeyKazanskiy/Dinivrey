import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Pressable, Platform, View, Text } from 'react-native';
import { useStore } from '../store';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { DeleteGroupAlert } from './alerts/DeleteGroupAlert';
import { InfoView } from './views/InfoView';
import { SchedulesView } from './views/SchedulesView';
import { TimeView } from './views/TimeView';
import { ButtonsView } from './views/ButtonsView';


export default function GroupScreen() {
  const { camp_id, group_id, isTimeMenu } = useStore();
  const { loadSchedule, showDeleteGroupAlert, loadCoaches, loadGroupCoache } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadCoaches(camp_id);
      loadSchedule(group_id);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title='Group info' onClick={() => router.back()}>
        <Pressable onPress={showDeleteGroupAlert} style={{ marginRight: 4}}>
          <Ionicons name='trash-outline' size={20} color="rgb(180, 216, 158)" />
        </Pressable>
      </CustomNavbar>

      <DeleteGroupAlert onDelete={() => router.back()}/>

      <InfoView/>

      <Text style={styles.title}>Schedule</Text>
      <View style={styles.widget}>
        {isTimeMenu ? <TimeView/> : <SchedulesView/>}
      </View>
      
      <ButtonsView
        onStudents={() => router.push(`/dashboards/manager/groups/StudentsScreen`)}
        onStatistics={() => router.push(`/dashboards/manager/groups/StatisticsScreen`)}
        onAchievemens={() => router.push(`/dashboards/manager/groups/AchievesScreen`)}
      />
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
  title: {
    color: 'gold',
    fontSize: 18,
    marginLeft: 16,
  },
  widget: {
    borderColor: '#2089dc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 12
  },
});