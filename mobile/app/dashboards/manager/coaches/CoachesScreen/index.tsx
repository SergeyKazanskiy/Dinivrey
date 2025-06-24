import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../store';
import { CoachesView } from './views/CoachesView';
import { CampsView } from './views/CampsView';
import { AddCoachAlert } from './alerts/AddCoachAlert';


export default function CoachesScreen() {
  const { campId } = useStore();
  const { loadCoaches } = useStore();

  useFocusEffect(
    useCallback(() => {
     // alert(campId)
      loadCoaches(campId);
    }, [campId])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <AddCoachAlert/>
      
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
});