import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Platform, Text } from 'react-native';
import { useStore } from '../store';
import { CompetitionsView } from './views/CompetitionsView';
import { LinearGradient } from 'expo-linear-gradient';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';


export default function HistoryScreen() {
  const { loadCompetitions } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadCompetitions();
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <CompetitionsView/>
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
});