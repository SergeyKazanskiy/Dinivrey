import React from 'react';
import { DraverMenu } from './DraverMenu';
import { Stack } from 'expo-router';
import { useStore } from './store';


export default function StudentLayout() {
  const { isGamingScreen } = useStore();

  return <DraverMenu />;
  // return (
  //   <Stack screenOptions={{ headerShown: false }}>
  //     {isGamingScreen ? (
  //       <Stack.Screen
  //         name="gaming"
  //         options={{ headerShown: false }}
  //       />
  //     ) : (
  //       <Stack.Screen
  //         name="(drawer)"
  //         options={{ headerShown: false }}
  //       >
  //         {() => <DraverMenu />}
  //       </Stack.Screen>
  //     )}
  //   </Stack>
  // );
  // if (isGamingScreen) {
  //   // Показываем экран gaming как отдельный экран в Stack — он должен быть в app/dashboards/student/gaming.tsx
  //   return <Stack screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="gaming" />
  //   </Stack>;
  // }

  // // По умолчанию показываем Drawer (он тоже должен быть layout в app/dashboards/student/(drawer)/_layout.tsx)
  // return <Stack screenOptions={{ headerShown: false }}>
  //   <Stack.Screen name="(drawer)" />
  // </Stack>;
}

 // const { isGamingScreen } = useStore();

  // return (
  //   <>
  //     {isGamingScreen && <Stack/>}
  //     {!isGamingScreen  && <DraverMenu />}
  //   </>
  // );

  //   return (
  //   <Stack screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="index" />
  //   </Stack>
  // );