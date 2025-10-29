import React, { useEffect, useRef } from 'react';
import { View, Modal, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet, Platform, Text} from 'react-native';
import { Icon } from '../../shared/components/CustomIcon';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Direction = 'bottom' | 'left' | 'right';

interface Props {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  direction?: Direction; // <- добавлено
}

export const PopupWrapper: React.FC<Props> = ({ visible, title, children, onClose, direction = 'bottom' }) => {
  const translateAnim = useRef(new Animated.Value(getInitialValue(direction))).current;

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: visible ? 0 : getInitialValue(direction),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  function getInitialValue(direction: Direction) {
    switch (direction) {
      case 'left':
        return -SCREEN_WIDTH;
      case 'right':
        return SCREEN_WIDTH;
      case 'bottom':
        return SCREEN_HEIGHT;
      default:
        return SCREEN_HEIGHT;
    }
  }

  function getTransformStyle() {
    switch (direction) {
      case 'left':
      case 'right':
        return {
          transform: [
            {
              translateX: translateAnim.interpolate({
                inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                outputRange: [direction === 'left' ? 0 : 0, 0, 0],
              }),
            },
          ],
        };
      case 'bottom':
      default:
        return {
          transform: [
            {
              translateY: translateAnim.interpolate({
                inputRange: [250, SCREEN_HEIGHT],
                outputRange: [0, SCREEN_HEIGHT],
              }),
            },
          ],
        };
    }
  }

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modal,
          direction === 'left' || direction === 'right' ? styles.horizontalModal : {},
          getTransformStyle(),
        ]}
      >
        <View style={styles.header}>
        <Text style={styles.title}>  </Text>
          <Text style={styles.title}>{title}</Text>
          <Icon size={20} color="#D1FF4D" name="close" onPress={onClose} />
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
    height: Platform.OS === 'web' ? 358 : SCREEN_HEIGHT - 8,
    width: Platform.OS === 'web' ? 760 : '100%',
    backgroundColor: '#152B52',
    borderRadius: 16,
    paddingTop: 16,
    //margin: 8,
  },
  horizontalModal: {
    top: 0,
    bottom: 0,
    height: '100%',
    width: SCREEN_WIDTH - 4,
    position: 'absolute',
    backgroundColor: '#4169E1',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 5,
    padding: 20
  },
  title: {
    color: '#D1FF4D',
    fontSize: 20,
    fontWeight: '400',
  },
});
