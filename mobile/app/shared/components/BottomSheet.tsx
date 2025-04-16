import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function BottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useSharedValue(300);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const toggleSheet = () => {
    if (isOpen) {
      translateY.value = withSpring(300);
    } else {
      translateY.value = withSpring(0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button title={isOpen ? 'Close Sheet' : 'Open Sheet'} onPress={toggleSheet} />
      <Animated.View style={[styles.sheet, animatedStyle]}>
        <Text style={styles.text}>Select achievement</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 18,
  },
});
