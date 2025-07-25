import { StyleSheet, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from './CustomAlert';
import { Team } from '../../model';


interface Props {
  team: Team;
  points: string;
  onFixPoints: () => void;
  onGoBack: () => void;
}

export function CheckingAlert({ team, points, onFixPoints, onGoBack}: Props) {
  const { isCheckingAlert } = useStore();

  return (
    <CustomAlert
      visible={isCheckingAlert} 
      buttonText='FIX POINTS'
      handleYes={onFixPoints}
      buttonText2='GO BACK'
      onClose={onGoBack}
    >
        <Text style={styles.title}>There is a difference between pointsfix the points</Text>
        <Text style={styles.team}>{team} -</Text>
        <Text style={styles.text}>{points} points difference</Text>
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 4,
  },
  team: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
});

