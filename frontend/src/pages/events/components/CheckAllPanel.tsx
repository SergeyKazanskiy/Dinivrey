import { Box, Divider, Flex, Checkbox, Text } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';


export const CheckAllPanel: React.FC = () => {
    const { isAllChecked } = useStore();
    const { setAllChecked } = useStore();

    return (
        <Box borderTopWidth='1px' borderColor='gray.200'>
           
            <Flex  mt='4px' justifyContent='space-between' h ='28px' align='center'>
                <Text p='4px' fontSize='sm' style={widgetStyles.label}>
                    Check All
                </Text>
                <Checkbox size='md' pr={3} isChecked={isAllChecked} colorScheme="gray" opacity={0.7}
                    onChange={(e) => setAllChecked()}/>
            </Flex>
        </Box>
    )
};

