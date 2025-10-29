import { useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from '../../../../shared/components/CustomIcon';
import { Team } from '../../model';
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
      keyExtractor={item => item.game.id.toString()}
      renderItem={({item}) => {
      const bgTeam = item.team === Team.GREEN ? '#0FA919' : '#A90F11';
      const bgWon = item.team === Team.GREEN ? '#00ff11db' : '#FF0004';
        
        const date = new Date(item.game.timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();

        return (
          <TouchableOpacity style={[styles.section, styles.cell]}
            onPress={()=>handleSelect(item.game.id)}>

            <View style={[styles.col, {borderRightWidth: 1, borderRightColor: '#777', paddingRight: 4}]}>
              <View style={[styles.capsule, {backgroundColor: bgTeam, width: 112}]}>
                <Text style={styles.title}>{item.team} Team</Text>
              </View>
              <View style={[styles.section]}>
                <Text style={[styles.small_text, {width: 60}]}>Evader survived</Text>
              
                <View style={{paddingTop: 2}}>
                  {item.is_survived && <Icon name="checkbox-marked-outline" type="material-community" color='green'/>}
                  {!item.is_survived && <Icon name="close-box-outline" type="material-community" color='red' />}
                </View>
              </View>
            </View>

            <View style={[styles.col]}>
              <Text style={styles.text}>Tags: {item.game.tags}</Text>
              <Text style={styles.text}>Rescues: {item.game.rescues}</Text>
              <Text style={styles.text}>Red: {item.game.points1} Green: {item.game.points2}</Text>
            </View> 

            <View style={[styles.col, {borderLeftWidth: 1, borderLeftColor: '#777', paddingLeft: 4}]}>
              <View style={[styles.capsule, {backgroundColor: bgWon, width: 72}]}>
                <Text style={styles.winner}>{item.game.winner === item.team ? 'Winner' : 'Lost'}</Text>
              </View>
              <Text style={[styles.small_text, {marginTop: 10}]}>{day}/{month}/{year}</Text>
              
            </View> 
          </TouchableOpacity>  
        )}
      }/>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: '100%',
    marginTop: 8,
    //paddingBottom: 24
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    padding: 8,
    backgroundColor: '#000', 
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ddd',
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
    color: 'white',
    alignSelf: 'center',
  },
  winner: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  text: {
    color: '#ddd',
    fontSize: 13,
    paddingBottom: 3
  },
  small_text: {
    color: '#ddd',
    fontSize: 12,
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
