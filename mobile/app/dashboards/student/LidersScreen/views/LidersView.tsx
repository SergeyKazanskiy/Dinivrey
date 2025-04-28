import React from "react";
import { StyleSheet, FlatList, ScrollView} from "react-native";
import { useStore } from '../../store';
import { LiderCell } from '../../../../shared/components/LiderCell';


export const LidersView = () => { 
  const { liders } = useStore();
    
  return (
    <ScrollView style={styles.container}>
        <FlatList data={liders} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) =>
            <LiderCell student={item}/>
        }/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 60,
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
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