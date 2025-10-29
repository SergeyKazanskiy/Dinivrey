import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../../../../shared/components/CustomButton';


interface Props {
  hour: number;
  minute: number;
  setHour: (hour: number) => void;
  setMinute: (minute: number) => void;
}

export const TimeView: React.FC<Props> = ({ hour, minute, setHour, setMinute }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hours</Text>
      <View style={styles.grid}>
        {Array.from({ length: 12 }, (_, i) => i + 8).map((h) => (
          <Button key={h}
            title={h.toString()}
            type={hour === h ? 'solid' : 'outline'}
            buttonStyle={styles.button}
            titleStyle={[styles.text, hour === h && styles.selected]}
            onPress={() => setHour(h)}
          />
        ))}
      </View>

      <Text style={styles.title}>Minutes</Text>
      <View style={styles.grid}>
        {Array.from({ length: 60 }, (_, i) => i).filter(m => m % 5 === 0).map((m) => (
            <Button key={m}
              title={m.toString()}
              type={minute === m ? 'solid' : 'outline'}
              buttonStyle={styles.button}
              titleStyle={[styles.text, minute === m && styles.selected]}
              onPress={() => setMinute(m)}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: 'gold',
    //fontWeight: '500',
    marginTop: 8,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  button: {
    width: 40,
    height: 36,
    padding: 0,
    margin: 3,
    borderRadius: 8,
  },
  selected: {
    color: '#eee'
  },
  text: {
    fontSize: 15,
    color: '#ddd'
  },
});
