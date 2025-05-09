import { useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { ImageBackground, View, StyleSheet, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SportsView } from './views/SportsView';
import { LidersView } from './views/LidersView';
import { useStore } from '../store';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';


export default function TestingScreen() {
  //const { loadLiders } = useStore();

  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
     // loadLiders();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{ marginRight: 15 }}
          onPress={openGroupsScreen} >
          <Ionicons name='folder-open' size={24} color="#D1FF4D" />
        </Pressable>
      ),
    });
  }, [navigation]);
  
  const openGroupsScreen = () => {
    router.push("/dashboards/student/LidersScreen/GroupsScreen");
  };

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Students' onClick={() => router.back()}/>

      <SportsView/>
      <LidersView/>
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
