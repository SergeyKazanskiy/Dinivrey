import { View, Text, StyleSheet} from 'react-native';


type Props = {
  name: string;
  isSurvived: boolean | undefined; //'Survived' | 'Caught' | undefined
  points: number;
};

export const PlayerCell: React.FC<Props> = ({ name, isSurvived, points }) => {
  const bg = isSurvived === undefined
  ? '#ddd' : isSurvived
  ? 'green' : 'red';

  return (
    <View style={[styles.container, {backgroundColor: bg}]}>
      <Text style={styles.text}>
        {name}
      </Text>

      <Text style={styles.capsule}>{points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
    paddingVertical: 2,
    borderRadius: 16,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500'
  },
  capsule: {
    borderRadius: 10,
    backgroundColor: '#eee',
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
})