import {useState} from "react";
import { useRouter } from 'expo-router';
import { StyleSheet, FlatList, ScrollView, Text } from "react-native";
import { useStore } from '../../store';
import { useStore as useStudentsStore } from '../../../students/store';
import { AttendanceCell } from '../../../../../shared/components/AttendanceCell';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';
import { isPast, formatDateTime } from '../../../../../shared/utils';


export const AttendanceView = () => { 
  const { attendances, event_timestamp } = useStore();
  const { checkStudent, updateComment } = useStore();
  const { selectStudent } = useStudentsStore();

  const [isUpdateAlert, setIsUpdateAlert] = useState<boolean>(false);

  function handleCheckStudent(id: number) {
    // if (isPast(event_timestamp)) {
    //   setIsUpdateAlert(true)
    // } else {
      checkStudent(id);
    //}
  }

    const router = useRouter();
  
    function handleSelect(id: number) {
      selectStudent(id);
      router.push(`/dashboards/coach/students`)
    }

  return (
    <>
      <CustomAlert visible={isUpdateAlert}  title="Attention!"
        onClose={() => setIsUpdateAlert(false)}>
        <Text style={{color:'#ddd'}}>It is not possible to change attendance in the past</Text>
      </CustomAlert>

      <ScrollView style={styles.container}>
        <FlatList data={attendances} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) =>
              <AttendanceCell
                first_name={item.first_name}
                last_name={item.last_name}
                checked={item.present}
                onCheck={() => handleCheckStudent(item.id)}
                comment={item.comment ?? ""}
                onUpdate={(comment) => updateComment(item.id, comment)}
                onSelect={()=>handleSelect(item.id)}
              />
        }/>
    </ScrollView>
    </>
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
