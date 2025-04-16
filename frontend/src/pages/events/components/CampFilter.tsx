import { HStack, Button, Flex } from "@chakra-ui/react";
import { useStore } from '../store';


export const CampFilter: React.FC = () => {
    const { camps, camp_id } = useStore();
    const { selectCamp } = useStore();

    return (
        <HStack spacing='2px' my='4px' bg='white' borderWidth={1} borderColor='gray.300' px={2} h='35px'>
            {camps.map((item, inx) => (
                <Button key={inx} size='sm' bg='unset' color='blue.500' fontWeight='middle'
                    sx={item.id === camp_id ? { textDecoration: "underline" } : {}}
                    onClick={() => selectCamp(item.id, inx)}>

                    {item.name}
                </Button>
            ))}
        </HStack>
    )
};
