import React from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { widgetStyles, screenStyles } from '../styles/appStyles';
import { formatDateTime } from '../utils';


interface Props {
    timestamps: number[];
    onClick: (timestamps: number) => void;
}

export function DatesBar({ timestamps, onClick }: Props) {
  return (
    <FlatList data={timestamps}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => 
          <TouchableOpacity style={styles.row}
              onPress={() => onClick(item)} >

              <Text style={styles.text}>{formatDateTime(item).date}</Text>
          </TouchableOpacity>
      } style={styles.list} />
  );
};

const styles = StyleSheet.create({
  row: {
  },
  text: {
  },
  list: {
  },
});
