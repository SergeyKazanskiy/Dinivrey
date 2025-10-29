import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../../../../../shared/components/CustomIcon';
import { useStore } from '../../store';
import { weekDays } from '../../../../../shared/constants';
import { objectToJson } from '@/app/shared/utils';


export const SchedulesView = () => {
  const { schedules, weekday } = useStore();
  const { selectSchedule, createSchedule, deleteSchedule, showTimeMenu } = useStore();
  //alert(objectToJson(schedules))
  return (
    <View style={styles.container}>
      {weekDays.map((item, inx) => {
        const schedule = schedules.find(el => el.weekday === inx + 1);
        const isSelected = weekday === inx + 1;
        return (
          <TouchableOpacity key={inx}
            style={[styles.row, isSelected && styles.selected]}
            onPress={() =>  selectSchedule(schedule?.id || 0, inx)}
          >
            <Text style={styles.weekday}>{item}</Text>
            
            {schedule && 
              <TouchableOpacity style={[isSelected && styles.time_selected]}
                onPress={isSelected ? () => showTimeMenu() :
                () => selectSchedule(schedule?.id || 0, inx)}>
                
                  <Text style={styles.time}>{`${schedule.hour} : ${schedule.minute}`}</Text> 
              </TouchableOpacity>
            }
            {isSelected && schedule && (
              <Icon name="delete" size={20} color="#ccc" style={styles.button} onPress={deleteSchedule}/>
            )}
            {isSelected && !schedule && (
              <Icon name="delete" size={20} color="#ccc" style={styles.button} onPress={createSchedule}/>
            )}
            {!isSelected && <View style={{width: 80}}/>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#152B52',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 8,
    marginVertical: 2,
  },
  selected: {
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
  },
  time_selected: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
  },
  weekday: {
    width: 88,
    paddingVertical: 4,
    textAlign: 'left',
    fontSize: 16,
    color: '#ddd',
  },
  time: {
    fontSize: 16,
    color: '#ddd',
  },
  button: {
    paddingHorizontal: 20
  },
})