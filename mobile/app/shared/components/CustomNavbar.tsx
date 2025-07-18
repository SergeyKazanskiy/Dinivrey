import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export type Props = {
  title: string;
  onClick: () => void;
  children?: React.ReactNode;
};
  
export const CustomNavbar: React.FC<Props> = ({ title, onClick, children }) => {
  return (
    <View style={styles.container}>
        <Ionicons name='chevron-back' size={20} color='#D1FF4D' style={styles.backIcons}
          onPress={onClick}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View  style={styles.iconsWrapper}>
          {children}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    paddingVertical: 16,
    backgroundColor: '#152B52',

    justifyContent: 'center',
    position: 'relative',
    height: 56
  },
  backIcons: {
    position: 'absolute',
    left: 20,
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none', // чтобы не блокировать нажатия на иконки
  },
  iconsWrapper: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
   // gap: 26, // если используешь RN >= 0.71
  },
  center: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontWeight: '400',
    fontSize: 22,
    color: '#D1FF4D',
  },
});

