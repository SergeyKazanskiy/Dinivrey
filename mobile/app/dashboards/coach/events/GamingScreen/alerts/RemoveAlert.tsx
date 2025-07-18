import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from './CustomAlert';


interface Props {
  name: string;
  onCancel: () => void;
  onRemove: () => void;
}

export function RemoveAlert({ name, onCancel, onRemove}: Props) {
  const { isRemoveAlert } = useStore();

  return (
    <CustomAlert visible={isRemoveAlert} 
      title={name}
      handleYes={onRemove}
      onClose={onCancel}>
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#ccc',
    marginHorizontal: 4,
  },
});

