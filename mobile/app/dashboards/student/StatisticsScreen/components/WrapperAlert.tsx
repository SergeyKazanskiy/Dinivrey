import { useEffect, useRef } from 'react';
import { Modal, View, TouchableWithoutFeedback, Animated, StyleSheet, Platform } from 'react-native';


interface Props {
  visible: boolean
  children: React.ReactNode;
  onClose: () => void;
}

export const WrapperAlert: React.FC<Props> = ({ visible, children, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 5 : -16,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.alertBox, { transform: [{ translateY: slideAnim }] }]}>
            {children}
          </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    ...(Platform.OS === 'web' ? { width: 360, alignSelf: 'flex-start' } : {}),
  },
  alertBox: {
    marginHorizontal: 12,
    marginTop: 200,
    elevation: 5,
  },
});
