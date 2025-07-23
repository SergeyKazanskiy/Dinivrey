import { View, Text, StyleSheet} from 'react-native';


type Props = {
  name: string;
  isSurvived: boolean | undefined; //'Survived' | 'Caught' | undefined
  points: number;
};

export const PlayerCell: React.FC<Props> = ({ name, isSurvived, points }) => {
  const bg = isSurvived === undefined
  ? '#ccc' : isSurvived
  ? 'green' : 'red';

  return (
    <View style={[styles.container, {backgroundColor: bg}]}>
      <Text style={{ flex: 1 }}>
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
    marginVertical: 4,
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 16,
  },
  capsule: {
    borderRadius: 10,
    backgroundColor: '#ddd',
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
})