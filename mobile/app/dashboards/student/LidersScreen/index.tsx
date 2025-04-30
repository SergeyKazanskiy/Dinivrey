import { useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { ImageBackground, View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SportsView } from './views/SportsView';
import { LidersView } from './views/LidersView';
import { useStore } from '../store';


export const LidersScreen = () => {
  const { loadLiders } = useStore();

  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadLiders();
    }, [])
  );

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
    <ImageBackground source={require('../../../../assets/images/BackDinivrey.jpg')}
          style={styles.background} resizeMode='cover'
        >
      <View style={styles.container}>
      <SportsView/>
      <LidersView/>
    </View>
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
