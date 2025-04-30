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
          headerTitle: "Schedule",
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
      <Stack.Screen name="GameScreen"
        options={{
          animation: 'slide_from_right',
          headerTitle: "Game",
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

/*
<Stack
      screenOptions={({ route }) => ({
        //headerShown: true,
        //headerBackTitleVisible: false,
        //animation: 'slide_from_right', //fade
        headerTitle: "Profile",
        headerLeft: route.name === 'index' ? ({ tintColor }) => (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <MaterialIcons name="menu" size={24} color={tintColor || 'black'} />
          </Pressable>
        ) : undefined,
      })}
    />
    */