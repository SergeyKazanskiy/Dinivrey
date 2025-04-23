import { Box, SimpleGrid, useDisclosure, HStack } from "@chakra-ui/react";
import { IconButton, Menu, MenuList, Text, MenuButton, CloseButton } from "@chakra-ui/react";
import { AchieveImage } from '../../../components/AchieveImage'
import { Achieve } from '../model';
import { AddIcon } from '@chakra-ui/icons';


interface Props {
  baseAchieves: Achieve[];
  onClick: () => void;
  onSelect: (id: number) => void;
}

export function AchievesPopover({ baseAchieves, onClick, onSelect }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSelect(id: number) {
    onSelect(id);
    onClose();
  }

  return (
    <Menu size='sm' isOpen={isOpen} onOpen={onOpen} placement="bottom" >
      <MenuButton onClick={onClick} >
         <IconButton ml='8px' mb='4px' size='sm' borderRadius={16} variant='outline' colorScheme='blue'
                  aria-label='Add' icon={<AddIcon/>} />
      </MenuButton>
      <MenuList p={2} >
        <HStack justifyContent='space-between'>
          <Text fontSize={18} color='blue.500' my='8px'>Select achievement!</Text>
          <CloseButton color='gray.600' onClick={(e) => (onClose(), e.stopPropagation())}/>
        </HStack>
        
        <SimpleGrid display='flex' flexWrap='wrap' w='248px' h='168px' overflow='scroll' 
          borderWidth={1} borderColor='gray.200'>
          {baseAchieves.map((item, inx) => (
            <Box key={inx} onClick={() => handleSelect(item.id)}> 
              <AchieveImage uri={item.image} label={item.name}/>
            </Box>
          ))}
        </SimpleGrid>
      </MenuList>
    </Menu>
  );
}

//  onClick={(event) => { event.stopPropagation() }}