import { HStack, Checkbox, Text } from "@chakra-ui/react";
import { useStore } from '../store';
import { eventTypes } from '../../../shared/constants';


export const TypesFilter: React.FC = () => {
    const { isGame, isTest, isTraning } = useStore();
    const { setIsGame, setIsTest, setIsTraning } = useStore();

    return (        
        <HStack mt='4px' bg='white' borderWidth={1} borderColor='gray.300' px={3} h='35px'>
            <Checkbox size='sm' isChecked={isGame} colorScheme="gray" onChange={(e) => setIsGame()}/>
            <Text fontSize={15} color='blue.500' pr={3}>{eventTypes[0]}</Text>

            <Checkbox size='sm' isChecked={isTest} colorScheme="gray" onChange={(e) => setIsTest()}/>
            <Text fontSize={15}  color='blue.500' pr={3}>{eventTypes[1]}</Text>

            <Checkbox size='sm' isChecked={isTraning} colorScheme="gray" onChange={(e) => setIsTraning()}/>
            <Text fontSize={15} color='blue.500'>{eventTypes[2]}</Text>      
        </HStack>
    )
};
