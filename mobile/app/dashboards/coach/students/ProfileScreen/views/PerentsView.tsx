import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../store';


export const PerentsView = () => {
  const { parents } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parents</Text>

      <View style={styles.section}>
        <View style={styles.cell}>
          <Text style={styles.info}>Name:</Text>
          <Text style={styles.value}>{parents[0].name}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.info}>Phone:</Text>
          <Text style={styles.value}>{parents[0].phone}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.info}>Email:</Text>
          <Text style={styles.value}>{parents[0].email}</Text>
        </View>
      </View>

      <View style={styles.section}>
      <View style={styles.cell}>
          <Text style={styles.info}>Name:</Text>
          <Text style={styles.value}>{parents[1].name}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.info}>Phone:</Text>
          <Text style={styles.value}>{parents[1].phone}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.info}>Email:</Text>
          <Text style={styles.value}>{parents[1].email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12
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
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
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
