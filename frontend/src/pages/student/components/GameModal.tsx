import { useState, useEffect  } from 'react';
import { Button, Text, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Flex } from "@chakra-ui/react";
import { widgetStyles } from "../../../shared/appStyles";


interface Props {
  field: string;
  value: number;
  isOpen: boolean;
  onCancel: () => void;
  onSave: (value: number) => void;
}

export function GameModal({ field, value, isOpen, onCancel, onSave }: Props) {
  const [points, setPoints] = useState(value);

  useEffect(() => {
    setPoints(value);
  }, [value])

  const handleSave = () => {
    onSave(points);
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalContent w='320px'>
        <ModalHeader style={widgetStyles.alert} bg='gray.200'>Update {field}</ModalHeader>

        <ModalBody>
          <Flex>
            <Text pt={2} mr={2} style={widgetStyles.alert} align='center'>
              Enter {field} points:  
            </Text>
            <Input size='sm' width="60px" textAlign="center" bg="green.600" color="white" mr={1} maxLength={2}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button size='sm' onClick={onCancel} mr={3}>Cancel</Button>
          <Button size='sm' onClick={handleSave} colorScheme="blue">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
