import { StyleSheet, View, Text } from 'react-native';
import { useStore } from '../../store';
import { DateStepper } from '../../../../../shared/components/DateStepper';
import { getCurrentYear, getCurrentMonth, getWeeksInMonth } from '../../../../../shared/utils';
import { months } from '../../../../../shared/constants';
import { NumberButtons } from '../../../../../shared/components/NumberButtons';
import { SelectedField, Option } from '../../../../../shared/components/SelectedField';


export function CalendarView() {
    const { event_year, event_month, event_week, isWeekFilter, groups, group_inx } = useStore();
    const { selectDate, togleFilter, selectGroup } = useStore();
    const groupNames: Option[] = groups.map(el => ({"id": el.id, "name": el.camp_name + ', ' + el.name}));


    function nextMonth() {
        if (event_month === 12) { selectDate(event_year + 1, 1, 0)}
        else { selectDate(event_year, event_month + 1, 0)}
    }

    function prevMonth() {
        if (event_month === 1) { selectDate(event_year - 1, 12, 0)}
        else { selectDate(event_year, event_month - 1, 0)}
    }

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <DateStepper title={String(event_year)}
                    onPrev={() => selectDate(event_year - 1, 12, 0)}
                    onNext={() => selectDate(event_year + 1, 1, 0)}
                    canNext={getCurrentMonth() === 12 ? true : event_year < getCurrentYear()}
                />
                <DateStepper title={months[event_month-1]} 
                    onPrev={prevMonth}
                    onNext={nextMonth}
                    canNext={getCurrentMonth() === 12 ? true : event_month <= getCurrentMonth()}
                />
            </View>

            <View style={[styles.calendar, styles.section]}>
                <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                    <Text onPress={togleFilter}>🔁</Text>
                    <Text style={[styles.weeks, {marginLeft: 8}]}>{isWeekFilter ? "Weeks: " : "Groups: "}</Text>
                </View>
                {isWeekFilter &&
                    <View>
                        <NumberButtons
                            maxNumber={getWeeksInMonth(event_year, event_month)}
                            selectedNumber={event_week}
                            onPress={(value) => selectDate(event_year, event_month, value)}
                        />
                    </View>
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
   // backgroundColor: 'gray'
  },
  weeks: {
    color: 'white',
    fontSize: 16,
  },
});
