import { useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SportsView } from './views/SportsView';
import { LidersView } from './views/LidersView';
import { useStore } from '../store';


export const LidersScreen = () => {
  const { loadLiders } = useStore();

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    loadLiders(3);
  }, [loadLiders]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{ marginRight: 15 }}
          onPress={openGroupsScreen} >
          <Ionicons name='folder-open' size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);
  
  const openGroupsScreen = () => {
    router.push("/dashboards/student/LidersScreen/GroupsScreen");
  };

  return (
    <View style={styles.container}>
      <SportsView/>
      <LidersView/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1C21',
    padding: 16,
    height: '100%'
  },
  
});
