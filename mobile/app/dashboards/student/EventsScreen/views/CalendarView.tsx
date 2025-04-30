import { StyleSheet, View } from 'react-native';
import { useStore } from '../../store';
import { DateStepper } from '../../../../shared/components/DateStepper';
import { getCurrentYear, getCurrentMonth } from '../../../../shared/utils';
import { months } from '../../../../shared/constants';


export function CalendarView() {
    const { event_year, event_month } = useStore();
    const { selectEventDate } = useStore();

    function nextMonth() {
        if (event_month === 12) { selectEventDate(event_year + 1, 1)}
        else { selectEventDate(event_year, event_month + 1)}
    }

    function prevMonth() {
        if (event_month === 1) { selectEventDate(event_year - 1, 12)}
        else { selectEventDate(event_year, event_month - 1)}
    }

    return (
        <View style={styles.container}>
            <DateStepper title={String(event_year)}
                onPrev={() => selectEventDate(event_year - 1, 12)}
                onNext={() => selectEventDate(event_year + 1, 1)}
                canNext={getCurrentMonth() === 12 ? true : event_year < getCurrentYear()}
            />
            <DateStepper title={months[event_month-1]} 
                onPrev={prevMonth}
                onNext={nextMonth}
                canNext={getCurrentMonth() === 12 ? true : event_month <= getCurrentMonth()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10
  },
});
