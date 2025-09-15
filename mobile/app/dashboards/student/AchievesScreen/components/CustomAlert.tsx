import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, Animated, StyleSheet, TouchableOpacity, Platform} from 'react-native';

interface Props {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const CustomAlert: React.FC<Props> = ({ visible, title, children, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-16)).current;
  const top = 5;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? top : -16,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType='fade'>
      <TouchableWithoutFeedback  onPress={onClose}>
        <View style={styles.backdrop}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.alertBox, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.buttonRow}>
              <Text style={styles.title}> </Text>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>DONE</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>{children}</View>

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
    //backgroundColor: '#0006',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    ...(Platform.OS === 'web' ? { width: 360, alignSelf: 'flex-start' } : {}),
  },
  alertBox: {
    marginHorizontal: 8,
    marginTop: 50,
    padding: 20,
    backgroundColor: '#0d1a32ff',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 16,
  },
  content: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    height: 20,
    width: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginTop: 4
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 10,
    color: '#000',
    fontWeight: '700',
    paddingTop: 3,
  },
});
