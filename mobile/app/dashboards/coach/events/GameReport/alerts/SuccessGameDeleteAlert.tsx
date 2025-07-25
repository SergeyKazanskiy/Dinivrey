import { StyleSheet, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';


interface Props {
  onClose: () => void;
}

export function SuccessGameDeleteAlert({ onClose }: Props) {
  const { isGameSuccessDeleteAlert } = useStore();
  const { hideGameDeleteAlert } = useStore();

  return (
    <CustomAlert visible={isGameSuccessDeleteAlert} 
      title="Success!"
      onClose={() => (hideGameDeleteAlert(), onClose())}>
      <Text style={styles.alertText}>The game has been successfully removed.</Text>
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  alertText: {
    fontSize: 15,
    color: '#ddd'
  },
});

