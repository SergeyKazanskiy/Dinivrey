import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import StatisticsScreen from './StatisticsScreen';
import AchievesScreen from './AchievesScreen';
import { StyleSheet, Platform, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native-animatable';

const Tab = createBottomTabNavigator();


export default function StudentLayout() {

  function getIconData(routeName: string) {
    let iconName: any; let label = '';

    if (routeName === 'Profile') {
      iconName = 'person-outline'; label = 'Profile';
    } else if (routeName === 'Statistics') {
      iconName = 'document-text-outline'; label = 'Statistics';
    } else if (routeName === 'Achievements') {
      iconName = 'bookmark-outline'; label = 'Achievements';
    };
    return {iconName, label}
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: '#0C1B30', height: 70, borderTopWidth: 0 },
          tabBarIcon: ({ focused }) => {
            const { iconName, label } = getIconData(route.name);
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={iconName} size={24} color={focused ? '#E4FF3E' : '#888888'}/>
                <Text style={{ color: focused ? '#E4FF3E' : '#888888', fontSize: 12, marginTop: 4 }} >
                  {label}
                </Text>
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen}  />
        <Tab.Screen name="Statistics" component={StatisticsScreen} />
        <Tab.Screen name="Achievements" component={AchievesScreen} />
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

