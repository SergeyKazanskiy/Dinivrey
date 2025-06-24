import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Pressable, Platform, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { SignatureView } from './views/SignatureView';
import { useStore } from '../store';
import { GroupsView } from './views/GroupsView';
import { ProfileView } from './views/ProfileView';
import { ButtonsView } from './views/ButtonsView';
import { FreeGroupsView } from './views/FreeGroupsView';
import { DeleteCoachAlert } from './alerts/DeleteCoachAlert';
import { DeleteGroupAlert } from './alerts/DeleteGroupAlert';
import { Ionicons } from '@expo/vector-icons';


export default function CoachScreen() {
  const { coach_id, isSignature } = useStore();
  const { loadCoach, showDeleteAlert } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadCoach(coach_id);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title='Profile' onClick={() => router.back()}>
        <Pressable onPress={showDeleteAlert} style={{ marginRight: 4}}>
          <Ionicons name='trash-outline' size={20} color="rgb(180, 216, 158)" />
        </Pressable>
      </CustomNavbar>

      <DeleteCoachAlert onDelete={() => router.back()}/>
      <DeleteGroupAlert/>

      <ProfileView/>
      <ButtonsView/>

      {isSignature && <SignatureView/>}
      {!isSignature &&  <GroupsView/>}
      
      <FreeGroupsView/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    //paddingHorizontal: 16,
  },
  title: {   
    paddingTop: 10,
    alignSelf:'center',
    color: '#eee'
  },
});