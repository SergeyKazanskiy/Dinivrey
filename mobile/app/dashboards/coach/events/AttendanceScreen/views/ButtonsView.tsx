import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../../../../../shared/components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { SelectWrapper } from '../../../../../shared/components/SelectWrapper';
import { GamesMenu } from './GamesMenu';
import { Game } from '../../model';


type SelectButtonProps = {
  label: string;
  onPress: () => void;
};

export const SelectButton: React.FC<SelectButtonProps> = ({ label, onPress }) => (
  <Button title={label}
    type='outline' 
    buttonStyle={styles.button}
    titleStyle={styles.title}
    onPress={onPress}
  />
);


interface Props {
  event_type: string;
  onAdd: () => void;
  onExam: () => void;
  onGame: () => void;
  games: Game[];
  onGameReport: (id_game: number) => void;
  isNotifications: boolean;
  onNotifications: () => void;
}

export function ButtonsView({ event_type, onAdd, onExam, onGame, games, onGameReport, isNotifications, onNotifications }: Props) {
  return (
    <View style= {styles.container}>
      <SelectButton label='Add drills' onPress={onAdd}/>

      <View style= {styles.section}>
        {isNotifications ?
          <Ionicons name='mail-unread-outline' size={20} color='#D1FF4D' style={{ marginRight: 32 }}
            onPress={onNotifications}/> :
          <Text style={styles.text}>Go to </Text>
        }

        { games.length === 0 && <SelectButton label='Game' onPress={onGame}/> }

        { games.length > 0 &&
          <SelectWrapper
            label={'Game(' + games.length +')'}
            buttonStyle={styles.button} labelStyle={styles.title}
          >
             {(close, position) => (
              <>
                {position && 
                  <GamesMenu games={games}
                    onNew={onGame} onSelect={(id)=>onGameReport(id)} close={close}/>
                }
              </>
            )}
          </SelectWrapper>
        }
        {event_type === 'Exam' && <SelectButton label='Exam' onPress={onExam}/>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
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



// <PopoverButton title={'Game(' + games.length +')'} h={120} w={330}
//     buttonStyle={[styles.button, {backgroundColor: '#152B52'}]}
//     textStyle={styles.title}
//     onClick={() => {}}>

//     <Button title='New game' type='outline' 
//       buttonStyle={[styles.button, {backgroundColor: '#152B52'}]}
//       titleStyle={styles.title}
//       onPress={onGame}
//     />  
//     <GamesMenu games={games} onClick={(id) => onGameReport(id)}/>
// </PopoverButton>