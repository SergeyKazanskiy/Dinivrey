import { StyleSheet, FlatList } from 'react-native';
import { useStore } from '../../store';
import { GroupEventCell } from '../../../../../shared/components/GroupEventCell';
import { formatDateTime } from '../../../../../shared/utils';


export function GroupEventsView() {
  const { group_events } = useStore();

  return (
    <FlatList data={group_events} contentContainerStyle={{paddingBottom: 24}}
      renderItem={({ item }) =>
        <GroupEventCell key={item.id}
          type={item.type}  
          datetime={formatDateTime(item.timestamp).date + ', ' + formatDateTime(item.timestamp).time}
          desc={item.desc}
          amount={item.amound}
        />
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
  title: { color: '#ddd', fontWeight: '500', fontSize: 16 },
  list: { borderRadius: 10 },
});