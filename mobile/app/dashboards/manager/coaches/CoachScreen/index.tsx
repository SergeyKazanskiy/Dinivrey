import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { CustomAlert } from '../../../../shared/components/CustomAlert';
import { SignatureView } from './views/SignatureView';
import { useStore } from '../store';
import { GroupsView } from './views/GroupsView';
import { ProfileView } from './views/ProfileView';
import { ButtonsView } from './views/ButtonsView';
import { FreeGroupsView } from './views/FreeGroupsView';


export default function CoachScreen() {
  const { coach_id, isSignature, isDeleteAlert } = useStore();
  const { loadCoach, removeGroup, hideDeleteAlert } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadCoach(coach_id);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title='Profile' onClick={() => router.back()}/>

      <CustomAlert visible={isDeleteAlert} 
        title="Attention! Really remove?"
        buttonText='Yes'
        handleYes={removeGroup}
        onClose={hideDeleteAlert}>
        <Text style={styles.alertText}>Removing group will delete schedule with this group.</Text>
      </CustomAlert>

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
  alertText: {
    fontSize: 15,
    color: '#ddd'
  },
});