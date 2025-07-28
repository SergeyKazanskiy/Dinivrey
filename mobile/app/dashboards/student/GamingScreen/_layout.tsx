import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { menuStyles, screenStyles } from '../../../shared/styles/appStyles';
import { useStore } from '../store';
import { Platform } from 'react-native';


export default function StackLayout() {
  const navigation = useNavigation();
  const router = useRouter();

  const { isBackDrawer, setBackDrawer, setGamingScreen } = useStore();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          flex: 1,
          alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
          maxWidth: Platform.OS === 'web' ? 760 : undefined,
        },
      }}>
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
                {isBackDrawer && <Ionicons name="menu" size={24} color='#D1FF4D' style={{ marginLeft: 16 }}
                  onPress={() => {navigation.dispatch(DrawerActions.openDrawer())} }
                />}
                {!isBackDrawer && <Ionicons name='chevron-back' size={20} color='#D1FF4D' style={{ marginLeft: 22 }}
                  onPress={() => (router.back(), setBackDrawer(true))}
                />}
              </>
            );
          },
        }}
      />
    </Stack>
  );
}


