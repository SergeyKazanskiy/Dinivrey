import { HStack, Box, Spacer, Text, Fade, useDisclosure } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useStore } from '../store';
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { TablesView } from './TablesView'
import { ChartsView } from './ChartsView'
import { DateStepper } from '../../../components/DateStepper'
import { months } from '../../../shared/constants';
import { getCurrentYear, getCurrentMonth } from '../../../shared/utils';


export const EventsView: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const { year, month, selectDate } = useStore();

    function nextMonth() {
        if (month === 12) { selectDate(year + 1, 1)}
        else { selectDate(year, month + 1)}
    }

    function prevMonth() {
        if (month === 1) { selectDate(year - 1, 12)}
        else { selectDate(year, month - 1)}
    }

    return (
        <Box style={screenStyles.widget} h='500px' w='720px' p={1}>
            <HStack px={4}>
                <RepeatIcon onClick={onToggle} />
                <Text style={widgetStyles.title}>Performance trends</Text>
                <Spacer/>
                <DateStepper title={String(year)} w='70px'
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

            {!isOpen && <Fade in={!isOpen}><TablesView/></Fade>}
            {isOpen && <Fade in={isOpen}><ChartsView/></Fade>}
        </Box>
    )
};
