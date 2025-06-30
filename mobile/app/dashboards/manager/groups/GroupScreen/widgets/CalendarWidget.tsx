import { StyleSheet, View } from 'react-native';
import { DateStepper } from '../../../../../shared/components/DateStepper';
import { getCurrentYear, getCurrentMonth } from '../../../../../shared/utils';
import { months } from '../../../../../shared/constants';


export type Props = {
    year: number;
    month: number;
    selectDate: (year: number, month: number) => void;
};

export const CalendarWidget: React.FC<Props> = ({ year, month, selectDate }) => { 

    function nextMonth() {
        if (month === 12) { selectDate(year + 1, 1)}
        else { selectDate(year, month + 1)}
    }

    function prevMonth() {
        if (month === 1) { selectDate(year - 1, 12)}
        else { selectDate(year, month - 1)}
    }

    return (
        <View style={styles.container}>
            <DateStepper title={String(year)}
                onPrev={() => selectDate(year - 1, 12)}
                onNext={() => selectDate(year + 1, 1)}
                canNext={getCurrentMonth() === 12 ? true : year < getCurrentYear()}
            />
            <DateStepper title={months[month-1]} 
                onPrev={prevMonth}
                onNext={nextMonth}
                canNext={getCurrentMonth() === 12 ? true : month <= getCurrentMonth()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
