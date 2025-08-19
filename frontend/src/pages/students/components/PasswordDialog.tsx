import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Text, Input } from "@chakra-ui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";
import { widgetStyles } from "../../../shared/appStyles";


interface Props {
  isOpen: boolean;
  name: string;
  password: string;
  onCancel: () => void;
  onUpdate: (password: string) => void;
}

export function PasswordDialog({ isOpen, name, password, onCancel, onUpdate }: Props) {
  const [newPassword, setNewPassword] = useState(password);
  
  useEffect(() => {
    setNewPassword(password);
  }, [password]);

  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalContent w='340px'>
        <ModalHeader fontSize='lg' fontWeight='bold' color='red.500'  bg='gray.100'>
          Update password!
        </ModalHeader>
        <ModalCloseButton/>

        <ModalBody p={2}>
          <Text style={widgetStyles.alert} p={2}>Enter password for {name}</Text>
          <Input size='sm' value={newPassword} placeholder='Enter' w='300px' mb={2}
            onChange={(e) => setNewPassword(e.target.value)}/>
        </ModalBody>

        <ModalFooter  bg='gray.100'>
          <ButtonGroup colorScheme='blue' size='sm'>
            <Button onClick={() => onUpdate(newPassword)}>Update</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
