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
import { objectToJson } from '@/app/shared/utils';
import { useAuthState } from '../../../shared/http/state';
import { CalendarView } from '../EventsScreen/views/CalendarView';
import { EventsView as EventsView2 } from '../EventsScreen/views/EventsView';


const ProfileScreen = () => {
  const { loadStudent, detachAchievement, clickAchievement, clickPlus } = useStore();
  const { student, last_test, last_game, loadTest, loadGame, loadEvent, setBackDrawer } = useStore();
  
  const [showHeaderButton, setShowHeaderButton] = useState(false);
  const { userId } = useAuthState();
  //alert(userId)
  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStudent(userId);
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
    loadTest(last_test.timestamp || 0, metricName);
    router.push("/dashboards/student/StatisticsScreen");
    setBackDrawer(false);
  }
  
  const openGameStatistic = (metric: string) => {
    loadGame(last_game.timestamp || 0, metric);
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

        <StatisticView
            onExam={openTestStatistic}
            onGame={openGameStatistic}
            onLiders={openLidersScreen}
        />
        <Text style={[styles.upcomingClass]}>Upcoming class</Text>
        
        <EventsView onClick={()=>{}}/>

        <Text style={[styles.upcomingClass]}>Previous class</Text>
        <CalendarView/>
        <EventsView2 onClick={()=>{}}/>
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
    marginTop: 17,
    marginBottom: 4,
    marginLeft: 21,
    color: '#fff',
    fontSize: 22,
    fontWeight: 400
  }
});

export default ProfileScreen;
