import { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, Modal, View, Text, Pressable, Alert } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatisticView } from './views/StatisticView';
import { AchievesView } from './views/AchievesView';
import { EventsView } from './views/EventsView';
import { useStore } from '../store';


const ProfileScreen = () => {
  //const { profile_achievements, last_test, last_game, upcoming_events } = useStore();
  const { loadStudent, detachAchievement, clickAchievement } = useStore();

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    loadStudent(2);
  }, [loadStudent]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{ marginRight: 15 }}
          onPress={detachAchievement} >
          <Ionicons name='trash-outline' size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);
  
  const openAchievesScreen = () => {
    router.push("/dashboards/student/AchievesScreen");
  };
  
  return (
    <ScrollView style={styles.container}>
      <AchievesView onClick={clickAchievement} onAddClick={openAchievesScreen}/>
      <StatisticView/>
      <EventsView/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1C21',
    padding: 16,
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
});

export default ProfileScreen;
