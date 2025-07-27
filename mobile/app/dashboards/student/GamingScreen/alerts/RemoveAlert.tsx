import { StyleSheet, Text } from 'react-native';
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
    <CustomAlert
      visible={isRemoveAlert} 
      buttonText='REMOVE'
      handleYes={onRemove}
      onClose={onCancel}
    >
        <Text style={styles.title}>Are you sure you want to delete?</Text>
        <Text style={styles.text}>{name}</Text>
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
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
});

