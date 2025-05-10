import React from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import { useStore } from '../../store';
import { AttendanceCell } from '../../../../../shared/components/AttendanceCell';


export const AttendanceView = () => { 
  const { attendances } = useStore();
  const { checkStudent } = useStore();

  return (
    <ScrollView style={styles.container}>
        <FlatList data={attendances} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) =>
              <AttendanceCell
                first_name={item.first_name}
                last_name={item.last_name}
                checked={item.present}
                onCheck={() => checkStudent(item.id)}
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
