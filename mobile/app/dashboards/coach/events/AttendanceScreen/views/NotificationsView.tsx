import { StyleSheet, FlatList } from 'react-native';
import { useStore } from '../../store';
import { NotificationCell } from '../components/NotificationCell';


export const NotificationsView = () => {
  const { notifications } = useStore();

  return (
    <FlatList data={notifications} contentContainerStyle={{paddingBottom: 4}}
      keyExtractor={(index) => index.toString()}
      renderItem={({ item }) =>
      <NotificationCell 
          first_name={item.first_name}
          second_name={item.second_name}
          added={item.added || 0}
          updated={item.updated || 0}
          achievements={item.achievements}
          error_message={item.error_message?? ''}
      />
      } style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop:6,
        alignSelf:'center'
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 4,
        marginBottom: 16
    },
    list: {
      maxHeight: 400,
    }
});
