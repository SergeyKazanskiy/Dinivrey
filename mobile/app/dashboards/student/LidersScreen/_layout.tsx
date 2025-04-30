import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { menuStyles, screenStyles } from '../../../shared/styles/appStyles';


export default function StackLayout() {
  const navigation = useNavigation();

  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          headerTitle: "Liders",
          headerStyle: {
            backgroundColor: screenStyles.background.backgroundColor, // Фон заголовка
          },
          headerTintColor: '#D1FF4D', // Цвет текста заголовка
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold', // Стиль текста
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <Ionicons name="menu" size={24} color='#D1FF4D' style={{ marginLeft: 12 }}
                onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
              />
            );
          },
        }}
      />
      <Stack.Screen name="GroupsScreen"
        options={{
          animation: 'slide_from_right',
          headerTitle: "Groups",
          headerStyle: {
            backgroundColor: screenStyles.background.backgroundColor, // Фон заголовка
          },
          headerTintColor: '#D1FF4D', // Цвет текста заголовка
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold', // Стиль текста
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}


