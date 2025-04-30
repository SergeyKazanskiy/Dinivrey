import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { menuStyles, screenStyles } from '../../../shared/styles/appStyles';


export default function StackLayout() {
  const navigation = useNavigation();
  const router = useRouter();

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
              <>
                <Ionicons name="menu" size={24} color='#D1FF4D' style={{ marginLeft: 16 }}
                  onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
                />
                <Ionicons name='chevron-back' size={20} color='#D1FF4D' style={{ marginLeft: 22 }}
                  onPress={() => router.back()}
                />
              </>
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


