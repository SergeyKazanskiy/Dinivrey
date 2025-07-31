import { HStack, Button, Text, Flex } from "@chakra-ui/react";
import { useStore } from '../store';
import { CampPopover } from '../components/CampPopover';

export const CampsView: React.FC = () => {
    const { camps, camp_id } = useStore();
    const { selectCamp, createCamp, updateCamp, deleteCamp } = useStore();

    return (
        <HStack align='start' alignItems='baseline' spacing='16px' bg='gray.200' borderWidth={1} borderColor='gray.300' py={2} pl={4} w='100%'>
            {camps.map((item, inx) => (
                <Flex>
                    <Text as={item.id === camp_id ? 'u' : 'abbr'} key={item.id} color='gray.600' fontSize={15} cursor='pointer'
                        mr={item.id === camp_id ? '0px' : '19px'}
                        onClick={() => selectCamp(item.id, inx)}>

                        {item.name}
                    </Text>
                    {item.id === camp_id &&
                        <CampPopover name={item.name} city={item.city} 
                            onUpdate={updateCamp} onDelete={deleteCamp}/>}
                </Flex>
            ))}
            <Button size='sm' h='20px' cursor='pointer' variant='ghost'
                isDisabled={camps.length > 2}
                onClick={createCamp}>
                +
            </Button>
        </HStack>
    )
};
