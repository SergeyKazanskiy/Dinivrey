import { StyleSheet, View } from 'react-native';
import { SelectWrapper } from '../../../../shared/components/SelectWrapper';
import { Camp, Group } from '../../model';
import { ListView } from '../../../../shared/components/ListView';


type Props = {
  placeholder: string;
  camp_inx: number;
  loaded_group_name: string;
  camps: Camp[];
  groups: Group[];
  onOpen: () => void;
  onCamp: (id: number, inx: number) => void;
  onGroup: (id: number, inx: number) => void;
};

export const GroupsSelect: React.FC<Props> =
  ({ placeholder, camp_inx, loaded_group_name, camps, groups, onOpen, onCamp, onGroup }) => {
  
  const camp_id = camp_inx > -1 ? camps[camp_inx].id : 0

  return (
  <View style={styles.container}>
    <SelectWrapper
      label={loaded_group_name === '' ? placeholder : loaded_group_name}
      isIcon={true}
      buttonStyle={styles.button}
      labelStyle={styles.title}
      onOpen={onOpen}
    >
      {(close, position) => (
        <>
          {position && 
            <View style={styles.modal}>
              <ListView data={camps} onItem={onCamp} item_id={camp_id} isHorizontal
                textStyle={{ fontSize: 15, color: "#ddd" }}/>

              <ListView data={groups} onItem={(id, inx) => (onGroup(id, inx), close())} 
                textStyle={{ fontSize: 15, color: "#ddd" }}/>  
            </View>
          }
        </>
      )}
    </SelectWrapper>
  </View>
)};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 16,
    paddingLeft: 2,
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    color: '#888'
  },
  modal: {
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    backgroundColor: '#0e1d37ff',
    padding: 16,
    borderRadius: 16,
    //height: 200
  },
});

