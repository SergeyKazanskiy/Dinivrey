import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { screenStyles, cellStyles } from '../../../shared/styles/appStyles';
import { useStore } from '../store';
import { GroupCell } from '../../../shared/components/GroupCell';


const GroupsScreen = () => {
  const { groups } = useStore();
  const { loadGroups, loadLiders } = useStore();
  
  const router = useRouter();

  useEffect(() => {
    loadGroups(1);
  }, [loadGroups]);

  const handlePress = (group_id: number) => {
    loadLiders()
    router.back();
  };

  return (
        
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <FlatList data={groups}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) =>

              <TouchableOpacity onPress={() => handlePress(item.id)}>
                <GroupCell
                  name={item.name}
                  desc={item.description}
                />
              </TouchableOpacity>   
        }/>
        </View>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
  },
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: '#222'
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