import { StyleSheet, View, Text } from 'react-native';
import { useStore } from '../../store';
import { getWeeksInMonth } from '../../../../../shared/utils';
import { TypesView } from './TypesView';
import { SelectedField, Option } from '../../../../../shared/components/SelectedField';
import { Button } from '../../../../../shared/components/CustomButton';
import { Ionicons } from '@expo/vector-icons';


export function FilterView() {
    const { isSchedulesView, groups, group_inx } = useStore();
    const { togleFilter, selectGroup, clearGroup } = useStore();
   
    const groupNames: Option[] = groups.map(el => ({"id": el.id, "name": el.name}));

    return (
        <View style={styles.container}>
          <View style={styles.section}>
            <View style={[styles.row, {marginTop: 10}]}>
              <Button title='Schedule' type='solid' //disabled={!isSchedulesView}
                buttonStyle={[styles.button, {backgroundColor: !isSchedulesView ? '#2E4A7C' : '#152B52'}]}
                titleStyle={styles.title}
                onPress={togleFilter}
              />
              <Button title='Events' type='solid'// disabled={isSchedulesView}
                buttonStyle={[styles.button, {backgroundColor: isSchedulesView ? '#2E4A7C' : '#152B52'}]}
                titleStyle={styles.title}
                onPress={togleFilter}
              />
            </View>
            <View style={styles.row}>
              <SelectedField data={groupNames} selectedIndex={group_inx} onSelect={selectGroup}/>
              <Ionicons name='close-circle-outline' size={24} color="#2089dc"
                style={{marginTop: 12, paddingLeft: 8, paddingRight: 2}}
                onPress={clearGroup}/>
            </View>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  calendar: {
    paddingLeft: 8,
    alignItems: 'center',
  },
  weeks: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: 'gold'
  },
});
