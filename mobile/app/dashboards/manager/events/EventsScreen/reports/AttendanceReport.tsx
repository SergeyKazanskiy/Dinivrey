import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, FlatList, ScrollView, Text, View } from "react-native";
import { DrillCell } from '../../../../../shared/components/DrillCell';
import { AttendanceCell } from '../../../../../shared/components/AttendanceCell';
import { useStore } from '../../store';
import { Attendance, ShortDrill } from '../../model';
import { get_attendances, get_event_drills } from '../../http';
import { ScreenWrapper } from '../../../../../shared/components/ScreenWrapper';


export const AttendanceReport = () => { 
  const { isAttendanceReport, event_id, attendance_group_id } = useStore();
  const { hideAttendanceReport } = useStore();

  const [drills, setDrills] = useState<ShortDrill[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);


  useFocusEffect(
    useCallback(() => {
      get_event_drills(event_id, (drills => {
        setDrills(drills);
      }));

      get_attendances(event_id, attendance_group_id, (attendances => {
        setAttendances(attendances);
      }));
    }, [])
  );

  return (
    <ScreenWrapper visible={isAttendanceReport} title='Attendance report' onClose={hideAttendanceReport}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Drills</Text>

        <FlatList data={drills}
          contentContainerStyle={{paddingBottom: 24}}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) =>
              <DrillCell
                name={item.category + ' ' + item.name}
                time={item.time}
                level={item.level}
                actors={item.actors}
                checked={item.completed}
                onCheck={() => {}}
              />
        }/>

        <Text style={styles.title}>Students</Text>
        <FlatList data={attendances} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) =>
              <AttendanceCell
                first_name={item.first_name}
                last_name={item.last_name}
                checked={item.present}
                onCheck={() => {}}
                comment={item.comment ?? ""}
                onUpdate={() => {}}
                onSelect={()=>{}}
              />
        }/>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
  item: {
    marginVertical: 4
  },
  itemSelected: {
    marginVertical: 4,
    backgroundColor: "#555"
  },
});
