import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SportsView } from './views/SportsView';
import { TestersView } from './views/TestersView';
import { useStore } from '../store';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { ExamModal } from './views/ExamModal';
import { HeaderMenu } from './views/HeaderMenu';


export default function TestingScreen() {
  const { loadTesters, selectMenu } = useStore();

  const [isMenu, setIsMenu] = useState(false);
  
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadTesters();
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Students' onClick={() => router.back()}>
        {/* <Ionicons name='add-circle-outline' size={20} color='#D1FF4D'
          onPress={() => setIsMenu(true)}
        /> */}
      </CustomNavbar>

      <HeaderMenu isOpen={isMenu}
        items={['Add participants', 'Remove participants']}
        onItem={selectMenu}
        onClose={() => setIsMenu(false)}
        containerStyle={{ borderWidth: 1, borderColor: 'gold', backgroundColor: '#152B52', width: 200, top: 76}}
        textStyle={{color: '#ddd'}}
      />
      <ExamModal/>

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
  dialogText: {
    fontSize: 16,
    color: '#444'
  },
});
