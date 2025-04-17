import { useState } from 'react';
import { IconButton, Menu, MenuList, Text, MenuButton, CloseButton } from "@chakra-ui/react";
import { Input, Button, ButtonGroup, useDisclosure, HStack } from "@chakra-ui/react";

import { EditIcon } from '@chakra-ui/icons';


interface Props {
  name: string;
  desc: string;
  onUpdate: (name: string, city: string) => void;
  onDelete: () => void;
}

export function GroupPopover({ name, desc, onUpdate, onDelete }: Props) {
  const { isOpen, onClose, onOpen} = useDisclosure();
  const [newName, setNewName] = useState(name);
  const [newDesc, setNewDesc] = useState(desc);

  function handleUpdate() {
    onUpdate(newName, newDesc);
    onClose();
  }

  function handleDelete() {
    onDelete();
    onClose();
  }

  return (
    <Menu size='sm' isOpen={isOpen} onOpen={onOpen} placement="bottom">
      <MenuButton  onClick={(event) => { event.stopPropagation() }}>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' bg='unset' icon={<EditIcon />}/>
      </MenuButton>
      <MenuList p={2}>
        <HStack justifyContent='space-between'>
          <Text fontSize={16} color='blue.500' my='8px'>Name</Text>
          <CloseButton color='gray.600' onClick={(e) => (onClose(), e.stopPropagation())}/>
        </HStack>
        
        <Input size='sm' value={newName} placeholder='Enter' w='280px'
          onChange={(e) => setNewName(e.target.value)}
          onClick={(event) => { event.stopPropagation() }}/>

        <Text align='left' fontSize={16} color='blue.500' my='8px'>Description</Text>
        <Input size='sm' value={newDesc} placeholder='Enter' w='280px'
          onChange={(e) => setNewDesc(e.target.value)}
          onClick={(event) => { event.stopPropagation() }}/>

        <ButtonGroup display='flex' justifyContent='flex-end' mt={2}>
          <Button size='sm' variant='solid' colorScheme='blue' px={5}
            isDisabled={name === newName && desc === newDesc}
            onClick={(e) => (handleUpdate(), e.stopPropagation())}>Update</Button>
          <Button size='sm' variant='solid' colorScheme='blue' px={5}
            onClick={(e) => (handleDelete(), e.stopPropagation())}>Delete</Button>
        </ButtonGroup>
      </MenuList>
    </Menu>
  );
}
