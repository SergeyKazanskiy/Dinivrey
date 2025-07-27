import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { CalendarView } from './views/CalendarView';
import { ButtonsView } from './views/ButtonsView';
import { GamesView } from './views/GamesView';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';


export default function LidersScreen() {
  const { loadLastGameReport, selectGameReport } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadLastGameReport();
    }, [])
  );

  const onNewGame = () => {
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

        <ButtonsView onNewGame={onNewGame}/>
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
  },
  container: {
    flex: 1,
  },
});
