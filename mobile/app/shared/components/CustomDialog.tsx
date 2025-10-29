import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { Button } from '../../shared/components/CustomButton';


interface Props {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  buttonText1: string;
  buttonText2: string;

  onButton1: () => void;
  onButton2: () => void;
}

export const CustomDialog: React.FC<Props> =
  ({ visible, title, children, buttonText1, buttonText2, onButton1, onButton2 }) => {

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onButton1}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.dialog,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>

          <View style={styles.content}>{children}</View>
          <View style={styles.actions}>
            <Button title={buttonText1} type='solid' 
              buttonStyle={styles.button} titleStyle={styles.buttonText}
              onPress={() => onButton1()}
            />
            <Button title={buttonText2} type='solid' 
              buttonStyle={styles.button} titleStyle={styles.buttonText}
              onPress={() => onButton2()}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    ...(Platform.OS === 'web' ? { width: 360, alignSelf: 'flex-start' } : {}),
    
  },
  dialog: {
    marginTop: 164,
    backgroundColor: '#AFEEEE', //E0FFFF
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginHorizontal: 28,
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  content: {
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
    marginTop: 4
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#2E4A7C',
  },
  buttonText: {
    fontSize: 15,
    color: '#ddd'
  },
});

