import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useStore } from '../../store';
import { Player, Role, Team } from '../../model';
import { BONUS_POINTS } from '../constants';
import { objectToJson } from '@/app/shared/utils';


const COLUMN_HEIGHT = 3;


export function EvadersDialog() {
  const { players, currentRound } = useStore();
  const { setServivied, setBonusPoints, onEvadersConfirm } = useStore();

  const evaderTeam = currentRound.teams.find(el => el.role === Role.EVADER)?.team || Team.GREEN;
  const evaders = players.filter(el => el.team === evaderTeam);

  const columns: Player[][] = [];
  for (let i = 0; i < evaders.length; i += COLUMN_HEIGHT) {
    columns.push(evaders.slice(i, i + COLUMN_HEIGHT));
  }

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  function handleButtonsPress() {

    if (selectedIds.length > 0) {
      setServivied(selectedIds);
    } else {
      setBonusPoints(BONUS_POINTS)
    }

    onEvadersConfirm();
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Select Untagged Evaders</Text>

      <ScrollView horizontal contentContainerStyle={styles.rowScroll}>
        {columns.map((column, colIndex) => (

          <View key={colIndex} style={styles.column}>
            {column.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <CheckBox
                  title={item.name}
                  checked={isSelected}
                  onPress={() => toggleSelection(item.id)}
                  containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                  textStyle={{ color: '#ddd', fontSize: 15 }}
                />
              )
            })}
          </View>
        ))}
      </ScrollView>
      
      {selectedIds.length === 0 && (
        <Pressable style={styles.tagged}
          onPress={handleButtonsPress}
        >
          <Text style={{ color: '#FFD700', fontWeight: '600' }}>
            ⚠️ All Evaders tagged! Chasers will receive 3 bonus points.
          </Text>
        </Pressable>
      )}
      {selectedIds.length > 0 && (
        <Pressable style={styles.pressable}
          onPress={handleButtonsPress}
        >
          <Text style={styles.text}>Confirm Untagged Players</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1C',
    padding: 16,
    //borderRadius: 12,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  rowScroll: {
    paddingBottom: 16,
  },
  column: {
    marginHorizontal: 8,
  },
  tagged: {
    backgroundColor: '#A85F1C',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressable: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    color: '#0D0D1C',
    fontWeight: 'bold',
    fontSize: 16
  },
});