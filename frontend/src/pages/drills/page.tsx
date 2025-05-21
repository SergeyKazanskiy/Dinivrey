import { useEffect } from 'react';
import { VStack, SimpleGrid, Box, Modal, ModalContent, Flex, Text, Button } from "@chakra-ui/react";
import { screenStyles, widgetStyles } from '../../shared/appStyles'
import { useStore } from './store';
import { DrillsView } from './views/DrillsView';
import { DrillView } from './views/DrillView';
import { DrillModal } from './components/DrillModal';
import { DeleteMenu } from '../../components/DeleteMenu';


export const DrillsPage: React.FC = () => {
    const { isModal, isAdd, isDelete, drills } = useStore();
    const { loadDrills, closeModal, deleteDrill } = useStore();

    useEffect(() => {
        loadDrills();
    }, [loadDrills]);

    return (
        <VStack align='start' >
            <Box w='100%' h='36px' bg='gray.200' borderWidth={1} borderColor='gray.300'>
                <Text ml={6} pt={1} fontSize={16} color='gray.600' fontWeight='400'>
                    Drills aimed at developing strength, coordination, flexibility and confidence in children
                </Text>
            </Box>
            <SimpleGrid h='740px' pl={3} display='flex' flexWrap='wrap' justifyContent='flex-start' gap={4}>
                <Box style={screenStyles.widget} w='800px'>
                    {isModal && <Modal isOpen={isModal} onClose={closeModal} isCentered>
                        <ModalContent w='380px'>
                            {isAdd && <DrillModal/>}
                            {isDelete && <DeleteMenu deleteAction={deleteDrill}/>}
                        </ModalContent>
                    </Modal>}
             
                    <DrillsView/>
                </Box>

                <Box px='12px' pt='2px' style={screenStyles.widget} w='320px'>
                    <DrillView/>
                </Box>   
            </SimpleGrid>
        </VStack>
    )
};

