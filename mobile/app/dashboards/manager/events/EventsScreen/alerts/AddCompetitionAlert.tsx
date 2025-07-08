import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import { useStore } from '../../store';
import { CustomAlert } from './CustomAlert';
import { View } from 'react-native-animatable';
import { SelectedField, Option } from '../../../../../shared/components/SelectedField';
import { TimeView } from './TimeView';
import { DateView } from './DateView';
import { formatDateTime, getWeekHourMinute, getTimestamp, getYearAndMonth } from '../../../../../shared/utils';


export const AddCompetitionAlert = () => {
  const { isAddAlert, groups, camp_id, event_id, filtredEvents, year, month, today } = useStore();
  const { hideAddAlert, addEvent, updateEvent} = useStore();

  const [isDate, setIsDate] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [isError, setIsError] = useState(false);

  const [timestamp, setTimestamp] = useState(0);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(16);
  const [minute, setMinute] = useState(0);
  const [group1_inx, setGroup1] = useState(-1);
  const [group2_inx, setGroup2] = useState(-1);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (event_id > 0) {
      const event = filtredEvents.find(el => el.id === event_id)
      
      if (event) {
        const group1_inx = groups.findIndex(el => el.id === event.group1_id)
        const group2_inx = groups.findIndex(el => el.id === event.group2_id)
        const hour = getWeekHourMinute(event.timestamp).hours
        const minute = getWeekHourMinute(event.timestamp).minutes

        setTimestamp(event.timestamp);
        setHour(hour);
        setMinute(minute);
        setGroup1(group1_inx);
        setGroup2(group2_inx);
        setDesc(event.desc);
      }
    } else {
      const {year: currentYear, month: currentMonth} = getYearAndMonth(today)
      if (currentYear == year && currentMonth == month) {
        setTimestamp(today);
      } else {
        setTimestamp(getTimestamp(year, month));
      }
      setDesc('');
    }
  }, [event_id]);

  function handleSave() {
    const group1_id = groups[group1_inx]?.id || 0;
    const group2_id = groups[group2_inx]?.id || 0;

    if (group1_id === 0 || group2_id === 0) {
      setIsError(true);
      setTimeout(() => {setIsError(false)}, 2000);
      return
    }
    const newDate = new Date(year, month - 1, day, hour, minute);
    const newTimestamp = newDate.getTime();

    if (event_id === 0) {
      addEvent({ camp_id, timestamp: newTimestamp, type: "Game", desc, group1_id, group2_id });
    } else {
      updateEvent({ id: event_id, camp_id, timestamp: newTimestamp, type: "Game", desc, group1_id, group2_id });
    }
  }

  const groupNames: Option[] = groups.map(el => ({"id": el.id, "name": el.name}));
  const formatedMinute = minute < 10 ? "0" + minute : minute;

  return (
    <CustomAlert visible={isAddAlert} 
      title="Competition!"
      buttonText='Save'
      handleYes={handleSave}
      onClose={hideAddAlert}

      date={formatDateTime(timestamp).date}
      time={hour + ':' + formatedMinute}
      onDate={()=>(setIsDate(!isDate), setIsTime(false))}
      onTime={()=>(setIsTime(!isTime), setIsDate(false))}
      isTime={isTime}
      isDate={isDate}
    >
      {isDate && <DateView timestamp={timestamp}
        setDate={(timestamp, day) => (setTimestamp(timestamp), setDay(day))}/>}
      {isTime && <TimeView hour={hour} minute={minute} setHour={setHour} setMinute={setMinute}/>}

      {!isTime && !isDate &&  <>
        <View style={styles.section}>
          <Text style={{fontSize: 16, color: '#ccc', fontWeight: '500', left: 4}}>Finish time: </Text>
          <Text style={[styles.time]}>19:00</Text>
        </View>
        <View style={[styles.row, {borderColor: '#555', borderTopWidth: 1}]}>
          {!isError && <Text style={styles.label}>Groups: </Text>}
          {isError && <Text style={styles.error}>Select groups! </Text>}

          <View>
            <SelectedField data={groupNames} selectedIndex={group1_inx} onSelect={setGroup1}/>
            <SelectedField data={groupNames} selectedIndex={group2_inx} onSelect={setGroup2}/>
          </View>
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} multiline={true} textAlignVertical="top"
          keyboardType='name-phone-pad' maxLength={100} placeholder="Enter"
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
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  label: {
    width: 140,
    fontSize: 16,
    color: 'gold',
    marginTop: 8,
  },
  error: {
    width: 140,
    fontSize: 18,
    fontWeight: '400',
    color: 'red',
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
    height: 60,
    backgroundColor: '#2E4A7C',
    color: '#eee',
    fontSize: 15,
    padding: 8,
    marginTop: 12,
    borderRadius: 8
  },
  time: {
    fontSize: 15,
    color: '#A4FAAA',
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 4,
    height: 28,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8
  },
});