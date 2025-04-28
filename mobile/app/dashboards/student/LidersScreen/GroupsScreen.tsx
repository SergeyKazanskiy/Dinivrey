import { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { screenStyles, cellStyles } from '../../../shared/styles/appStyles';
import { useStore } from '../store';


  const GroupsScreen = () => {
  const { groups } = useStore();
  const { loadGroups, loadLiders } = useStore();
  
  const router = useRouter();

  useEffect(() => {
    loadGroups(1);
  }, [loadGroups]);

  const handlePress = (group_id: number) => {
    loadLiders(group_id)
    router.back();
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <FlatList data={groups} 
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) =>

            <TouchableOpacity onPress={() => handlePress(item.id)}>
              <Text style={cellStyles.description}>{item.name}</Text>
              <Text style={cellStyles.description}>{item.description}</Text>
            </TouchableOpacity>
          
      }/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1A1C21',
    padding: 16,
    paddingTop: 0,
  },
  container: {
    flex: 1,
    alignContent: 'space-between'
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 10
  },
  summary: { 
    textAlign: 'center',   
    paddingTop: 80,
  },
});

export default GroupsScreen;