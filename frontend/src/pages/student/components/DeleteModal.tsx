import { Button, Text, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { widgetStyles } from "../../../shared/appStyles";


interface Props {
  title: string;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export function DeleteModal({ title, isOpen, onCancel, onDelete }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalContent w='380px'>
        <ModalHeader style={widgetStyles.alert}>{title}</ModalHeader>

        <ModalBody>
          <Text pt={2} style={widgetStyles.alert} align='center'>
            Do you really want to delete it?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onDelete}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
