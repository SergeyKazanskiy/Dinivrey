import { StyleSheet, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from './CustomAlert';
import { Team } from '../../model';


interface Props {
  team: Team;
  points: number;
  onFixPoints: () => void;
  onGoBack: () => void;
}

export function CheckingAlert({ team, points, onFixPoints, onGoBack}: Props) {
  const { isCheckingAlert, currentTeam } = useStore();

  const teamColor = currentTeam === Team.RED ? 'red' : 'green'

  return (
    <CustomAlert
      visible={isCheckingAlert} 
      buttonText='FIX POINTS'
      handleYes={onFixPoints}
      buttonText2='GO BACK'
      onClose={onGoBack}
    >
        <Text style={styles.title}>There is a difference between points</Text>
        <Text style={styles.title}>fix the points</Text>
        <Text style={[styles.team, {color: teamColor}]}>{team} -</Text>
        <Text style={styles.text}>{points} points difference</Text>
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    color: '#ddd',
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 4,
  },
  team: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 4,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
});

