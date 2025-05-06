import { StyleSheet, ScrollView, Platform } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../store';
import { ProfileView } from './views/ProfileView';
import { PerentsView } from './views/PerentsView';
import { AddressView } from './views/AddressView';
import { LinearGradient } from 'expo-linear-gradient';


export default function ProfileScreen() {
    const { loadStudent } = useStore();
  
    useFocusEffect(
      useCallback(() => {
        loadStudent();
      }, [])
    );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <ScrollView style={styles.container}>
        <ProfileView/>
        <PerentsView/>
        <AddressView/>
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
  },
  container: {
    flex: 1,
    padding: 16,
  },
});