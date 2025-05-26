import { StyleSheet, Text, Platform, View } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { DrillsView } from './views/DrillsView';
import { ScreenWrapper } from '../../../../shared/components/ScreenWrapper';


export default function DrillsScreen() {
    const { isDrillsModal } = useStore();
    const { closeDrillsModal } = useStore();

  return (
     <ScreenWrapper visible={isDrillsModal} title='Select drills' onClose={closeDrillsModal}>
      <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >

        <DrillsView/>
        
      </LinearGradient>
      </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: '#ddd'
  },
});