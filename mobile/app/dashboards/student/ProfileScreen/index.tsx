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
import { LinearGradient } from 'expo-linear-gradient';


const ProfileScreen = () => {
  const { loadStudent, detachAchievement, clickAchievement, clickPlus } = useStore();
  const { student_id, last_test, last_game, loadTest, loadGame, loadEvent, setBackDrawer } = useStore();
  
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
    setBackDrawer(false);
  }
  
  const openGameStatistic = (metric: string) => {
    loadGame(last_game.timestamp, metric);
    router.push("/dashboards/student/StatisticsScreen");
    setBackDrawer(false);
  }

  const openEventsScreen = (event_id: number, timestamp: number) => {
    loadEvent(event_id, timestamp);
    router.push("/dashboards/student/EventsScreen");
    setBackDrawer(false);
  }

  const openLidersScreen = () => {
    router.push("/dashboards/student/LidersScreen");
    setBackDrawer(false);
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <ScrollView style={styles.container}>
        <AchievesView onClick={handleClickAchievement} onAddClick={openAchievesScreen}/>

        <LinearGradient colors={['#2E4A7C', '#152B52']} >
          <StatisticView
            onExam={openTestStatistic}
            onGame={openGameStatistic}
            onLiders={openLidersScreen}
          />
        </LinearGradient>
        <Text style={[styles.upcomingClass]}>Upcoming class</Text>
        <LinearGradient colors={['#152B52', '#152B52']} >
          
          <EventsView onClick={openEventsScreen}/>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 8,
  },
  container: {
    flex: 1,
  },
  upcomingClass: {
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 16,

    color: '#eee',
    fontSize: 18,
    fontWeight: 'medium'
  }
});

export default ProfileScreen;
