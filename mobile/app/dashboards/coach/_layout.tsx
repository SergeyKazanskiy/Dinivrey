import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useAuthState } from '../../shared/http/state';
import LoginScreen from '../../shared/http/LoginScreen';
import { ActivityIndicator, View } from 'react-native';


export default function RootLayout() {
  const { isLogin, restoreAuth } = useAuthState();

  useEffect(() => {
    restoreAuth();
  }, []);

  if (isLogin === false) {
    return <LoginScreen role='coach' />;
  }

  if (isLogin === true) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}
