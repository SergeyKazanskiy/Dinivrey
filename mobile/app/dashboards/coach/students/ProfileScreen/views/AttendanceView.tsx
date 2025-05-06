import { View, Text, StyleSheet } from 'react-native';
import { useStore } from "../../store";


export const AttendanceView: React.FC = () => {
  const { attendance } = useStore();

  return (
    <>
    <Text style={styles.title}>Attendance</Text>

    <View style={[styles.container, styles.section]}>
      <View style={styles.cell}>
        <Text style={styles.info}>Trains: </Text>
        <Text style={styles.value}>{attendance.trainings}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.info}>Tests: </Text>
        <Text style={styles.value}>{attendance.tests}</Text>
      </View>

      <View style={styles.cell}>
        <Text style={styles.info}>Games: </Text>
        <Text style={styles.value}>{attendance.games}</Text>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    marginLeft: 26,
    fontWeight: '600',
    fontSize: 16,
    color: '#F8E187',
    marginBottom: 6,
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  info: {
    fontSize: 15,
    color: '#fff',
  },
  value: {
    fontSize: 15,
    color: '#A7CFF5',
  },
});

