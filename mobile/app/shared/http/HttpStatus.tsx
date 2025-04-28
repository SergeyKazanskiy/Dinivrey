import { useSharedHttpClient } from './httpClient';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';


export const HttpStatus = () => {
  const { isLoading } = useSharedHttpClient();
  if (!isLoading) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.blocker} pointerEvents="auto" />
      <View style={styles.toast}>
        <ActivityIndicator size="small" color="#fff" />
        <Text style={styles.toastText}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  blocker: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  toast: {
    position: 'absolute',
    bottom: 40,
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

