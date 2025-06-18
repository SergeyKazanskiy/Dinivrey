import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { DinivreyHeader } from '../../shared/components/DinivreyHeader';
import CampsScreen from './events/CampsScreen';
import GroupsScreen from './groups';
import CoachesScreen from './coaches/CoachesScreen';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';


type TabRoutes = {
  Groups: undefined;
  Events: undefined;
  Coaches: undefined;
};

const Tab = createBottomTabNavigator<TabRoutes>();

function getIconsData(routeName: string) {
  let iconName: any;
  let label = '';

  if (routeName === 'Groups') {
    iconName = 'people';
    label = 'Groups';
  } else if (routeName === 'Coaches') {
    iconName = 'person';
    label = 'Coaches';
  } else {
    iconName = 'calendar-number-outline';
    label = 'Events';
  }

  return { iconName, label };
}

function TabNavigatorWrapper() {
  const navigation = useNavigation<BottomTabNavigationProp<TabRoutes>>();

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <DinivreyHeader title='Manager name' onExit={()=>router.replace('/')}/>
      <Image style={[styles.image]}
        source={require('../../../assets/images/DinivreyCompany.png')} /> 
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabbar,
          tabBarIcon: ({ focused }) => {
            const { iconName, label } = getIconsData(route.name);
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={iconName} style={[styles.icon, focused && styles.focused]} />
                <Text style={[styles.label, focused && styles.focused]}>{label}</Text>
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Coaches" component={CoachesScreen} />
        <Tab.Screen name="Groups" component={GroupsScreen} />
        <Tab.Screen name="Events" component={CampsScreen} />
      </Tab.Navigator>
    </LinearGradient>
  );
}

export default function CoachLayout() {
  return (
    <TabNavigatorWrapper />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
  },
  tabbar: {
    backgroundColor: '#0C1B30',
    height: 70,
    borderTopWidth: 0
  },
  label: {
    color: '#888888',
    fontSize: 14,
    marginTop: 3
  },
  focused: {
    color: '#E4FF3E'
  },
  icon: {
    color: '#888888',
    fontSize: 24,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '72%',
    height: '30%',
  },
});
