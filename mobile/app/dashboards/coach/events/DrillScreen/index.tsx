import { StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { useRouter } from 'expo-router';
import { DrillView } from './views/DrillView';
import { Stack } from 'expo-router';
import { useStore } from '../store';

export default function DrillScreen() {
  const { drill } = useStore();
  const router = useRouter();

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >

      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title={ drill.name } onClick={() => router.back()}/>

      <DrillView/>

    </LinearGradient>
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
});