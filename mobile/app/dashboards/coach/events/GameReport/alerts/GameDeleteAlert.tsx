import { StyleSheet, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';


interface Props {
  onDelete: () => void;
}

export function GameDeleteAlert({ onDelete }: Props) {
  const { isGameDeleteAlert } = useStore();
  const { hideGameDeleteAlert } = useStore();

  return (
    <CustomAlert visible={isGameDeleteAlert} 
      title="Attention! Really delete?"
      buttonText='Yes'
      handleYes={() => {onDelete(); hideGameDeleteAlert()}}
      onClose={hideGameDeleteAlert}>
      <Text style={styles.alertText}>All game data will be removed from statistics.</Text>
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  alertText: {
    fontSize: 15,
    color: '#ddd'
  },
});

