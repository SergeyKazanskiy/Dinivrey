import { View, Text, StyleSheet } from 'react-native';
import { useStore } from "../../store";
import { Button } from '@rneui/themed';


export const AttendanceView: React.FC = () => {
  const { attendance } = useStore();
  //const { showComments } = useStore();

  return (
    <>
    <View style={styles.header}>
      <Text style={styles.title}>Attendance</Text>
      {/* <Button title='Comments' type='outline' 
        buttonStyle={styles.button} titleStyle={styles.label}
        onPress={()=>showComments(true)}
      /> */}
    </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'baseline'
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#F8E187',
    //marginBottom: 2,
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
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
   // marginBottom: 4
  },
  label: {
    fontSize: 15,
    color: '#ddd'
  },
});

