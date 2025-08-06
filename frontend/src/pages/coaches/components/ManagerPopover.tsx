import { useState } from 'react';
import { IconButton, Menu, MenuList, Text, MenuButton, CloseButton, VStack } from "@chakra-ui/react";
import { Input, Button, ButtonGroup, useDisclosure, HStack } from "@chakra-ui/react";
import { Manager } from '../model';
import { ChevronDownIcon } from '@chakra-ui/icons';


interface Props {
  first_name: string;
  last_name: string;
  phone: string;
  onUpdate: (data: Partial<Manager>) => void;
  onDelete: () => void;
}

export function ManagerPopover({ first_name, last_name, phone, onUpdate, onDelete }: Props) {
  const { isOpen, onClose, onOpen} = useDisclosure();
  
  const [newFirstName, setNewFirsrName] = useState(first_name);
  const [newLastName, setNewLastName] = useState(last_name);
  const [newPhone, setNewPhone] = useState(phone);

  function handleUpdate() {
    const data: Partial<Manager> = {
      first_name: newFirstName,
      last_name: newLastName,
      phone: newPhone
    }
    onUpdate(data);
    onClose();
  }

  function handleDelete() {
    onDelete();
    onClose();
  }

  return (
    <Menu size='sm' isOpen={isOpen} onOpen={onOpen} placement="bottom">
      <MenuButton>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' bg='unset' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList p={3} borderWidth={1} borderColor='gray.300'>
        <HStack justifyContent='space-between'>
          <Text fontSize={18} color='red.500' my='4px'>Manager info</Text>
          <CloseButton color='gray.600' onClick={onClose}/>
        </HStack>
        
        <VStack spacing={2} alignItems='flex-start' my={2}>
          <Text fontSize={14} color='blue.500'>First name 
          <Input size='sm' value={newFirstName} placeholder='Enter' w='200px' ml={2}
            onChange={(e) => setNewFirsrName(e.target.value)}/></Text>

          <Text fontSize={14} color='blue.500' >Last name 
          <Input size='sm' value={newLastName} placeholder='Enter' w='200px' ml={2}
            onChange={(e) => setNewLastName(e.target.value)}/></Text>

          <Text fontSize={14} color='blue.500' >Phone 
          <Input size='sm' value={newPhone} placeholder='Enter' w='200px' ml={9}
            onChange={(e) => setNewPhone(e.target.value)}/></Text>
        </VStack>

        <ButtonGroup display='flex' justifyContent='flex-end' mt={2}>
          <Button size='sm' variant='solid' colorScheme='blue' px={5}
            isDisabled={first_name === newFirstName && last_name === newLastName && phone === newPhone}
            onClick={handleUpdate}>Update</Button>

          <Button size='sm' variant='outline' colorScheme='blue' px={5}
            onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      </MenuList>
    </Menu>
  );
}
