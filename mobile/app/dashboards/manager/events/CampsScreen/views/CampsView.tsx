import { StyleSheet, FlatList, TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import { cellStyles } from '../../../../../shared/styles/appStyles'
  
const CampProp: React.FC<{label: string, value: number}> = ({label, value}) => {
  return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, {paddingHorizontal: 8}]}>{value}</Text>
        </View>
  );
};


export function CampsView() {
  const { camps } = useStore();
  const { selectCamp } = useStore();

  const router = useRouter();

  function handleSelect(camp_id: number, camp_inx: number) {
    selectCamp(camp_id, camp_inx);
    router.push(`/dashboards/manager/events/EventsScreen`);
  }

  return (
    <FlatList data={camps} contentContainerStyle={{paddingBottom: 24}}
        renderItem={({ item, index }) =>
        <TouchableOpacity key={item.id} style={styles.group}
            onPress={() => handleSelect(item.id, index)}>
            <Text style={styles.title}>{item.name}</Text>

            <View style={styles.sections}>
                <CampProp label='Groups:' value={item.groups}/>
                <CampProp label='Number of all students:' value={item.students}/>
            </View>
        </TouchableOpacity>
      } style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3,
    padding: 10,
    borderRadius: 4
  },
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list: {
    marginTop: 8
  },
  title: { color: '#ddd', fontWeight: '500', fontSize: 16, paddingBottom: 8 },
  label: { color: '#A7CFF5', fontWeight: '400', fontSize: 15 },
  value: { color: 'gold', fontWeight: '400', fontSize: 15 },
});