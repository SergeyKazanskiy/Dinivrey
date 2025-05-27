import {useState} from "react";
import { StyleSheet, FlatList, ScrollView, Text } from "react-native";
import { useStore } from '../../store';
import { AttendanceCell } from '../../../../../shared/components/AttendanceCell';
import { CustomAlert } from '../../../../../shared/components/CustomAlert';
import { isPast, formatDateTime } from '../../../../../shared/utils';


export const AttendanceView = () => { 
  const { attendances, event_timestamp } = useStore();
  const { checkStudent } = useStore();

  const [isUpdateAlert, setIsUpdateAlert] = useState<boolean>(false);

  function handleCheckStudent(id: number) {
    if (isPast(event_timestamp)) {
      setIsUpdateAlert(true)
    } else {
      checkStudent(id);
    }
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
