import { StyleSheet, Text, Platform, View, ScrollView, Pressable } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import { useStore } from '../../store';
import { PopupWrapper } from '../../../../../shared/components/PopupWrapper';
import { Student, Player } from '../../model';

const COLUMN_HEIGHT = 5;


export function AddingPopup() {
  const { isAddingPopup, availableStudents, players, selectedStudentIds } = useStore();
  const { hideAddingPopup, selectStudent, addPlayers } = useStore();

  const columns: Student[][] = [];
  const playersIds = players.map(el => (el.id))
  const students = availableStudents.filter(el => !playersIds.includes(el.id))

  for (let i = 0; i < students.length; i += COLUMN_HEIGHT) {
    columns.push(students.slice(i, i + COLUMN_HEIGHT));
  }

  return (
     <PopupWrapper visible={isAddingPopup} title='Chose players to add' onClose={hideAddingPopup}>
      {columns.length === 0 && <Text style={styles.title}>No available students</Text>}

      <ScrollView horizontal contentContainerStyle={styles.rowScroll}>
        {columns.map((column, colIndex) => (

          <View key={colIndex} style={styles.column}>
            {column.map((student) => {
              const isSelected = selectedStudentIds.includes(student.id);

              return (
                <Pressable key={student.id}
                  style={[styles.cell, { backgroundColor: isSelected ?  '#D1FF4D' : 'white'}]}
                  onPress={() => selectStudent(student.id)}
                >
                  <View style={styles.cellContent}>
                    <Text style={styles.playerName}>
                      {student.last_name} {student.first_name[0]} | {student.age}
                    </Text>
                    <Icon name="check-circle" type="feather" size={20} color='#222'/>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        <Button title="ADD PLAYERS" buttonStyle={styles.greenBtn}
          onPress={() => (addPlayers(), hideAddingPopup())}
        />
        <Button title="ADD PLAYERS" buttonStyle={styles.greenBtn}
          onPress={() => (addPlayers(), hideAddingPopup())}
        />
      </View>
    </PopupWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  rowScroll: {
    paddingBottom: 16,
  },
  column: {
    marginHorizontal: 8,
  },
  cell: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 180,
    justifyContent: 'center',
  },
  cellContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    color: '#222',
    flexShrink: 1,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    margin: 12,
  },
  greenBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 24,
    paddingHorizontal: 20,
  },
  greyBtn: {
    backgroundColor: '#d1d5db',
    borderRadius: 24,
    paddingHorizontal: 20,
  },
});