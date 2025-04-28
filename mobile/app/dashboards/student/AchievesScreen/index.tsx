import { useEffect, useLayoutEffect } from 'react';
import { ImageBackground, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { widgetStyles, screenStyles } from '../../../shared/styles/appStyles';
import { AchievesPanel } from './views/AchievesPanel';
import { useStore } from '../store';


export const AchievesScreen = () => {
  const { achieves } = useStore();
  const { loadAchieves, selectAchieve, attachAchievement } = useStore();
  
  const navigation = useNavigation();

  useEffect(() => {
    loadAchieves();
  }, [loadAchieves]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{ marginRight: 15 }}
          onPress={attachAchievement} >
          <Ionicons name='add-circle-outline' size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <ImageBackground source={require('../../../../assets/images/BackDinivrey.jpg')}
      style={styles.background} resizeMode='cover'
    >
      <ScrollView style={styles.container}>
        <Text style={[widgetStyles.title, styles.title]}>Test achievements</Text>
        <AchievesPanel achieves={achieves} category='test' onClick={selectAchieve}/>

        <Text style={[widgetStyles.title, styles.title]}>Game achievements</Text>
        <AchievesPanel achieves={achieves} category='game' onClick={selectAchieve}/>

        <Text style={[widgetStyles.title, styles.title]}>Additional rewards</Text>
        <AchievesPanel achieves={achieves} category='training' onClick={selectAchieve}/>

        <Text style={[screenStyles.summary, styles.summary]}>You still have a little time left !</Text>
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
    paddingBottom: 10
  },
  summary: { 
    textAlign: 'center',   
    paddingTop: 80,
    //paddingBottom: 10
  },
});

export default AchievesScreen;