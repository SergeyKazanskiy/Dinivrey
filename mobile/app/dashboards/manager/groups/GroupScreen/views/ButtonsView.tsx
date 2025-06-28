import { StyleSheet, View, Text } from 'react-native';
import { Button } from '@rneui/themed';


interface Props {
  onStudents: () => void;
  onStatistics: () => void;
  onAchievemens: () => void;
}

export function ButtonsView({ onStudents, onStatistics, onAchievemens }: Props) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Go to </Text>

      <View style={[styles.sections]}>
        <Button title='Students' type='outline' 
          buttonStyle={styles.button} titleStyle={styles.text}
          onPress={onStudents}
        />
        <Button title='Statistics' type='outline' 
          buttonStyle={styles.button} titleStyle={styles.text}
          onPress={onStatistics}
        />
        <Button title='Achievemens' type='outline' 
          buttonStyle={styles.button} titleStyle={styles.text}
          onPress={onAchievemens}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    color: 'gold',
    fontSize: 18,
    marginBottom: 12,
  },
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    height: 36,
   // width: 160,
    marginBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#ddd'
  },
});
