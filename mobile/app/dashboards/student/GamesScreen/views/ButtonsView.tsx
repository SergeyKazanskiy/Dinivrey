import { View, StyleSheet, Text } from 'react-native';
import { Button } from '@rneui/themed';


interface Props {
  onNewGame: () => void;
}

export function ButtonsView({ onNewGame }: Props) {
  return (
    <View style={[styles.container, styles.section]}>
      <Text style={styles.title}>My games</Text>
      
      <Button title='New game'
        type='outline' 
        buttonStyle={styles.button}
        titleStyle={styles.label}
        onPress={onNewGame}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: 'gold',
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: 'gold'
  },
});
