import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';
import { View } from 'react-native-animatable';


export function AddGroupAlert() {
  const [name, setName] = useState("");

  const { camp_id, isAddGroupAlert } = useStore();
  const { createGroup, hideAddGroupAlert } = useStore();

  function handleSave() {
    createGroup(camp_id, name)
    setName('');
  }

  return (
    <CustomAlert visible={isAddGroupAlert} 
        title="Adding new group"
        buttonText='Save'
        handleYes={handleSave}
        onClose={hideAddGroupAlert}>
          <View style={styles.row}>
            <Text style={styles.label}>Group name:</Text>
            <TextInput style={styles.input} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                value={name} onChangeText={setName}
            />
          </View>
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  label: {
    width: 168,
    fontSize: 16,
    color: 'gold',
    //marginHorizontal: 4,
    marginTop: 6,
  },
  input: {
    width: '100%',
    height: 32,
    backgroundColor: '#2E4A7C',
    textAlign: 'left',
    color: '#eee',
    fontSize: 16,
    paddingLeft: 8,
  },
});