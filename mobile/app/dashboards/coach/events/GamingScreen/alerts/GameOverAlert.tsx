import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from './CustomAlert';
import { Team } from '../../model';


interface Props {
  team: Team;
  onNo: () => void;
  onYes: () => void;
}

export function GameOverAlert({ onNo, onYes, team}: Props) {
  const { isGameOverAlert } = useStore();

  return (
    <CustomAlert visible={isGameOverAlert} 
      buttonText='NO'
      buttonText2='YES'
      handleYes={onNo}
      onClose={onYes}>
        {/* <Text style={styles.title}>The game is over</Text> */}
        <Text style={styles.title}>{'The ' + team + ' team won!'}</Text>
        <Text style={styles.text}>Want to start the next game?</Text>
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

