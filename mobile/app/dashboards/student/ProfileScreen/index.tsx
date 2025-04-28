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
  
  return (
    <ImageBackground source={require('../../../../assets/images/BackDinivrey.jpg')}
      style={styles.background} resizeMode='cover'
    >
      <ScrollView style={styles.container}>
        <AchievesView onClick={handleClickAchievement} onAddClick={openAchievesScreen}/>
      
        <StatisticView/>

        <Text style={[screenStyles.calendar, {marginTop: 40, marginBottom: 4}]}>Upcoming class</Text>
        <EventsView/>
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
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    textAlign: 'left',
    paddingBottom: 20
},
});

export default ProfileScreen;
