import { StyleSheet, View, Text } from 'react-native';
import { useStore } from '../../store';
import { DateStepper } from '../../../../../shared/components/DateStepper';
import { getCurrentYear, getCurrentMonth, getWeeksInMonth } from '../../../../../shared/utils';
import { months } from '../../../../../shared/constants';
import { NumberButtons } from '../../../../../shared/components/NumberButtons';


export function CalendarView() {
    const { event_year, event_month, event_week } = useStore();
    const { selectDate } = useStore();

    function nextMonth() {
        if (event_month === 12) { selectDate(event_year + 1, 1, 0)}
        else { selectDate(event_year, event_month + 1, 0)}
    }

    function prevMonth() {
        if (event_month === 1) { selectDate(event_year - 1, 12, 0)}
        else { selectDate(event_year, event_month - 1, 0)}
    }

    return (
        <>
            <View style={styles.container}>
                <Text>DINIVREY</Text>
                <DateStepper title={String(event_year)}
                    onPrev={() => selectDate(event_year - 1, 12, 0)}
                    onNext={() => selectDate(event_year + 1, 1, 0)}
                    canNext={getCurrentMonth() === 12 ? true : event_year < getCurrentYear()}
                />
            </View>

            <View style={styles.container}>
                <DateStepper title={months[event_month-1]} 
                    onPrev={prevMonth}
                    onNext={nextMonth}
                    canNext={getCurrentMonth() === 12 ? true : event_month <= getCurrentMonth()}
                />
                <NumberButtons
                    maxNumber={getWeeksInMonth(event_year, event_month)}
                    selectedNumber={event_week}
                    onPress={(value) => selectDate(event_year, event_month, value)}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
