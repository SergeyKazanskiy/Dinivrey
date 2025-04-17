import { useEffect } from 'react';
import { VStack, SimpleGrid, Box, Modal, ModalContent, Flex, Text, Button, Divider } from "@chakra-ui/react";
import { screenStyles, widgetStyles } from '../../shared/appStyles'
import { useStore } from './store';

import { FiltersView } from './views/FiltersView';
import { EventsView } from './views/EventsView';
import { EventView } from './views/EventView';
import { AttendancesView } from './views/AttendancesView';
import { StudentsView } from './views/StudentsView';
import { DeleteView } from './views/DeleteView';


export const EventsPage: React.FC = () => {
    const { isModal, isAdd, isUpdate, isDelete, isStudentsView, isAttendanceView } = useStore();
    const { loadCamps, closeModal, addAttendances, deleteAttendances } = useStore();

    useEffect(() => {
        loadCamps();
    }, [loadCamps]);

    return (
        <VStack align='start' >
            <FiltersView/>

            <SimpleGrid pl={3} display='flex' flexWrap='wrap' justifyContent='flex-start' gap={4}>
                <Box style={screenStyles.widget} h='740px' w='854px'>

                    {isModal && <Modal isOpen={isModal} onClose={closeModal} isCentered>
                        <ModalContent w='380px'>
                            {isAdd && <EventView isNew/>}
                            {isUpdate && <EventView/>}
                            {isDelete && <DeleteView/>}
                        </ModalContent>
                    </Modal>}
             
                    <EventsView/>
                </Box>

                <Box px='12px' pt='2px' style={screenStyles.widget} w='268px'>
                    <Flex justifyContent='space-between' align='start'>
                        <Text color='red.400'>Attendance</Text>
                        {isStudentsView && <Button size='sm' colorScheme="blue"
                            onClick={addAttendances}>Add Blank</Button>}
                        {isAttendanceView && <Button size='sm' colorScheme="blue" variant='outline'
                            onClick={deleteAttendances}>Delete Blank</Button>}
                    </Flex>
                    <Box borderTopWidth={1} borderColor='gray.100' p={1}>       
                        {isStudentsView && <StudentsView/>}
                        {!isStudentsView && <AttendancesView/>}
                    </Box> 
                </Box>   
            </SimpleGrid>
        </VStack>
    )
};

