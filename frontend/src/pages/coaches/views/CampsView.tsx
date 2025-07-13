import { HStack, Text, Flex, Button, Image } from "@chakra-ui/react";
import { useStore } from '../store';
import { DateFilter } from '../components/DateFilter';


export const CampsView: React.FC = () => {
    const { camps, camp_id, isSchedule } = useStore();
    const { selectCamp, showSchedules, showEvents } = useStore();

    return (
        <HStack bg='gray.200' borderWidth={1} borderColor='gray.300' py={2} pl={4} w='100%' justifyContent='space-between'>
            <HStack align='start' alignItems='baseline' spacing='16px'>
                {camps.map((item, inx) => (
                    <Flex>
                        <Text as={item.id === camp_id ? 'u' : 'abbr'} key={item.id} color='gray.600' fontSize={15}
                            cursor='pointer' mr={2} onClick={() => selectCamp(item.id, inx)}>

                            {item.name}
                        </Text>
                    </Flex>
                ))}
            </HStack>

            <HStack justifyContent='flex-start'  spacing='8px' w='356px'>
                <Image src={`/images/Event.png`} alt='icon' boxSize='24px' bg={isSchedule ? 'blue.100' : 'unset'}
                    onClick={showSchedules}/>
                <Image src={`/images/Game.png`} alt='icon' boxSize='24px' bg={!isSchedule ? 'blue.100' : 'unset'}
                    onClick={showEvents}/>

                {!isSchedule && <DateFilter/>}
            </HStack>
        </HStack>
    )
};
//isDisabled={!isSchedule}