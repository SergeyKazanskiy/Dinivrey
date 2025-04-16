import { Button, ButtonGroup, Text  } from "@chakra-ui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, ModalOverlay } from "@chakra-ui/react";
import { widgetStyles } from "../shared/appStyles";


interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onYes: () => void;
  onNo: () => void;
}

export function BackAlert({ isOpen, onCancel, onYes, onNo }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalOverlay/>
      <ModalContent w='360px'>
        <ModalHeader fontSize='lg' fontWeight='bold' color='red.500'  bg='gray.100'>
          Attention!
        </ModalHeader>
        <ModalCloseButton/>

        <ModalBody p={2}>
          <Text style={widgetStyles.alert} align='center'> There were changes.</Text>
          <Text style={widgetStyles.alert} align='center'> Save them?</Text>
        </ModalBody>

        <ModalFooter  bg='gray.100'>
          <ButtonGroup colorScheme='blue' size='sm'>
            <Button onClick={onYes}>Yes</Button>
            <Button onClick={onNo}>No</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
