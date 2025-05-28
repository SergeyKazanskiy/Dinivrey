import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AttendanceScreen from './AttendanceScreen';
import TestingScreen from './TestingScreen';
import GamingScreen from './GamingScreen';
import DrillsScreen from './DrillsScreen';
import { StyleSheet, Platform, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native-animatable';
import { DinivreyHeader } from '../../../shared/components/DinivreyHeader2';
import { useRoute } from '@react-navigation/native';
//import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, useRouter } from 'expo-router';
import { TabIcons } from '../../../shared/constants';

type TabRoutes = {
  Groups: undefined;
  Events: undefined;
};

const Tab = createBottomTabNavigator();


export default function StudentLayout() {

  function getIconData(routeName: string) {
    let iconName: any; let label = '';
    type EventName = keyof typeof TabIcons;

    iconName = TabIcons[routeName as EventName]
    label = routeName
    return {iconName, label}
  }

  // const route = useRoute();
  // const navigation = useNavigation<BottomTabNavigationProp<TabRoutes>>();
  const router = useRouter();
  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      {/* <DinivreyHeader
        isGroups={false}
        onGroups={() => router.push("/dashboards/coach/students")}
        onEvents={() => {}}
      /> */}
      <AttendanceScreen/>
      
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

/*
<Tab.Navigator
        screenOptions={({ route }) => ({ headerShown: false, tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: '#0C1B30', height: 70, borderTopWidth: 0 },
          tabBarIcon: ({ focused }) => {
            const { iconName, label } = getIconData(route.name);
            
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={iconName} size={24} color={focused ? '#E4FF3E' : '#888888'}/>
                <Text style={{ color: focused ? '#E4FF3E' : '#888888', fontSize: 14, marginTop: 4 }} >
                  {label}
                </Text>
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Attendance" component={AttendanceScreen}  />
        <Tab.Screen name="Testing" component={TestingScreen} />
        <Tab.Screen name="Gaming" component={GamingScreen} />
        {/* <Tab.Screen name="Drills" component={DrillsScreen} /> }
      </Tab.Navigator>
      */