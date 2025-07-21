import React from 'react';
import { Drawer } from 'expo-router/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { DrawerHeader } from './DrawerHeader2';
import { menuStyles, screenStyles } from '../../shared/styles/appStyles';


export function DraverMenu() {
  return (
    <GestureHandlerRootView style={{ flex: 1, width: 360, backgroundColor: 'red' }}>
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
          drawerActiveBackgroundColor: 'rgba(118, 182, 234, 0.8)',//152B52
          drawerActiveTintColor: 'yellow',
          drawerInactiveTintColor: menuStyles.title.color,
          drawerInactiveBackgroundColor: 'rgba(118, 182, 234, 0.8)', //
          drawerItemStyle: {marginVertical: 6, borderRadius: 4,},
          drawerLabelStyle: {fontSize: menuStyles.title.fontSize,fontWeight: menuStyles.title.fontWeight},
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
      <Drawer.Screen name="StatisticsScreen/index"
        options={{
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
          headerShown: false, // Отключаем заголовок
          title: 'Schedule',
          drawerIcon: ({ size, color}) => (
            <Ionicons name='shield-checkmark-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen name="LidersScreen"
        options={{
          headerShown: false, // Отключаем заголовок
         // headerTitle: 'Liderboard',
          title: 'Liderboard', 
          drawerIcon: ({ size, color}) => (
            <Ionicons name='medal-outline' size={size} color={color} />
          )
        }}
      />
      </Drawer>
    </GestureHandlerRootView>
  );
}
