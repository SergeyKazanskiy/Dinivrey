import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Platform } from 'react-native';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { GameView } from './views/GameView';
import { GameDeleteAlert } from './alerts/GameDeleteAlert';
import { SuccessGameDeleteAlert } from './alerts/SuccessGameDeleteAlert';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';


const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


export default function GameReport() {
  const { game_id, gameDate, gamers } = useStore();
  const { loadGame, deleteGame, showGameDeleteAlert } = useStore();
  
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadGame(game_id);
    }, [])
  );

    const titleHeader = 'Dinivrey - ' + formatDate(gameDate)

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title={titleHeader} onClick={() => router.back()}>
        <Ionicons name='trash-outline' size={20} color='#D1FF4D' style={{ marginRight: 1, marginTop: 4 }}
          onPress={showGameDeleteAlert}
        />
      </CustomNavbar>

      <GameDeleteAlert onDelete={() => (deleteGame(game_id), router.back())}/>
      {/* <SuccessGameDeleteAlert onClose={() => router.back()} /> */}

      <GameView/>
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
});