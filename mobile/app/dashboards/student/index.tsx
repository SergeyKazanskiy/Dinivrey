import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { DinivreyHeader } from '../../shared/components/DinivreyHeader';
import GamesScreen from './GamesScreen';
import LidersScreen from './LidersScreen';
import ProfileScreen from './ProfileScreen';
import AchievesScreen from './AchievesScreen';
import StatisticsScreen from './StatisticsScreen';

import { useAuthState } from '../../shared/http/state';
import { useStore } from './store';


type TabRoutes = {
  Games: undefined;
  Liders: undefined;
  Main: undefined;
  Achieves: undefined;
  Statistics: undefined;
};

const Tab = createBottomTabNavigator<TabRoutes>();

function getTabIcon(routeName: string, focused: boolean) {
  switch (routeName) {
    case 'Games':
      return require('../../../assets/images/Logo.png')
    case 'Liders':
      return require('../../../assets/images/icons/iLeaders.png')
    case 'Main':
      return require('../../../assets/images/icons/iMain.png')
    case 'Achieves':
      return require('../../../assets/images/icons/iAchieves.png')
    default:
      return require('../../../assets/images/icons/iStatistics.png')
  }
}

function TabNavigatorWrapper() {
  const { student } = useStore();
  const { logoutUser } = useAuthState();

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <DinivreyHeader title={student.first_name + ' ' + student.last_name}
        onExit={()=>(router.replace('/'), logoutUser('student'))}
      />
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabbar,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={[focused && styles.icon_focused]}>
                <Image style={[styles.image, focused && styles.image_focused]}
                  source={getTabIcon(route.name, focused)}
                />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Games" component={GamesScreen} />
        <Tab.Screen name="Liders" component={LidersScreen} />
        <Tab.Screen name="Main" component={ProfileScreen} />
        <Tab.Screen name="Achieves" component={AchievesScreen} />
        <Tab.Screen name="Statistics" component={StatisticsScreen} />
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
    backgroundColor: '#D1FF4D',
    borderRadius: 27,
    marginHorizontal: 16,
    marginVertical: 8,
    borderTopWidth: 0,
  },
  icon_focused: {
    backgroundColor: '#000',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 28,
    height: 28,
    tintColor: '#000'
  },
  image_focused: {
    tintColor: '#D1FF4D'
  },
});
