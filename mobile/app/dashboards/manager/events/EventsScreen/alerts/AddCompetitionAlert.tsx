import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';
import { View } from 'react-native-animatable';
import { SelectedField, Option } from '../../../../../shared/components/SelectedField';


export function AddCompetitionAlert() {
  const [group1, setGroup1] = useState(0);
  const [group2, setGroup2] = useState(0);
  const [desc, setDesc] = useState('');

  const { isAddAlert, groups, group1_inx, group2_inx } = useStore();
  const { hideAddAlert, selectEventGroup1, selectEventGroup2 } = useStore();

   const groupNames: Option[] = groups.map(el => ({"id": el.id, "name": el.name}));

  function handleSave() {
    //addCoach(campId, firstName, secondName)
    setGroup1(0);
    setGroup2(0);
  }

  return (
    <CustomAlert visible={isAddAlert} 
        title="Add competition"
        buttonText='Save'
        handleYes={handleSave}
        onClose={hideAddAlert}>
          <View style={styles.row}>
            <Text style={styles.label}>Group 1:</Text>
            <SelectedField data={groupNames} selectedIndex={group1_inx} onSelect={selectEventGroup1}/>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Group 2:</Text>
            <SelectedField data={groupNames} selectedIndex={group2_inx} onSelect={selectEventGroup2}/>
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
              value={desc} onChangeText={setDesc}
          />
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
    marginTop: 16,
  },
  input: {
    width: '100%',
    height: 32,
    backgroundColor: '#2E4A7C',
    textAlign: 'left',
    color: '#eee',
    fontSize: 16,
    paddingLeft: 8,
    marginTop: 4,
  },
});