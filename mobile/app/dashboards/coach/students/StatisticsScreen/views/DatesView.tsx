import { StyleSheet, View } from 'react-native';
import { useStore } from '../../store';
import { DatesBar } from '../../../../../shared/components/DatesBar';


export function DatesView() {
  const { timestamp, timestamps } = useStore();
  const { selectTimestamp } = useStore();

  return (
    <View style={styles.container}>
        <DatesBar
          timestamp={timestamp}
          timestamps={timestamps}
          onClick={selectTimestamp}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //borderWidth: 1,
    //borderColor: 'gray',
   // backgroundColor: 'gray',
    marginTop: 8,
    marginBottom: 4
  },
});

