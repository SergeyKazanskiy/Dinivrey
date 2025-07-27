import { useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Button } from '@rneui/themed';
import { Game, Team } from '../../model';
import { useStore } from '../../store';


interface Props {
  onSelect: (id: number) => void;
}

export function GamesView({ onSelect }: Props) {
  const { game_reports } = useStore();
  const { selectGameReport } = useStore();

  const handleSelect = useCallback((id: number) => {
    selectGameReport(id);
    onSelect(id);
  }, [selectGameReport, onSelect]);

  return (
    <FlatList contentContainerStyle={styles.container}
      data={game_reports}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        const bg = item.winner === 'Equally' ? 'blue' : item.winner === Team.GREEN ? 'green' : 'red';
        const [amount, presence, red, green] = item.presence.split(',').map(Number);
        
        const date = new Date(item.timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();

        return (
          <TouchableOpacity style={[styles.section, styles.cell]}
            onPress={()=>handleSelect(item.id)}>

            <View style={[styles.col, {borderRightWidth: 1, borderRightColor: '#777', paddingRight: 4}]}>
              <View style={[styles.capsule, {backgroundColor: bg}]}>
                <Text style={styles.title}>{item.winner} Team won</Text>
              </View>
              <Text style={styles.small_text}>Presence: {amount}/{presence}</Text>
              <Text style={styles.small_text}>RED: {red} GREEN: {green}</Text>
            </View>

            <View style={[styles.col]}>
              <Text style={styles.text}>Tags: {item.tags}</Text>
              <Text style={styles.text}>Rescues: {item.rescues}</Text>
              <Text style={styles.text}>Red: {item.points1} Green: {item.points2}</Text>
            </View> 

              <View style={[styles.col, {borderLeftWidth: 1, borderLeftColor: '#777', paddingLeft: 4}]}>
              <Text style={styles.title}>{day}/{month}</Text>
              <Text style={styles.title}>{year}</Text>
              <Text style={styles.text}> </Text>
            </View> 
          </TouchableOpacity>  
        )}
      }/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    padding: 10,
    backgroundColor: '#222', 
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    marginVertical: 4,
    borderRadius: 8,
  },
  capsule: {
    borderRadius: 12,
    backgroundColor: '#ddd',
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'gold',
  },
  text: {
    color: '#ddd',
    fontSize: 14,
  },
  small_text: {
    color: '#ddd',
    fontSize: 13,
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: 'gold'
  },
});
