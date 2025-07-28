import { useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useNavigation } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import { CalendarView } from './views/CalendarView';
import { ButtonsView } from './views/ButtonsView';
import { GamesView } from './views/GamesView';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


export default function GamesScreen() {
  const { loadLastGameReport, selectGameReport, setGamingScreen } = useStore();

  const router = useRouter();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadLastGameReport();
    }, [])
  );

  useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => 
      <Pressable style={{ marginRight: 15 }} onPress={onNewGame} >
        <Ionicons name='add-circle' size={21} color="#D1FF4D" />
      </Pressable>
    });
  }, [navigation]);

  const onNewGame = () => {
    setGamingScreen(true)
    router.push("/dashboards/student/GamingScreen");
  };

  const onGameReport = (id: number) => {
    selectGameReport(id);
    router.push("/dashboards/student/GamesScreen/GameReport");
  };

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <View style={styles.container}>
        <CalendarView/>

        {/* <ButtonsView onNewGame={onNewGame}/> */}
        <GamesView onSelect={onGameReport}/>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
    marginRight: 10 //???
  },
  container: {
    flex: 1,
  },
});
