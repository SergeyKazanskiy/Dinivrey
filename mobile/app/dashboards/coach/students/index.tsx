import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import StatisticsScreen from './StatisticsScreen';
import AchievesScreen from './AchievesScreen';
import { StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const Tab = createBottomTabNavigator();


export default function StudentLayout() {
  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Tab.Navigator screenOptions={{ headerShown: false }} >
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Tab.Screen name="StatisticsScreen" component={StatisticsScreen} options={{ title: 'Statistics' }} />
        <Tab.Screen name="AchievesScreen" component={AchievesScreen} options={{ title: 'Achievements' }} />
      </Tab.Navigator>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    backgroundColor: '#fff',
  },
  indicator: { backgroundColor: '#c2ff00', height: 4 },
  tab: { backgroundColor: '#444' },
  label: { marginLeft: 8, color: '#ddd' },
  content: { flex: 1 },
});