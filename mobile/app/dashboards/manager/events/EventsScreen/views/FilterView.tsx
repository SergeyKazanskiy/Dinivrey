import { StyleSheet, View, Text } from 'react-native';
import { useStore } from '../../store';
import { getWeeksInMonth } from '../../../../../shared/utils';
import { NumberButtons } from '../../../../../shared/components/NumberButtons';
import { SelectedField, Option } from '../../../../../shared/components/SelectedField';


export function FilterView() {
    const { year, month, week, isWeekFilter, groups, group_inx } = useStore();
    const { selectWeek, togleFilter, selectGroup } = useStore();
   
    const groupNames: Option[] = groups.map(el => ({"id": el.id, "name": el.name}));

    return (
        <View style={styles.container}>
            <View style={[styles.calendar, styles.section]}>
                <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                    <Text onPress={togleFilter}>🔁</Text>
                    <Text style={[styles.weeks, {marginLeft: 8}]}>{isWeekFilter ? "Weeks: " : "Groups: "}</Text>
                </View>
                {isWeekFilter &&
                    <NumberButtons
                        maxNumber={getWeeksInMonth(year, month)}
                        selectedNumber={week}
                        onPress={(value) => selectWeek(value)}
                    />
                }
                {!isWeekFilter && <SelectedField data={groupNames} selectedIndex={group_inx} onSelect={selectGroup}/>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    marginVertical: 4
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendar: {
    paddingLeft: 8,
    alignItems: 'center',
  },
  weeks: {
    color: 'white',
    fontSize: 16,
  },
});
