import { StyleSheet, FlatList, TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';

  
const CampProp: React.FC<{label: string, value: number}> = ({label, value}) => {
  return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
  );
};


export function CampsView() {
  const { camps } = useStore();

  const router = useRouter();

  function handleSelect( group_id: number) {
    //loadDrill(eventDrill_id);
    //router.push(`/dashboards/coach/events/DrillScreen`);
  }

  return (
    <FlatList data={camps} contentContainerStyle={{paddingBottom: 24}}
        renderItem={({ item }) =>
        <TouchableOpacity key={item.id} style={styles.group}
            onPress={() => handleSelect(item.id)}>
            <Text style={styles.title}>{item.name}</Text>

            <View style={styles.sections}>
                <CampProp label='Groups' value={item.groups}/>
                <CampProp label='Students' value={item.students}/>
                <CampProp label='Coaches' value={item.coaches}/>
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
    marginVertical: 3
  },
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list: {
    borderRadius: 10
  },
  title: { color: '#ddd', fontWeight: '500', fontSize: 16 },
  label: { color: '#ddd', fontWeight: '500', fontSize: 16 },
  value: { color: '#ddd', fontWeight: '500', fontSize: 16 },
});