import { HStack, Button, Text, Flex } from "@chakra-ui/react";
import { useStore } from '../store';
import { ManagerPopover } from '../components/ManagerPopover';


export const ManagersView: React.FC = () => {
    const { managers, manager_id } = useStore();
    const { selectManager, createManager, updateManager, deleteManager } = useStore();

    return (
        <HStack align='start' alignItems='baseline' spacing='16px' bg='gray.200' pl={4}>
            <Text color='blue.600' fontSize={16} >Managers:</Text>
            {managers.map((item) => (
                <Flex>
                    <Text as={item.id === manager_id ? 'u' : 'abbr'} key={item.id} color='red.600' fontSize={15} cursor='pointer'
                        mr={item.id === manager_id ? '0px' : '16px'}
                        onClick={() => selectManager(item.id)}>

                        {item.first_name} {item.last_name}
                    </Text>
                    {item.id === manager_id &&
                        <ManagerPopover first_name={item.first_name} last_name={item.last_name}  phone={item.phone} 
                            onUpdate={updateManager} onDelete={deleteManager}/>}
                </Flex>
            ))}
            <Button size='sm' h='20px' cursor='pointer' variant='ghost'
                isDisabled={managers.length > 2}
                onClick={createManager}>
                +
            </Button>
        </HStack>
    )
};
