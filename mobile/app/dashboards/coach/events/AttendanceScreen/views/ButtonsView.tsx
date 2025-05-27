import { StyleSheet, View, Text } from 'react-native';
import { Button } from '@rneui/themed';


interface Props {
  event_type: string;
  onAdd: () => void;
  onExam: () => void;
  onGame: () => void;
}

export function ButtonsView({ event_type, onAdd, onExam, onGame }: Props) {
  return (
    <View style= {styles.container}>
      <Button title='Add drills' type='outline' 
        buttonStyle={styles.button} titleStyle={styles.title}
        onPress={onAdd}
      />

      <View style= {styles.section}>
        <Text style={styles.text}>Go to </Text>

        <Button title='Game' type='outline' 
          buttonStyle={styles.button} titleStyle={styles.title}
          onPress={onGame}
        />
        {event_type === 'Exam' &&
          <Button title='Exam' type='outline' 
            buttonStyle={styles.button} titleStyle={styles.title}
            onPress={onExam}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline'
  },
  text: {
    color: '#ddd',
    fontSize: 16,
    marginRight: 4,
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: 'gold'
  },
});
