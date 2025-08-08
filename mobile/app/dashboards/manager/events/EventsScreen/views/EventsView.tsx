import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { CampEventCell } from '../cells/CampEventCell';
import { formatDateTime, objectToJson } from '../../../../../shared/utils';
import { TypesView } from '../views/TypesView';


export function EventsView() {
  const { filtredEvents, groups, event_id, today } = useStore();
  const { selectEvent, showAttendanceReport } = useStore();

  function handlePressGroup( event_id: number, group_id: number ) {
    showAttendanceReport(event_id, group_id);
  }

  function handlePressEvent(event_id: number, timestamp: number) {
    if (timestamp >= today) {
      selectEvent(event_id);
    }
  }

  return (
    <>
      <FlatList data={filtredEvents}
        contentContainerStyle={{ paddingBottom: 300 }}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) =>
          <TouchableOpacity style={[
            item.id === event_id && {backgroundColor: '#152B52'},
            item.timestamp < today && {opacity: 0.7},
          ]}
            onPress={()=>handlePressEvent(item.id, item.timestamp)}>

            <CampEventCell key={item.id}
              type={item.type}  
              date={formatDateTime(item.timestamp).date}
              time1={formatDateTime(item.timestamp).time}
              time2={formatDateTime(item.timestamp + item.duration).time}
              desc={item.desc}
              group1={groups.find(el => el.id === item.group1_id)!}
              onGroup={(group_id, group_number) => handlePressGroup(item.id, group_id)}
              group2={groups.find(el => el.id === item.group2_id)}
            />
          </TouchableOpacity>
        } style={styles.list}
      />
      <View style={styles.types}>
        <TypesView/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3
  },
  title: { color: '#ddd', fontWeight: '500', fontSize: 16 },
  list: { padding: 16 },
  types: { 
    marginTop: 'auto', 
    textAlign: 'center',
    padding: 16
  },
});