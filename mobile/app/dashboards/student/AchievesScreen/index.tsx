import { useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ImageBackground, StyleSheet, ScrollView, Text, Pressable, Alert } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { widgetStyles, screenStyles } from '../../../shared/styles/appStyles';
import { AchievesPanel } from './views/AchievesPanel';
import { useStore } from '../store';


export const AchievesScreen = () => {
  const { achieves, isAchievementAdding } = useStore();
  const { loadAchieves, selectAchieve, finishAdding } = useStore();
  
  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadAchieves();
    }, [])
  );

  function handleBackButton() {
    finishAdding();
    router.back();
  }

  function handleClickAchieve(id: number) {
    if (isAchievementAdding) {
      selectAchieve(id);
      router.back();
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        isAchievementAdding ? (
          <Pressable style={{ marginRight: 15 }} onPress={handleBackButton} >
            <Ionicons name='arrow-back-circle-outline' size={24} color="red" />
          </Pressable>
        ): null,
    });
  }, [navigation, isAchievementAdding]);

  return (
    <ImageBackground source={require('../../../../assets/images/BackDinivrey.jpg')}
      style={styles.background} resizeMode='cover'
    >
      <ScrollView style={styles.container}>
        <Text style={[widgetStyles.title, styles.title]}>Test achievements</Text>
        <AchievesPanel achieves={achieves} category='Test' onClick={handleClickAchieve}/>

        <Text style={[widgetStyles.title, styles.title]}>Game achievements</Text>
        <AchievesPanel achieves={achieves} category='Game' onClick={handleClickAchieve}/>

        <Text style={[widgetStyles.title, styles.title]}>Additional rewards</Text>
        <AchievesPanel achieves={achieves} category='Participate' onClick={handleClickAchieve}/>

        <Text style={[screenStyles.gold, styles.summary]}>You still have a little time left !</Text>
      </ScrollView>
    </ImageBackground>
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
  title: {   
    paddingTop: 20,
    paddingBottom: 8
  },
  summary: { 
    textAlign: 'center',   
    paddingTop: 80,
    //paddingBottom: 10
  },
});

export default AchievesScreen;