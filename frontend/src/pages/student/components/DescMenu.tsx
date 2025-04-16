import { useState } from 'react';
import { IconButton, Menu, MenuList, Text, MenuButton, Input, Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';


interface Props {
  desc: string;
  setDesc: (type: string) => void;
}

export function DescMenu({desc, setDesc}: Props) {
  const { isOpen, onClose, onOpen} = useDisclosure()
  const [value, setValue] = useState(desc)

  function handleClick() {
    setDesc(value);
    onClose()
  }

  return (
    <Menu size='sm' isOpen={isOpen} onOpen={onOpen} placement="bottom">
      <MenuButton>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList p={2}>
        <Text fontSize={16} color='blue.500' my='8px'>Description</Text>
        <Input size='sm' value={value} placeholder='Enter' w='280px'
          onChange={(e) => setValue(e.target.value)}/>

        <ButtonGroup display='flex' justifyContent='flex-end' mt={2}>
          <Button size='sm' variant='outline' colorScheme='blue' mr={2}
            onClick={onClose}>Cancel</Button>
          <Button size='sm' variant='solid' colorScheme='blue' px={5}
            onClick={handleClick}>Save</Button>
        </ButtonGroup>
      </MenuList>
    </Menu>
  );
}
