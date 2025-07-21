import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


type Stat = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  stats: [number, number, number, number, number];
};

const labels = ['Climbing', 'Stamina', 'Speed', 'Evading', 'Hiding'];
const colors = ['#f59e0b', '#e81cbf', '#fef08a', '#4ade80', '#38bdf8'];

export const StatsIndicators: React.FC<Props> = ({ stats }) => {
  const items: Stat[] = stats.map((value, index) => ({
    label: labels[index],
    value,
    color: colors[index],
  }));

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={[styles.circle, { borderColor: item.color }]}>
            <Text style={styles.circleText}>{item.value.toFixed(1)}</Text>
          </View>

          <LinearGradient
            colors={[item.color, '#000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, Math.max(Math.min(item.value / 6, 1), 0)]}
            style={[ styles.bar,{ width: 88}]}
          />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 4,
    width: 88
  },
  itemContainer: {
    alignItems: 'flex-start',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 4,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  circleText: {
    color: 'white',
    fontSize: 14,
  },
  bar: {
    height: 36,
    marginLeft: 18,
    backgroundColor: '#000', 
  },
  label: {
    marginLeft: 8,
    backgroundColor: '#000',
    color: '#ddd',
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

