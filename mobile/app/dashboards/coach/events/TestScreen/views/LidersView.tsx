import React from "react";
import { StyleSheet, FlatList, ScrollView, View} from "react-native";
import { useStore } from '../../store';
import { LiderCell } from '../../../../../shared/components/LiderCell';


export const LidersView = () => { 
  //const { liders, student_id } = useStore();
    
  return (
    <ScrollView style={styles.container}>
        
    </ScrollView>
  );
};
/*
<FlatList data={liders} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) =>
            <View style={item.id === student_id ? styles.itemSelected : styles.item}>
              <LiderCell inx={index + 1} lider={item}/>
            </View>    
        }/>*/
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