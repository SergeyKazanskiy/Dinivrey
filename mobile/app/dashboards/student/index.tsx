import React from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigationState } from '@react-navigation/native';
import { useAuthState } from '../../shared/http/state';
import { useStore } from './store';
import GamesScreen from './GamesScreen';
import LidersScreen from './LidersScreen';
import ProfileScreen from './ProfileScreen';
import AchievesScreen from './AchievesScreen';
import StatisticsScreen from './StatisticsScreen';

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
      return focused
        ? require('../../../assets/images/icons/TabIcons/game-selected.png')
        : require('../../../assets/images/icons/TabIcons/game.png');
    case 'Liders':
      return focused
        ? require('../../../assets/images/icons/TabIcons/leaderboard-selected.png')
        : require('../../../assets/images/icons/TabIcons/leaderboard.png');
    case 'Main':
      return focused
        ? require('../../../assets/images/icons/TabIcons/home-selected.png')
        : require('../../../assets/images/icons/TabIcons/home.png');
    case 'Achieves':
      return focused
        ? require('../../../assets/images/icons/TabIcons/achievements-selected.png')
        : require('../../../assets/images/icons/TabIcons/achievements.png');
    default:
      return focused
        ? require('../../../assets/images/icons/TabIcons/stats-selected.png')
        : require('../../../assets/images/icons/TabIcons/stats.png');
  }
}

function isShouldShowDiviver(tab: string, selected: string, focused: boolean) {
  // if (focused) return false;

  // switch (tab) {
  //   case 'Games':
  //     return selected === 'Liders';
  //   case 'Liders':
  //     return selected === 'Main';
  //   case 'Main':
  //     return selected === 'Achieves';
  //   case 'Achieves':
  //     return selected !== 'Statistics';
  //   default:
  //     return false;
  // }
  
  return selected == 'Games'
}

function TabNavigatorWrapper() {
  const { student } = useStore();
  const { logoutUser } = useAuthState();

  // Get the current active route from navigation state
  const state = useNavigationState((state) => state);
  const currentRouteName = state.routes[state.index]?.name || '';

  console.log('Current tab: ', state.routes, 'thats')

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Tab.Navigator initialRouteName="Main"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabbar,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={[{ marginHorizontal: 10 }, focused && styles.icon_focused]}>
                  <Image
                    source={getTabIcon(route.name, focused)}
                    style={styles.image}
                  />
                </View>

                {isShouldShowDiviver(route.name, currentRouteName, focused) && (
                  <View style={{ width: 3, height: 38, backgroundColor: '#161D21' }} />
                )}
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
  return <TabNavigatorWrapper />;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
  },
  tabbar: {
    position: 'absolute',
    bottom: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    backgroundColor: '#D8F207',
    borderRadius: 26,
    marginHorizontal: 14,
    borderTopWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    paddingHorizontal: 4,
  },
  icon_focused: {
    justifyContent: 'center',
    backgroundColor: '#161D21',
    borderRadius: 45,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 36,
    height: 36,
  },
});