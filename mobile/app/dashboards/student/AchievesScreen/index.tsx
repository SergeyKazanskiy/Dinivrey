import { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, Text, Pressable } from 'react-native';
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
    <ScrollView style={styles.container}>
      <Text style={[widgetStyles.title, styles.title]}>Test achievements</Text>
      <AchievesPanel achieves={achieves} category='test' onClick={selectAchieve}/>

      <Text style={[widgetStyles.title, styles.title]}>Game achievements</Text>
      <AchievesPanel achieves={achieves} category='game' onClick={selectAchieve}/>

      <Text style={[widgetStyles.title, styles.title]}>Additional rewards</Text>
      <AchievesPanel achieves={achieves} category='training' onClick={selectAchieve}/>

      <Text style={[screenStyles.summary, styles.summary]}>You still have a little time left !</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1C21',
    padding: 16,
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