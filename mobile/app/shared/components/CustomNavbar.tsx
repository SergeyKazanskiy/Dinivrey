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
    <View style={styles.cell}>
        <Ionicons name='chevron-back' size={20} color='#D1FF4D' style={{ marginLeft: 22, marginTop: 4 }}
          onPress={onClick}
        />
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View  style={{ width: 44, marginTop: 4 }}>
          {children}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flexDirection:'row',
    paddingVertical: 16,
    backgroundColor: '#152B52'
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

