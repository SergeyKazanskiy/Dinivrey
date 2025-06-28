import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Pressable, Platform } from 'react-native';
import { useStore } from '../../store';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../../shared/components/CustomNavbar';



export default function AchievesScreen() {
//   const { group_id } = useStore();
//   const { loadSchedule, showDeleteGroupAlert } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      //loadSchedule(group_id);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title='Achievements' onClick={() => router.back()}>
        {/* <Pressable onPress={showDeleteGroupAlert} style={{ marginRight: 4}}>
          <Ionicons name='trash-outline' size={20} color="rgb(180, 216, 158)" />
        </Pressable> */}
      </CustomNavbar>

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