import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from '../../../../shared/components/CustomButton';
import { useStore } from '../../store';
import { WrapperDialog } from './WrapperDialog';


export function AddNewDialog() {
  const { isAddNewDialog } = useStore();
  const { addNewPlayer, hideAddNewDialog } = useStore();
  
  const [name, setName] = useState('');


  return (
    <WrapperDialog
      visible={isAddNewDialog} 
      title='Add a new Player'
      onClose={()=>(hideAddNewDialog(), setName(''))}
    >
      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.value} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
            value={name}
            onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button title="ADD PLAYER" buttonStyle={styles.greenBtn}
          onPress={() => (addNewPlayer(name), hideAddNewDialog(), setName(''))}
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
