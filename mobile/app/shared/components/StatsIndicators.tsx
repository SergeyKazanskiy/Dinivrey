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

const labels = ['Climbing', 'Endurance', 'Speed', 'Evading', 'Hiding'];
const colors = ['#f59e0b', '#e81cbf', '#fef08a', '#4ade80', '#38bdf8'];
const w = 65;

export const StatsIndicators: React.FC<Props> = ({ stats }) => {
  const items: Stat[] = stats.map((value, index) => ({
    label: labels[index],
    value,
    color: colors[index],
  }));

  return (
    <View style={[styles.container && {width: w}]}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={[styles.circle, { backgroundColor: item.color }]}>
            <View style={styles.innerCircle} />
            <Text style={styles.circleText}>{item.value.toFixed(1)}</Text>
          </View>

          <View style={{position: 'relative', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <View style={{position: 'relative', alignItems: 'flex-end'}}>
              <LinearGradient
                colors={[item.color, '#000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[item.value / 20 , item.value / 10 + 0.4]}
                style={[ styles.bar,{ width: w}]}
              />

              <View style={{position: 'absolute', backgroundColor: item.color, height: 3, width: w}}/>
            </View>

            <View style={{position: 'absolute', backgroundColor: item.color, height: 3, width: w}}/>
          </View>

          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    gap: 6,
    //backgroundColor: 'red'
    //width: 75
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
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  innerCircle: {
    position: 'absolute', 
    width: 27, 
    height: 27, 
    borderRadius: 14,
    backgroundColor: '#000'
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
    marginLeft: 14,
    backgroundColor: '#000',
    color: '#ddd',
    fontSize: 12,
    fontWeight: 600,
    paddingVertical: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
});

