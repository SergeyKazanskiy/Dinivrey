import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Platform} from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';


interface Props {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  handleYes?: () => void;
  buttonText?: string;
  onClose?: () => void;

  date: string;
  time1: string;
  time2: string;

  onDate: () => void;
  onTime: (isStart: boolean) => void;

  isDate: boolean;
  isTime: boolean;
  isStart: boolean
}

export const CustomAlert: React.FC<Props> = ({ visible, title, children, handleYes, buttonText, onClose,
    date, time1, time2, onDate, onTime, isTime, isDate, isStart }) => {
    
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
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.alertBox, { transform: [{ translateY: slideAnim }] }]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>{title}</Text>

              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={[styles.date, isDate && {backgroundColor: '#2E4A7C'}]}
                  onPress={onDate}>{date}</Text>

                <Text style={[styles.time, isTime && isStart && {backgroundColor: '#2E4A7C'}]}
                  onPress={() => onTime(true)}>{time1}</Text>
                <Text style={{color: '#ccc', paddingTop: 3}}>-</Text>
                <Text style={[styles.time, isTime && !isStart && {backgroundColor: '#2E4A7C'}]}
                  onPress={() => onTime(false)}>{time2}</Text>
              </View>
            </View>

            <View style={styles.content}>{children}</View>

            {!isDate && !isTime &&
              <View style={styles.buttonRow}>
                {handleYes && buttonText && (
                  <TouchableOpacity style={styles.button} onPress={handleYes}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            }
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
    marginHorizontal: 8,
    marginTop: 50,
    padding: 12,
    backgroundColor: '#152B52',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    paddingTop: 4,
    marginBottom: 12,
  },
  content: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#3478f6',
    borderRadius: 5,
  },
  buttonText: {
    color: '#eee',
    fontWeight: '500',
  },
  date: {
    fontSize: 15,
    color: 'yellow',
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 12,
    height: 28,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8
  },
  time: {
    fontSize: 14,
    color: '#A4FAAA',
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: 28,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8
  },
});
