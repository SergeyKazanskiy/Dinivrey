import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useNavigation } from 'expo-router';
import { View, StyleSheet, ScrollView, Text, Platform } from 'react-native';
import { CalendarView } from './views/CalendarView';
import { GamesView } from './views/GamesView';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderView } from './views/HeaderView';
import { Button } from '../../../shared/components/CustomButton';


export default function GamesScreen() {
  const { loadLastGameData, selectGameReport, setGamingScreen } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadLastGameData();
    }, [])
  );

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
      <ScrollView style={{paddingBottom: 56}}>
      <View style={styles.container}>
        <HeaderView/>
        
        <Button title='Start Dinivrey Game'
          type='solid' 
          buttonStyle={styles.button}
          titleStyle={styles.label}
          onPress={onNewGame}
        />

        <Text style={styles.title}>Dinivrey game History</Text>
        <CalendarView/>

         {/* <ButtonsView onNewGame={onNewGame}/> */}
        <GamesView onSelect={onGameReport}/>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16
  },
  container: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    width: '92%',
    height: 70,
    padding: 8,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#D8F207',
    backgroundColor: '#A6BA06',
    marginTop: 6 //???
  },
  label: {
    fontSize: 28,
    fontWeight: 600,
    color: 'white'
  },
  title: {
    fontSize: 16,
    color: 'white',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'white',
    paddingTop: 18,
    paddingBottom: 3,
    marginBottom: 16
  }
});
