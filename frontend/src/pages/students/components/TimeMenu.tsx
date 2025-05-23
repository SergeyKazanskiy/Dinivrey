import {useState} from 'react';
import { IconButton, Menu, MenuList, Text, MenuButton, SimpleGrid, Button, useDisclosure, HStack, CloseButton } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { widgetStyles } from '../../../shared/appStyles';


interface Props {
  hour: number;
  minute: number;
  setTime: (hour: number, minute: number) => void;
}

export function TimeMenu({ hour, minute, setTime }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure()

 // const [ hours, setHours] = useState(hour);
  //const [ minutes, setMinutes] = useState(minute);

  return (
    <Menu size='sm' placement="bottom" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <MenuButton onClick={(event) => { event.stopPropagation() }}>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList p={2}>
         <HStack justifyContent='space-between'>
          <Text fontWeight="bold" style={widgetStyles.text} mb={2}>Hours</Text>
          <CloseButton color='gray.600' onClick={(e) => (onClose(), e.stopPropagation())}/>
         </HStack>

        <SimpleGrid columns={6} gap={1} mb={4}>
          {Array.from({ length: 12 }, (_, i) => i + 8).map((h) => (
            <Button key={h} size="sm" w='30px' variant={hour === h ? "solid" : "outline"}
              onClick={(e) => (setTime(h, minute), e.stopPropagation())}>
              {h}
            </Button>
          ))}
        </SimpleGrid>

        <Text fontWeight="bold" style={widgetStyles.text} mb={2} align='left'>Minutes</Text>
        <SimpleGrid columns={6} gap={1}>
          {Array.from({ length: 60 }, (_, i) => i).filter(m => m % 5 === 0).map((m) => (
            <Button key={m} size="sm" w='30px' variant={minute === m ? "solid" : "outline"}
              onClick={(e) => (setTime(hour, m), e.stopPropagation())}>
              {m}
            </Button>
          ))}
        </SimpleGrid>

        {/* <Button size='sm' variant='solid' colorScheme='blue' px={5}
          isDisabled={hour === hours && minute === minutes}
          onClick={(e) => (setTime(hours, minutes), onClose(), e.stopPropagation())}>Save</Button> */}
      </MenuList>
    </Menu>
  );
}
