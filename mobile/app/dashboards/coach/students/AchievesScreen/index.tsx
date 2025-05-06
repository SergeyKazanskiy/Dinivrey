import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Text, Platform } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { widgetStyles, screenStyles } from '../../../../shared/styles/appStyles';
import { AchievesPanel } from './views/AchievesPanel';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';


export const AchievesScreen = () => {
  const { achieves } = useStore();
  const { loadAchieves, selectAchieve } = useStore();
  
  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadAchieves();
    }, [])
  );

  function handleClickAchieve(id: number) {
    
  }
  
  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Achievements' onClick={() => router.push("/dashboards/coach")}/>

      <ScrollView style={styles.container}>
        <Text style={[widgetStyles.title, styles.title]}>Test achievements</Text>
        <AchievesPanel achieves={achieves} category='Test' onClick={handleClickAchieve}/>

        <Text style={[widgetStyles.title, styles.title]}>Game achievements</Text>
        <AchievesPanel achieves={achieves} category='Game' onClick={handleClickAchieve}/>

        <Text style={[widgetStyles.title, styles.title]}>Additional rewards</Text>
        <AchievesPanel achieves={achieves} category='Participate' onClick={handleClickAchieve}/>
      </ScrollView>
      
      <Text style={[screenStyles.gold, styles.summary]}>You still have a little time left !</Text>
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
    padding: 16,
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 8
  },
  summary: { 
    marginTop: 'auto', 
    textAlign: 'center',
    paddingBottom: 20
  },
});

export default AchievesScreen;