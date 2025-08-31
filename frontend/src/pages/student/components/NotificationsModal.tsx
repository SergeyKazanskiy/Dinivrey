import { Button, Text, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Center, Box } from "@chakra-ui/react";
import { widgetStyles } from "../../../shared/appStyles";


interface Props {
  isOpen: boolean;
  onCancel: () => void;
  notifications: string[];
  onRead: () => void;
}

export function NotificationsModal({ isOpen, notifications, onCancel, onRead }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalContent w='760px'>
        <ModalHeader style={widgetStyles.alert} bg='gray.200'>Notifications</ModalHeader>
        <ModalBody h='300px'>
          { notifications.length === 0 &&
            <Center h='90%'>
              <Text fontSize='16' color='gray.400'>Empty list</Text>
            </Center>
          }
          { notifications.length > 0 &&
            <Box h='100%' overflow='scroll'>
              {notifications.map((notification, inx) => (
                  <Text key={inx} fontSize='sm' mt='4px'  style={widgetStyles.text}>
                      {notification}
                  </Text>
              ))}
            </Box>
          }
        </ModalBody>
        <ModalFooter>
          <Button size='sm' onClick={onCancel} mr={3}>Cancel</Button>
          <Button size='sm' onClick={onRead} colorScheme="blue">Read</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
