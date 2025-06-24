import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../store';
import { CoachesView } from './views/CoachesView';
import { CampsView } from './views/CampsView';


export default function CoachesScreen() {
  const { campId } = useStore();
  const { loadCoaches } = useStore();

  useFocusEffect(
    useCallback(() => {
     // alert(campId)
      loadCoaches(campId);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>

        <CampsView/>
        <CoachesView/>
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
    paddingTop: 60,
    alignSelf:'center'
  },
});