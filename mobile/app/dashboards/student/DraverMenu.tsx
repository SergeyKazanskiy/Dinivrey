import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerHeader } from './DrawerHeader2';
import { menuStyles, screenStyles } from '../../shared/styles/appStyles';
import { useStore } from './store';


export function DraverMenu() {
  const { isGamingScreen } = useStore();
  const w = isGamingScreen ? 760 : 360;
  
  return (
    <GestureHandlerRootView style={{ flex: 1, width: w, backgroundColor: '#2E4A7C' }}>
      <Drawer drawerContent={DrawerHeader} initialRouteName="ProfileScreen/index"
        screenOptions={{
          headerShown: true, 
          headerStyle: { backgroundColor: screenStyles.background.backgroundColor },
          headerTintColor: '#D1FF4D', 
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
          headerTitleAlign: 'center',
          headerShadowVisible: false,

          drawerStyle: { width: 320},
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: '#D1FF4D',//152B52
          drawerActiveTintColor: '#222',
          drawerInactiveTintColor: '#fff',
          drawerInactiveBackgroundColor: '#2E4A7C', //
          drawerItemStyle: {marginVertical: 4, borderRadius: 4,},
          drawerLabelStyle: {fontSize: menuStyles.title.fontSize, fontWeight: menuStyles.title.fontWeight},
      }}>

      <Drawer.Screen name="ProfileScreen/index"
        options={{
          headerTitle: 'Welcome!',
          title: 'Main', 
          drawerIcon: ({ size, color}) => (
            <Ionicons name='home-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen name="StatisticsScreen"
        options={{
          headerShown: false, 
          headerTitle: 'Statistics',
          title: 'Statistics', 
          drawerIcon: ({ size, color}) => (
            <Ionicons name='stats-chart-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen name="AchievesScreen/index"
        options={{
          headerTitle: 'Achievements',
          title: 'Achievements', 
          drawerIcon: ({ size, color}) => (
            <Ionicons name='diamond-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen name="EventsScreen" 
        options={{
          headerShown: false,
          title: 'Schedule',
          drawerIcon: ({ size, color}) => (
            <Ionicons name="calendar-outline" size={size} color={color}/>
            // <Ionicons name='shield-checkmark-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen name="LidersScreen"
        options={{
          headerShown: false,
          title: 'Liderboard', 
          drawerIcon: ({ size, color}) => (
            <Ionicons name='medal-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen name="GamesScreen"
        options={{
          headerShown: false, 
          title: 'Games', 
          drawerIcon: ({ size, color}) => (
            <MaterialCommunityIcons name="crown-outline" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen name="GamingScreen"
        options={{
          headerShown: false, 
          title: 'Gaming', 
          drawerIcon: ({ size, color}) => (
            <MaterialCommunityIcons name="trophy-outline" size={size} color={color} />
          ),
          drawerItemStyle: { display: 'none' }
        }}
      />
      </Drawer>
    </GestureHandlerRootView>
  );
}
