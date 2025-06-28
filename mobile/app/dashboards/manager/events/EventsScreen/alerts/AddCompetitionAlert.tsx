import { useState } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from './CustomAlert';
import { View } from 'react-native-animatable';
import { SelectedField, Option } from '../../../../../shared/components/SelectedField';
import { TimeView } from './TimeView';
import { DateView } from './DateView';


export function AddCompetitionAlert() {
  const [isDate, setIsDate] = useState(false)
  const [isTime, setIsTime] = useState(false)

  const [dateTime, setDateTime] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)

  const [group1, setGroup1] = useState(0);
  const [group2, setGroup2] = useState(0);
  const [desc, setDesc] = useState('');

  const { isAddAlert, groups, group1_inx, group2_inx } = useStore();
  const { hideAddAlert, } = useStore();

   const groupNames: Option[] = groups.map(el => ({"id": el.id, "name": el.name}));

  function handleSave() {

  }

  return (
    <CustomAlert visible={isAddAlert} 
      title="Competition!"
      buttonText='Save'
      handleYes={handleSave}
      onClose={hideAddAlert}

      date='Mon 16'
      time='18:30'
      onDate={()=>(setIsDate(!isDate), setIsTime(false))}
      onTime={()=>(setIsTime(!isTime), setIsDate(false))}
      hideButtons={isTime || isDate}
    >
      {isDate && <DateView timestamp={dateTime} setDate={setDateTime}/>}
      {isTime && <TimeView hour={hour} minute={minute} setHour={setHour} setMinute={setMinute}/>}

      {!isTime && !isDate &&  <>
        <View style={styles.row}>
          <Text style={styles.label}>Groups: </Text>
          <View>
            <SelectedField data={groupNames} selectedIndex={group1_inx} onSelect={setGroup1}/>
            <SelectedField data={groupNames} selectedIndex={group2_inx} onSelect={setGroup2}/>
          </View>
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} multiline={true} textAlignVertical="top"
          keyboardType='name-phone-pad' maxLength={20} placeholder="Enter"
          value={desc} onChangeText={setDesc}
        />
      </>}
    </CustomAlert>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  label: {
    width: 140,
    fontSize: 16,
    color: 'gold',
    //marginHorizontal: 4,
    marginTop: 10,
  },
  date: {
    width: 140,
    fontSize: 16,
    color: 'green',
    marginHorizontal: 4,
  },
  input: {
    width: '100%',
    height: 72,
    backgroundColor: '#2E4A7C',
    color: '#eee',
    fontSize: 15,
    padding: 8,
    marginTop: 12,
    borderRadius: 8
  },
});