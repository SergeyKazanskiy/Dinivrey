import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useStore } from '../../store';


export const TimeView = () => {
  const { hour, minute } = useStore();
  const { hideTimeMenu, setTime } = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Hours</Text>
        <Pressable onPress={hideTimeMenu}>
          <Icon name="close" size={20} color="#ccc" style={{marginRight: 6}} />
        </Pressable>
      </View>
      <View style={styles.grid}>
        {Array.from({ length: 12 }, (_, i) => i + 8).map((h) => (
          <Button key={h}
            title={h.toString()}
            type={hour === h ? 'solid' : 'outline'}
            buttonStyle={styles.button}
            titleStyle={[styles.text, hour === h && styles.selected]}
            onPress={() => setTime(h, minute)}
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
              onPress={() => setTime(hour, m)}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#ddd',
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
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
