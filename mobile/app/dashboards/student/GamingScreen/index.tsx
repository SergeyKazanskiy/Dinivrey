import { useCallback } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../shared/components/CustomNavbar';
import { useRouter, Stack } from 'expo-router';
import { PlayersView } from './views/PlayersView';
import { TitleView } from './views/TitleView';
import { AddingPopup } from './popups/AddingPopup';
import { AddNewDialog } from './dialogs/AddNewDialog';
import { RemovingPopup } from './popups/RemovingPopup';
import { EvadersDialog } from './dialogs/EvadersDialog';
import { TimeSetter } from './dialogs/TimeSetter';
import { Team } from '../model';
import { FooterView } from './views/FooterView';
import { BackAlert } from './alerts/BackAlert';
import { GameOverAlert } from './alerts/GameOverAlert';
import { CheckingAlert } from './alerts/CheckingAlert';
import { HeaderView } from './views/HeaderView';
import { formatDateTime, objectToJson } from '../../../shared/utils';
import { GameReport } from './popups/GameReport';
import { useNavigation } from '@react-navigation/native';


export default function GamingScreen() {
  const { isHeader, currentRound, gameStep, gameState, gameDate, isEvadersDialog } = useStore();
  const { currentTeam, pointsDifference, winner } = useStore();
  const { loadStudents, onNavbarBack, hideBackAlert, onErrorExit, step_on_settings, clearPlayers} = useStore();
  const { onFixPoints, switch_on_completion, hideCheckingAlert, setGamingScreen } = useStore();

  const { isGamingScreen } = useStore();
  const w = isGamingScreen ? 760 : 360

  const router = useRouter();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadStudents();
      step_on_settings();
    }, [])
  );

  function handleBack() {
    if (gameStep === 'Settings') {
      clearPlayers();
      returnBack();
    } else {
      onNavbarBack();
    }
  }

  function handleFinishGame() {
    step_on_settings();
    returnBack();
  }

  const returnBack = () => {
    setGamingScreen(false);
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push('/dashboards/student/GamesScreen'); 
    }
  };

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={[styles.wrapper, {width: w}]} >
      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title={formatDateTime(gameDate).date + ', Game Mode ('  + gameStep + ', '+ gameState + ')'} onClick={handleBack}>
        <HeaderView/>
      </CustomNavbar>

      {/* Alerts */}
      <BackAlert
        onBack={() => (setGamingScreen(false), returnBack(), onErrorExit())}
        onCancel={hideBackAlert}
      />
      <GameOverAlert
        team={winner}
        onNo={handleFinishGame}
        onYes={step_on_settings}
      />
      <CheckingAlert
        team={currentTeam}
        points={pointsDifference}
        onFixPoints={onFixPoints}
        onGoBack={()=>(hideCheckingAlert(), switch_on_completion())}
      />

      {/* Modals */}
      <AddingPopup/>
      <RemovingPopup/>
      <TimeSetter/>
      <GameReport/>
      <AddNewDialog/>
      
      {/* Main */}
      {isEvadersDialog && <EvadersDialog/>} 

      {!isEvadersDialog && <View style={styles.row}>
        <View style={styles.section}>
          {isHeader && <TitleView team={currentRound.teams[0].team}
                                  role={currentRound.teams[0].role} />}

          <PlayersView team={currentRound.teams[0].team}
                        role={currentRound.teams[0].role} />
        </View>
        <View style={styles.section}>
           {isHeader && <TitleView team={currentRound.teams[1].team}
                                    role={currentRound.teams[1].role} />}

          <PlayersView team={currentRound.teams[1].team}
                        role={currentRound.teams[1].role} />
        </View>
      </View> }

      {!isHeader && !isEvadersDialog && <FooterView/>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
      alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
      maxWidth: Platform.OS === 'web' ? 760 : undefined,
      maxHeight: Platform.OS === 'web' ? 360 : undefined,
     // width: 760,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    width: '50%',
    paddingHorizontal: 4
  }
});