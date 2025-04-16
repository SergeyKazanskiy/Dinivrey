import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function CoachLayout() {
  return (
    <Drawer
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: true,
        drawerStyle: { width: 240 },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: 'Trainer Dashboard',
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Trainer Settings',
        }}
      />
    </Drawer>
  );
}
