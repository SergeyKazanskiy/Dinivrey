import { HStack} from "@chakra-ui/react";
import { useStore } from '../store';
import { DateStepper } from '../../../components/DateStepper';
import { months } from '../../../shared/constants';
import { getCurrentYear, getCurrentMonth } from '../../../shared/utils';


export const DateFilter: React.FC = () => {
    const { year, month } = useStore();
    const { selectDate } = useStore();

    function nextMonth() {
        if (month === 12) { selectDate(year + 1, 1)}
        else { selectDate(year, month + 1)}
    }

    function prevMonth() {
        if (month === 1) { selectDate(year - 1, 12)}
        else { selectDate(year, month - 1)}
    }

    return (
        <HStack spacing='2'>
            <DateStepper title={String(year)} w='60px'
                onPrev={() => selectDate(year - 1, 12)}
                onNext={() => selectDate(year + 1, 1)}
                canNext={getCurrentMonth() === 12 ? true : year < getCurrentYear()}
            />
            <DateStepper title={months[month-1]} w='90px'
                onPrev={prevMonth}
                onNext={nextMonth}
                canNext={getCurrentMonth() === 12 ? true : month <= getCurrentMonth()}
            />  
        </HStack>
    )
};


