import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Game, Team } from '../../model';
import { Button } from '../../../../../shared/components/CustomButton';


export type Props = {
  games: Game[];
  onNew: () => void;
  onSelect: (id: number) => void;
  close: () => void;
};

export const GamesMenu: React.FC<Props> = ({ games, onNew, onSelect, close}) => {
  return (
    <View style={styles.container}>
      <Button title='New game'
        type='outline' 
        buttonStyle={styles.button}
        titleStyle={styles.label}
        onPress={()=>(onNew(), close())}
      />

      {games.map((item) => {
        const bg = item.winner === 'Equally' ? 'blue' : item.winner === Team.GREEN ? 'green' : 'red';
        const [amount, presence, red, green] = item.presence.split(',').map(Number);
        
        const date = new Date(item.timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
        const year = date.getFullYear();

        return (
          <TouchableOpacity key={item.id}
            style={[styles.cell]} onPress={()=>(close(), onSelect(item.id))}>
            <View style={styles.section}>

              <View style={[styles.col, {borderRightWidth: 1, borderRightColor: '#777', paddingRight: 4}]}>
                <View style={[styles.capsule, {backgroundColor: bg}]}>
                  { item.winner === "Equally" && <Text style={styles.title}>Tie</Text> }
                  { item.winner !== "Equally" && <Text style={styles.title}>{item.winner} Team won</Text>}
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
            </View>  
          </TouchableOpacity>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: '100%',
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#152B52',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',

    borderBottomWidth: 2,
    borderBottomColor: '#999',
    borderRightWidth: 2,
    borderRightColor: '#999',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
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
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline'
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
    padding: 10,
    borderRadius: 5,
    marginBottom: 6,
  },
  label: {
    fontSize: 18,
    color: 'gold'
  },
});
