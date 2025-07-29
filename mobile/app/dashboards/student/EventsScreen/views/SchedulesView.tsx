import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { weekDays } from '../../../../shared/constants';


export const SchedulesView = () => {
  const { schedules } = useStore();

  return (
    <View style={styles.container}>
      {weekDays.map((item, inx) => {
        const schedule = schedules.find(el => el.weekday === inx + 1);
 
        return (
          <View key={inx} style={[styles.row]}>
            <Text style={styles.weekday}>{item}</Text>
            
            {schedule && 
              <View >
                  <Text style={styles.time}>{`${schedule.hour} : ${schedule.minute}`}</Text> 
              </View>
            }
            <View style={{width: 80}}/>
          </View>
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
})