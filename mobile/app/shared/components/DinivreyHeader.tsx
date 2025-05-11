import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

  
export const DinivreyHeader: React.FC = () => {
  return (
    <View style={styles.cell}>
      <Text style={styles.icon}>🏆</Text>  
      <Text style={styles.title}>DINIVREY</Text>
      <Text style={styles.icon}>🏆</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flexDirection:'row',
    justifyContent: 'space-around',
    backgroundColor: '#152B52'
  },
  title: {
    fontWeight: '600',
    fontSize: 28,
    color: '#c2ff00',//#D1FF4D, c2ff00
  },
  icon: {
    paddingTop: 4,
    fontSize: 22,
  },
});

