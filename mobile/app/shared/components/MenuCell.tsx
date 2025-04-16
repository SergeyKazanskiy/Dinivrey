import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { menuStyles, checkboxStyles } from '../styles/appStyles';
import Checkbox from 'expo-checkbox';


export type Props = {
  title: string;
};
  
export const MenuCell: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.container}>
        <Text style={menuStyles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: menuStyles.background.color,
    opacity: 0.8,
    padding: 16,
    marginBottom: 16
  },
});

