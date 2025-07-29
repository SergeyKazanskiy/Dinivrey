import { useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SportsView } from './views/SportsView';
import { LidersView } from './views/LidersView';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';


export default function LidersScreen() {
  const { loadLiders } = useStore();

  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadLiders();
    }, [])
  );

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Pressable style={{ marginRight: 15 }}
  //         onPress={openGroupsScreen} >
  //         <Ionicons name='folder-open' size={24} color="#D1FF4D" />
  //       </Pressable>
  //     ),
  //   });
  // }, [navigation]);
  
  // const openGroupsScreen = () => {
  //   router.push("/dashboards/student/LidersScreen/GroupsScreen");
  // };

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <View style={styles.container}>
        <SportsView/>
        <LidersView/>
      </View>
    </LinearGradient>
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
