import { useState } from 'react';
import { IconButton, Menu, MenuList, Text, MenuButton, CloseButton } from "@chakra-ui/react";
import { Input, Button, ButtonGroup, useDisclosure, HStack } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { SimpleSelect } from '../../../components/SimpleSelect';
import { Locations } from '../../../shared/constants';


interface Props {
  name: string;
  city: string;
  onUpdate: (name: string, city: string) => void;
  onDelete: () => void;
}

export function CampPopover({ name, city, onUpdate, onDelete }: Props) {
  const { isOpen, onClose, onOpen} = useDisclosure();
  const [newName, setNewName] = useState(name);
  const [newCity, setNewCity] = useState(city);

  function handleUpdate() {
    onUpdate(newName, newCity);
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
      <MenuList p={2}>
        <HStack justifyContent='space-between'>
          <Text fontSize={16} color='blue.500' my='8px'>Name</Text>
          <CloseButton color='gray.600' onClick={onClose}/>
        </HStack>
        
        <Input size='sm' value={newName} placeholder='Enter' w='280px'
          onChange={(e) => setNewName(e.target.value)}/>

        <Text fontSize={16} color='blue.500' my='8px'>Location</Text>
        <SimpleSelect value={newCity} options={Locations} w1={"280px"} onChange={(e) => setNewCity(e)}/>

        {/* <Input size='sm' value={newCity} placeholder='Enter' w='280px'
          onChange={(e) => setNewCity(e.target.value)}/> */}

        <ButtonGroup display='flex' justifyContent='flex-end' mt={2}>
          <Button size='sm' variant='solid' colorScheme='blue' px={5}
            isDisabled={name === newName && city === newCity}
            onClick={handleUpdate}>Update</Button>
          <Button size='sm' variant='outline' colorScheme='blue' px={5}
            onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      </MenuList>
    </Menu>
  );
}
