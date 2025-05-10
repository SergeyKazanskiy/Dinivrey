import React from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import { useStore } from '../../store';
import { TesterCell } from '../../../../../shared/components/TesterCell';


export const TestersView = () => { 
  const { testers, exam, selectTesterExam } = useStore();
    
  return (
    <ScrollView style={styles.container}>
        <FlatList data={testers} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) =>
              <TesterCell
                first_name={item.first_name}
                last_name={item.last_name}
                value={item[exam]}
                onClick={() => selectTesterExam(item.id)}
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


/*
  const renderItem = ({ student }) => { // filter
    if (searchPhrase === "") {
      return <LiderCell name={item.name} details={item.details} />;
    }
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} />;
    }
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item name={item.name} details={item.details} />;
    }
  };
*/