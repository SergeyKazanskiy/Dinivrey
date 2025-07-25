import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { useStore } from '../../store';
import { WrapperDialog } from './WrapperDialog';


export function AddNewDialog() {
  const { round_times, currentRound, isTimeSetter } = useStore();
  const { addNewPlayer, hideAddNewDialog } = useStore();
  
  const [name, setName] = useState('');


  return (
    <WrapperDialog
      visible={isTimeSetter} 
      title='Add a new Player'
      onClose={hideAddNewDialog}
    >
      <View style={styles.row}>
        <Text style={styles.label}>First name</Text>
        <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
            value={name}
            onChangeText={(text) => setName(text.trim())}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button title="ADD PLAYERS" buttonStyle={styles.greenBtn}
          onPress={() => (addNewPlayer(name), hideAddNewDialog())}
        />
      </View>
    </WrapperDialog>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
 buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 4,
    margin: 12,
  },
  greenBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 24,
    paddingHorizontal: 20,
  },
  label: {
        color: '#ccc',
        fontSize: 15,
        marginRight: 8,
    },
    value: {
        color: '#444',
        fontSize: 18,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginBottom: 4,
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'rgb(180, 216, 158)',
        minHeight: 30,
    },
});
