import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../store';


export const AddressView = () => {
  const { student } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address</Text>

      <View style={styles.section}>
        <View style={styles.cell}>
          <Text style={styles.info}>City:</Text>
          <Text style={styles.value}>{student.city}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.info}>Street:</Text>
          <Text style={styles.value}>{student.street}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.info}>House:</Text>
          <Text style={styles.value}>{student.home}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4
  },
  section: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
  },
  title: {
    marginLeft: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  info: {
    fontSize: 15,
    color: '#fff',
    width: 68,
    marginBottom: 6,
  },
  value: {
    fontSize: 15,
    color: '#A7CFF5',
  },
});

