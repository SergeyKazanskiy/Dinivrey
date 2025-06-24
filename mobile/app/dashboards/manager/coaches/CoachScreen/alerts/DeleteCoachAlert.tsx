import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';

interface Props {
  onDelete: () => void;
}

export function DeleteCoachAlert({ onDelete }: Props) {
  const { coach_id, isDeleteAlert } = useStore();
  const { deleteCoach, hideDeleteAlert } = useStore();

  return (
    <CustomAlert visible={isDeleteAlert} 
        title="Attention! Really delete?"
        buttonText='Delete'
        handleYes={() => (deleteCoach(coach_id), onDelete())}
        onClose={hideDeleteAlert}>
            <Text style={styles.text}>All coach data will be deleted.</Text>
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