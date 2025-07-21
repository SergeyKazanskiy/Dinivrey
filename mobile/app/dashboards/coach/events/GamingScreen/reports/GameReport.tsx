import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import { RoundView } from '../views/RoundView';


const ScoreScreen = () => {
  const { gameDate } = useStore();
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dinivrey - {gameDate}</Text>
        <Pressable onPress={() => { /* закрыть экран */ }}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Round 1 */}
        <RoundView
            team='Red' role='Evader' round={1}
            title="Red Team - Evader (Round 1)"
        />
        <RoundView
            team='Green' role='Chaser' round={1}
            title="Green Team - Chaser (Round 1)"
        />

        {/* Round 2 */}
        <ReportView
          team='Red' role='Chaser' round={2}
          title="Red Team - Chaser (Round 2)"
        />
        <ReportView
          team='Green' role='Evader' round={2}
          title="Green Team - Evader (Round 2)"
        />

        {/* Total */}
        <View style={styles.summary}>
          <Text style={styles.winner}>🏆 Winner Red Team</Text>
          <Text style={styles.score}>Total Points: 54 vs 48</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  close: {
    color: 'white',
    fontSize: 18,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  summary: {
    marginTop: 24,
    alignItems: 'center',
  },
  winner: {
    color: 'gold',
    fontSize: 20,
    fontWeight: 'bold',
  },
  score: {
    color: 'white',
    marginTop: 4,
  },
});
