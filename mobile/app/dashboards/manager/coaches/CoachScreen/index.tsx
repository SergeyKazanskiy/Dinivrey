import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { SignatureView } from './views/SignatureView';
import { useStore } from '../store';


export default function CoachScreen() {
  const { coach_id } = useStore();
  const { loadCoach } = useStore();

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

      <ScrollView> 
          <Text style={styles.title}>CoacheScreen</Text>
          <SignatureView/>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {   
    paddingTop: 10,
    alignSelf:'center',
    color: '#eee'
  },
});