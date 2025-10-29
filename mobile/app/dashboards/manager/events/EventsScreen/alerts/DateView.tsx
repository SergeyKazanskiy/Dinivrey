import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../../../../../shared/components/CustomButton';
import { daysOfWeek } from '../../../../../shared/constants';


interface Props {
  timestamp: number;
  setDate: (timestamp: number, day: number) => void;
}

export const DateView: React.FC<Props> = ({ timestamp, setDate }) => {
  const dateTime = new Date(timestamp);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const today = new Date();

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day, dateTime.getHours(), dateTime.getMinutes());
    setDate(newDate.getTime(), day);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.dayLabel}>{day}</Text>
        ))}
      </View>

      <View style={styles.gridRow}>
        {Array.from({ length: adjustedFirstDay }).map((_, i) => (
          <View key={`empty-${i}`} style={styles.emptyCell} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          return (
            // <TouchableOpacity key={day}
            //   style={[styles.dayButton, dateTime.getDate() === day ? styles.todayButton : styles.defaultButton,
            //     day < dateTime.getDate() && styles.disabledButton]}
            //   disabled={day < dateTime.getDate()}
            //   onPress={() => handleDateClick(day)}
            // >
            //   <Text style={styles.buttonText}>{day}</Text>
            // </TouchableOpacity>

            <Button key={day}
              title={day.toString()}
              type={day === dateTime.getDate() ? 'solid' : 'outline'}
              buttonStyle={styles.dayButton}
              titleStyle={[styles.buttonText]}
              disabled={day < today.getDate()}
              onPress={() => handleDateClick(day)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  dayLabel: {
    width: 40,
    textAlign: 'center',
    fontSize: 15,
    color: 'gold',
    marginHorizontal: 1,
    marginTop: 8,
    marginBottom: 4
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyCell: {
    width: 40,
    height: 36,
    margin: 1,
  },
  dayButton: {
    width: 40,
    height: 36,
    borderRadius: 6,
    marginHorizontal: 1,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  defaultButton: {
    borderColor: '#ccc',
    opacity: 0.7,
  },
  todayButton: {
    borderColor: 'green',
    backgroundColor: '#90ee90',
  },
  disabledButton: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 15,
    color: '#ddd',
  },
});
