import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import { screenStyles } from '../../../shared/styles/appStyles';


export default function StackLayout() {

    useFocusEffect(
      useCallback(() => {
        //alert('kkk')
      }, [])
    );

  return (
    <Stack>
      <Stack.Screen name="GroupScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
/*
options={{
          animation: 'slide_from_right',
          headerTitle: "Student",
          headerStyle: {
            backgroundColor: screenStyles.background.backgroundColor, 
          },
          headerTintColor: '#D1FF4D', 
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold', 
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
          */