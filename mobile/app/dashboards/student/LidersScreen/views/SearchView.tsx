import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { SearchBar } from '../../../../shared/components/SearchBar';
import { useStore } from '../../store';


export const SearchView = () => {
  const { searchActive, searchPhrase } = useStore();
  const { setSearchActive, setSearchPhrase } = useStore();

  return (
    <View style={styles.container}>
      <SearchBar clicked={searchActive} searchPhrase={searchPhrase}
        setClicked={setSearchActive} setSearchPhrase={setSearchPhrase}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
});