import { StyleSheet, FlatList, Text } from 'react-native';
import { useStore } from '../../store';


export const NotificationsView = () => {
  const { notifications } = useStore();

  return (
    <FlatList data={notifications} contentContainerStyle={{paddingBottom: 4}}
      keyExtractor={(index) => index.toString()}
      renderItem={({ item }) =>
        <Text style={{color: '#eee'}}>{item}</Text> 
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
