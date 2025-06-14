import { Stack } from 'expo-router';


export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="CoachesScreen"
        options={{ headerShown: false }}
      />
       <Stack.Screen name="CoacheScreen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
