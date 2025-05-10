import { useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { ImageBackground, View, StyleSheet, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SportsView } from './views/SportsView';
import { TestersView } from './views/TestersView';
import { useStore } from '../store';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { CustomAlert } from '../../../../shared/components/CustomAlert';


export default function TestingScreen() {
  const { exam, isAlert } = useStore();
  const { loadTesters, setIsAlert } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadTesters();
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Students' onClick={() => router.back()}/>

      <CustomAlert visible={isAlert}  title={"Enter "+exam}
        onClose={() => setIsAlert(false)}>
        <Text>Value: </Text>
      </CustomAlert>

      <SportsView/>
      <TestersView/>
    </LinearGradient>
  );
};

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
  },
});
