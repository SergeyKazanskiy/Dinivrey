import React from 'react';
import { Drawer } from 'expo-router/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { DrawerHeader } from './DrawerHeader';
import { menuStyles, screenStyles } from '../../shared/styles/appStyles';
import { ImageBackground, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';


export function DraverMenu() {
  return (
    <GestureHandlerRootView style={{ flex: 1, width: 360, }}>
      <Drawer drawerContent={DrawerHeader} initialRouteName="ProfileScreen/index"
        screenOptions={{
          headerShown: true, // Показываем или скрываем верхний заголовок
          headerStyle: {
            backgroundColor: screenStyles.background.backgroundColor, // Задаем цвет фона заголовка
          },
          headerTintColor: '#D1FF4D', // Цвет текста и кнопок в заголовке
          headerTitleStyle: {
            fontWeight: 'bold', // Дополнительно, можно задать стили текста заголовка
            fontSize: 22,
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          drawerStyle: { width: 300},
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: menuStyles.activeBackground.color,
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: menuStyles.title.color,
          drawerInactiveBackgroundColor: menuStyles.background.color,
          drawerItemStyle: {marginVertical: 6,},
          drawerLabelStyle: {
            fontSize: menuStyles.title.fontSize,
            fontWeight: menuStyles.title.fontWeight
          },
      }}>

        {/* Menu */}
      <Drawer.Screen
        name="ProfileScreen/index"
        options={{
          headerTitle: 'Welcome!',
          title: 'Main', 
          drawerIcon: ({ size, color}) => (
            <Ionicons name='home-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="StatisticsScreen/index"
        options={{
          headerTitle: 'Statistics',
          title: 'Statistics', 
          drawerIcon: ({ size, color}) => (
            <Ionicons name='stats-chart-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="AchievesScreen/index"
        options={{
          headerTitle: 'Achievements',
          title: 'Achievements', 
          drawerIcon: ({ size, color}) => (
            <Ionicons name='diamond-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="EventsScreen" 
        options={{
          headerShown: false, // Отключаем заголовок
          title: 'Schedule',
          drawerIcon: ({ size, color}) => (
            <Ionicons name='shield-checkmark-outline' size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="LidersScreen"
        options={{
          headerTitle: 'Liderboard',
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
/*
diamond-outline
*/