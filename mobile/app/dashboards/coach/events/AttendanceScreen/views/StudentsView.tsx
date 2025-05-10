import React from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import { useStore } from '../../store';
import { StudentCell } from '../../../../../shared/components/StudentCell';


export const StudentsView = () => { 
  const { students } = useStore();
    
  return (
    <ScrollView style={styles.container}>
        <FlatList data={students} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) =>
              <StudentCell
                first_name={item.first_name}
                last_name={item.last_name}
              />
        }/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 60,
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