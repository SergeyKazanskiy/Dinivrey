import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, Animated, StyleSheet, Platform, ActivityIndicator} from 'react-native';


interface Props {
  visible: boolean;
  title: string;
}

export const LoadingAlert: React.FC<Props> = ({ visible, title }) => {
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
        <View style={styles.backdrop}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.alertBox, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.section}>
              <Text style={styles.title}>{title}</Text>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          </Animated.View>
          </TouchableWithoutFeedback>
        </View>
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
    marginHorizontal: 16,
    marginTop: 50,
    padding: 16,
    backgroundColor: '#152B52',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    borderRadius: 10,
  },
  title: {
    color: '#eee',
    fontSize: 17,
    fontWeight: '500',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
