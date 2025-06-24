import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';
import { View } from 'react-native-animatable';


export function AddCoachAlert() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  const { campId, isAddAlert } = useStore();
  const { addCoach, hideAddAlert } = useStore();

  function handleSave() {
    addCoach(campId, firstName, secondName)
    setFirstName('');
    setSecondName('');
  }

  return (
    <CustomAlert visible={isAddAlert} 
        title="Adding new coach"
        buttonText='Save'
        handleYes={handleSave}
        onClose={hideAddAlert}>
          <View style={styles.row}>
            <Text style={styles.label}>First name:</Text>
            <TextInput style={styles.input} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                value={firstName} onChangeText={setFirstName}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Last name:</Text>
            <TextInput style={styles.input} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
                value={secondName} onChangeText={setSecondName}
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
    width: 140,
    fontSize: 16,
    color: 'gold',
    marginHorizontal: 4,
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