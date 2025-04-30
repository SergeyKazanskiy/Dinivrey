import { useLayoutEffect, useCallback, useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ImageBackground, StyleSheet, ScrollView, Text, Pressable, Animated } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatisticView } from './views/StatisticView';
import { AchievesView } from './views/AchievesView';
import { EventsView } from './views/EventsView';
import { useStore } from '../store';
import { screenStyles } from '../../../shared/styles/appStyles';


const ProfileScreen = () => {
  const { loadStudent, detachAchievement, clickAchievement, clickPlus } = useStore();
  const { student_id, last_test, last_game, loadTest, loadGame, loadEvent } = useStore();
  
  const [showHeaderButton, setShowHeaderButton] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStudent(2);
    }, [])
  );

  const handleClickAchievement = (achievement_id: number) => {
    setShowHeaderButton(true);
    clickAchievement(achievement_id);

    setTimeout(() => {
      setShowHeaderButton(false);
    }, 3000);
  };

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showHeaderButton) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5, // Параметры пружины
        tension: 100,
      }).start();
    } else {
      scaleAnim.setValue(0); // Сброс масштаба обратно
    }
  }, [showHeaderButton]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        showHeaderButton ? (
          <Animated.View style={{ marginRight: 15, transform: [{ scale: scaleAnim }] }}>
            <Pressable onPress={detachAchievement} >
              <Ionicons name='trash-outline' size={24} color="red" />
            </Pressable>
          </Animated.View>
        ): null,
    });
  }, [navigation, showHeaderButton]);
  
  const openAchievesScreen = () => {
    clickPlus()
    router.push("/dashboards/student/AchievesScreen");
  };

  const openTestStatistic = (metric: string) => {
    const metricName = metric.charAt(0).toUpperCase() + metric.slice(1);
    loadTest(last_test.timestamp, metricName);
    router.push("/dashboards/student/StatisticsScreen");
  }
  
  const openGameStatistic = (metric: string) => {
    loadGame(last_game.timestamp, metric);
    router.push("/dashboards/student/StatisticsScreen");
  }

  const openEventsScreen = (event_id: number, timestamp: number) => {
    loadEvent(event_id, timestamp);
    router.push("/dashboards/student/EventsScreen");
  }

  const openLidersScreen = () => {
    router.push("/dashboards/student/LidersScreen");
  }

  return (
    <ImageBackground source={require('../../../../assets/images/BackDinivrey.jpg')}
      style={styles.background} resizeMode='cover'
    >
      <ScrollView style={styles.container}>
        <AchievesView onClick={handleClickAchievement} onAddClick={openAchievesScreen}/>
      
        <StatisticView
          onExam={openTestStatistic}
          onGame={openGameStatistic}
          onLiders={openLidersScreen}
        />

        <Text style={[screenStyles.calendar, {marginTop: 40, marginBottom: 4}]}>Upcoming class</Text>
        <EventsView onClick={openEventsScreen}/>
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
});

export default ProfileScreen;
