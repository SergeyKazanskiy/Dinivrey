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
  const [isStartTime, setIsStartTime] = useState(true);

  const [isError, setIsError] = useState(false);
  const [isTimeError, setIsTimeError] = useState(false);

  const [timestamp, setTimestamp] = useState(0);
  const [duration, setDuration] = useState(36000000);
  const [day, setDay] = useState(1);

  const [hour1, setHour1] = useState(16);
  const [minute1, setMinute1] = useState(0);
  const [hour2, setHour2] = useState(16);
  const [minute2, setMinute2] = useState(0);

  const [group1_inx, setGroup1] = useState(-1);
  const [group2_inx, setGroup2] = useState(-1);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (event_id > 0) {
      const event = filtredEvents.find(el => el.id === event_id)
      
      if (event) {
        const hour1 = getWeekHourMinute(event.timestamp).hours
        const minute1 = getWeekHourMinute(event.timestamp).minutes

        const hour2 = getWeekHourMinute(event.timestamp + duration).hours
        const minute2 = getWeekHourMinute(event.timestamp + duration).minutes

        const group1_inx = groups.findIndex(el => el.id === event.group1_id)
        const group2_inx = groups.findIndex(el => el.id === event.group2_id)

        setTimestamp(event.timestamp);
        setDuration(event.duration);
        setDesc(event.desc);

        setHour1(hour1);
        setMinute1(minute1);

        setHour2(hour2);
        setMinute2(minute2);

        setGroup1(group1_inx);
        setGroup2(group2_inx);
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
    const newDate1 = new Date(year, month - 1, day, hour1, minute1);
    const newDate2 = new Date(year, month - 1, day, hour2, minute2);

    const newTimestamp1 = newDate1.getTime();
    const newTimestamp2 = newDate2.getTime();
    const newDuration = newTimestamp2 - newTimestamp1
    
    if (newDuration < 1000) {
      setIsTimeError(true);
      setTimeout(() => {setIsTimeError(false)}, 2000);
      return
    }

    const group1_id = groups[group1_inx]?.id || 0;
    const group2_id = groups[group2_inx]?.id || 0;

    if (group1_id === 0 || group2_id === 0) {
      setIsError(true);
      setTimeout(() => {setIsError(false)}, 2000);
      return
    }

    if (event_id === 0) {
      addEvent({ camp_id, timestamp: newTimestamp1, duration: newDuration,
        type: "Game", desc, group1_id, group2_id });
    } else {
      updateEvent({ id: event_id, camp_id, timestamp: newTimestamp1, duration: newDuration,
        type: "Game", desc, group1_id, group2_id });
    }
  }

  const groupNames: Option[] = groups.map(el => ({"id": el.id, "name": el.name}));
  const formateMinute = (minute: number): string => minute < 10 ? "0" + minute : "" + minute;

  const onTime = (isStart: boolean) => {
    setIsStartTime(isStart);
    setIsDate(false);

    if (isTime && isStart === isStartTime) {
      setIsTime(false);
    } else {
      setIsTime(true);
    }
  }

  return (
    <CustomAlert visible={isAddAlert} title="Competition!" buttonText='Save'
      handleYes={handleSave}
      onClose={hideAddAlert}

      date={formatDateTime(timestamp).date}
      time1={hour1 + ':' + formateMinute(minute1)}
      time2={hour2 + ':' + formateMinute(minute2)}

      onDate={()=>(setIsDate(!isDate), setIsTime(false))}
      onTime={onTime}

      isTime={isTime} isDate={isDate} isStart={isStartTime}
    >
      {isDate && <DateView timestamp={timestamp}
        setDate={(timestamp, day) => (setTimestamp(timestamp), setDay(day))}/>}
      {isTime && <TimeView
        hour={isStartTime ? hour1 : hour2}
        minute={isStartTime ? minute1 : minute2}
        setHour={(hour) => isStartTime ? setHour1(hour) : setHour2(hour)}
        setMinute={(minute) => isStartTime ? setMinute1(minute) : setMinute2(minute)}
        />}

      {!isTime && !isDate && <>
        {isTimeError && <Text style={styles.time_error}>Time error!</Text>}

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
  time_error: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: '400',
    color: 'red',
    paddingHorizontal: 12
  },
  date: {
    width: 140,
    fontSize: 16,
    color: 'green',
    marginHorizontal: 4,
  },
  input: {
    width: '100%',
    height: 68,
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