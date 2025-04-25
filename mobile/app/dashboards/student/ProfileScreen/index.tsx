import { useEffect } from 'react';
import { StyleSheet, ScrollView, Modal, View, Text, Pressable, Button } from 'react-native';

import { ProfileView } from './views/ProfileView';
import { AddressView } from './views/AddressView';
import { AchievesView } from './views/AchievesView';
import { EventsView } from './views/EventsView';
import BottomSheet from '../../../shared/components/BottomSheet';
import { useStore } from '../store';


const ProfileScreen = () => {
  const { profile_achievements, achievements, isOpenAchievements } = useStore();
  const { open_achievements, close_achievements } = useStore();

    //useEffect(() => {
    //  loadStudent();
    //}, [loadStudent]);

  return (
    <ScrollView style={styles.container}>
      {isOpenAchievements && (
          <View style={styles.centeredView}>
            <Text style={styles.modalText}>This is a Modal</Text>
            <Button title="Close Modal" onPress={close_achievements} />
          </View>)}
      <ProfileView/>
      <AddressView/>
      <AchievesView onClick={open_achievements}/>
      <EventsView/>
    </ScrollView>
  );
};
/*<BottomSheet/>
      {isOpenAchievements && (
          <View style={styles.centeredView}>
            <Text style={styles.modalText}>This is a Modal</Text>
            <Button title="Close Modal" onPress={close_achievements} />
          </View>)}
*/
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
