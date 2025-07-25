import React from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import { Game, Team } from '../../model';
import { Button } from '@rneui/themed';


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

        const bg = item.winner === 'Equally'
          ? 'blue' : item.winner === Team.GREEN
          ? 'green' : 'red';

        return (
          <TouchableOpacity key={item.id}
            style={[styles.cell]} onPress={()=>(close(), onSelect(item.id))}>

            <View style={[styles.row, {backgroundColor: bg}]}>
                <Text style={styles.title}>{item.winner}</Text>
                <Text style={styles.title}>{item.points}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Tags: {item.tags}</Text>
                <Text style={styles.text}>Rescues: {item.rescues}</Text>
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
     // height: 280,
    //width: '100%',
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#152B52',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)'
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline'
  },
  cell: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#152B52',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    marginVertical: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline'
  },
  title: {
    fontSize: 16,
    color: 'gold'
  },
  text: {
    color: '#ddd',
    fontSize: 16,
    marginRight: 4,
  },
  button: {
    height: 40,
    padding: 8,
    borderRadius: 5,
    marginBottom: 6,
   // backgroundColor: '#2E4A7C'
  },
  label: {
    fontSize: 16,
    color: 'gold'
  },
});
