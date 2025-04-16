import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import ProfileCell from "../../../components/ProfileCell";
import { useStore } from "../store";
import { widgetStyles } from '../../../shared/appStyles';

export function GameModal() {
  const { caughted, freeded, description, isGameModal} = useStore();
  const {setCaughted, setFreeded, setDesc, updateGame, closeGameModal } = useStore();

  return (
    <Modal isOpen={isGameModal} onClose={closeGameModal} isCentered>
      <ModalContent  w='320px'>
        <ModalHeader bg='gray.100'>Current game</ModalHeader>

        <ModalBody >
          <ProfileCell label="Caughted" value={caughted} maxLength={4} w1='210px' w2='60px'
            onChange={(value) => setCaughted(Number(value))}/>
          <ProfileCell label="Freeded" value={freeded} maxLength={4} w1='210px' w2='60px'
            onChange={(value) => setFreeded(Number(value))}/>
          <Text mt={2} style={widgetStyles.text}>Description</Text>  
          <ProfileCell label="" value={description} maxLength={4} w1='1px' w2='264px'
            onChange={(value) => setDesc(String(value))}/>
        </ModalBody>

        <ModalFooter display='flex' justifyContent='flex-end'>
            <Button size='sm' variant='outline' colorScheme='blue' mr={2}
              onClick={closeGameModal}>Cancel</Button>
            <Button size='sm' variant='solid' colorScheme='blue' px={5}
              onClick={() => {updateGame(); closeGameModal()}}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

