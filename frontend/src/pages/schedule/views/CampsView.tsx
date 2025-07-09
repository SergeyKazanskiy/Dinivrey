import { HStack, Text, Flex } from "@chakra-ui/react";
import { useStore } from '../store';


export const CampsView: React.FC = () => {
    const { camps, camp_id } = useStore();
    const { selectCamp } = useStore();

    return (
        <HStack align='start' alignItems='baseline' spacing='16px' bg='gray.200'
            borderWidth={1} borderColor='gray.300' py={2} pl={4} w='100%'>
                
            {camps.map((item, inx) => (
                <Flex>
                    <Text as={item.id === camp_id ? 'u' : 'abbr'} key={item.id} color='gray.600' fontSize={15}
                        cursor='pointer' mr={2}
                        onClick={() => selectCamp(item.id, inx)}>

                        {item.name}
                    </Text>
                </Flex>
            ))}
        </HStack>
    )
};
