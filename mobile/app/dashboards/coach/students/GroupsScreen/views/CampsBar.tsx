import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { widgetStyles, screenStyles } from '../../../../../shared/styles/appStyles';
import { Camp } from '../../model';


interface Props {
    camp_id: number
    camps: Camp[];
    onClick: (timestamps: number) => void;
}

export function DatesBar({ camp_id, camps, onClick }: Props) {
  return (
    <FlatList data={camps} horizontal
      contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center', flexGrow: 1}}
      keyExtractor={(item) => '№' + item}
      renderItem={({ item }) => 
        <Button title={item.name} type='outline' 
            buttonStyle={styles.item} titleStyle={styles.text}
            onPress={() => onClick(item.id)}
        />
      } style={styles.list} />
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 8,
    backgroundColor: 'rgba(58, 46, 159, 0.3)',
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 8,
    backgroundColor: 'green',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gold', // blue.500
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  list: {
    paddingVertical: 6,
  },
});
