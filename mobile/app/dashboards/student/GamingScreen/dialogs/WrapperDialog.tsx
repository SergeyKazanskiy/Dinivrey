import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { Icon } from '../../../../shared/components/CustomIcon';


interface Props {
  visible: boolean;
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export const WrapperDialog: React.FC<Props> = ({ visible, children, title, onClose }) => {
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

            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={{width: 20}}>   </Text>
                <Text style={styles.title}>{title}</Text>
                <Icon size={20} color="#D1FF4D" name="close" onPress={onClose}/>
              </View>

              {children}
             </View>
            
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
    ...(Platform.OS === 'web' ? { width: 748, alignSelf: 'flex-start' } : {}),
  },
  alertBox: {
    marginTop: 60,
    width: 348,
    margin: 'auto',
    padding: 20,
    backgroundColor: '#0e1d38ff',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 4,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 120,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: '#eee',
    fontWeight: '500',
    fontSize: 14
  },
  avatar: {
    width: 68,
    height: 68,
  },
});
