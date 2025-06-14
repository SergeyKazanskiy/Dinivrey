import {useState} from "react";
import { useRouter } from 'expo-router';
import { StyleSheet, FlatList, ScrollView, Text } from "react-native";
import { useStore } from '../../store';
import { CoachCell } from '../../../../../shared/components/CoachCell';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';
import { isPast, formatDateTime } from '../../../../../shared/utils';


export const CoachesView = () => { 
    const { coaches} = useStore();
    const { selectCoach } = useStore();
    
    const router = useRouter();
  
    function handleSelect(id: number) {
      selectCoach(id);
      router.push(`/dashboards/manager/coaches/CoachScreen`)
    }

  return (
    <ScrollView style={styles.container}>
        <FlatList data={coaches} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) =>
              <CoachCell
                first_name={item.first_name}
                last_name={item.last_name}
                onSelect={()=>handleSelect(item.id)}
              />
        }/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 60,
  },
});
