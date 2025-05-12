import React, { useEffect, useRef } from 'react';
import { View, Modal, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import { Text, Icon } from '@rneui/themed';

const SCREEN_HEIGHT = Dimensions.get('window').height;


interface Props {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const BottomModal: React.FC<Props> = ({ visible, title, children, onClose }) => {
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  
    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: visible ? 80 : SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [visible]);
  
    const animatedStyle = {
      transform: [{
        translateY: slideAnim.interpolate({
          inputRange: [80, SCREEN_HEIGHT],
          outputRange: [0, SCREEN_HEIGHT - 80],
          extrapolate: 'clamp',
        }),
      }],
    };
  
    return (
      <Modal transparent visible={visible} animationType="none">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.modal, animatedStyle]}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Icon size={20} color='#D1FF4D' name="close" onPress={onClose} />
          </View>
          {children}
        </Animated.View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: '#00000055',
    },
    modal: {
      position: 'absolute',
      bottom: 0,
      height: SCREEN_HEIGHT - 100,
      width: Platform.OS === 'web' ? 336 : '100%',
      backgroundColor: '#4169E1',
      borderRadius: 16,
      padding: 16,
      margin: 12
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      color: '#D1FF4D',
      fontSize: 20,
      fontWeight: '400',
    },
  });