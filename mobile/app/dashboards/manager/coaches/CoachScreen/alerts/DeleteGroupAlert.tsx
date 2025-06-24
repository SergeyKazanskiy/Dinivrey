import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';


export function DeleteGroupAlert() {
  const { isGroupDeleteAlert } = useStore();
  const { removeGroup, hideGroupDeleteAlert } = useStore();

  return (
    <CustomAlert visible={isGroupDeleteAlert} 
      title="Attention! Really remove?"
      buttonText='Delete'
      handleYes={removeGroup}
      onClose={hideGroupDeleteAlert}>

      <Text style={styles.text}>Removing group will delete schedule with this group.</Text>
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