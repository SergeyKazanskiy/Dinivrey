import React from "react";
import { StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { useStore } from '../../store';
import { TesterCell } from '../../../../../shared/components/TesterCell';


export const TestersView = () => { 
  const { testers, exam, onTesterCheck, onTesterClick } = useStore();
    
  return (
    <ScrollView style={styles.container}>
      <FlatList data={testers} 
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) =>
          <TesterCell
            checked={item.participate}
            onCheck={() => onTesterCheck(item.id)}
            name={`${item.first_name} ${item.last_name}`}
            value={item[exam]}
            onClick={() => onTesterClick(item.id)}
          />
        }/>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
  item: {
    marginVertical: 4
  },
  itemSelected: {
    marginVertical: 4,
    backgroundColor: "#555"
  },
});
