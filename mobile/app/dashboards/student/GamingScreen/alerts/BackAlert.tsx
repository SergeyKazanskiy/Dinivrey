import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from './CustomAlert';


interface Props {
  onCancel: () => void;
  onBack: () => void;
}

export function BackAlert({ onCancel, onBack}: Props) {
  const { isBackAlert } = useStore();

  return (
    <CustomAlert visible={isBackAlert} 
      buttonText='BACK'
      handleYes={onBack}
      onClose={onCancel}>
        <Text style={styles.title}>Are you sure you want to exit?</Text>
        <Text style={styles.text}>All entered data will be lost.</Text>
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 4,
  },
  text: {
    fontSize: 18,
    color: '#ccc',
    marginHorizontal: 4,
    marginBottom: 12
  },
});

