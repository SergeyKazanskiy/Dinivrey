import { Box, SimpleGrid, useDisclosure, HStack } from "@chakra-ui/react";
import { IconButton, Menu, MenuList, Text, MenuButton, CloseButton } from "@chakra-ui/react";
import { AchieveIcon } from '../../../components/AchieveIcon'
import { Achieve } from '../model';
import { AddIcon } from '@chakra-ui/icons';


interface Props {
  baseAchieves: Achieve[];
  onSelect: (id: number) => void;
}

export function AchievesPopover({ baseAchieves, onSelect }: Props) {
  const { isOpen, onClose, onOpen} = useDisclosure();

  return (
    <Menu size='sm' isOpen={isOpen} onOpen={onOpen} placement="bottom">
      <MenuButton  onClick={(event) => { event.stopPropagation() }}>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Add' bg='unset' icon={<AddIcon />}/>
      </MenuButton>
      <MenuList p={2}>
        <HStack justifyContent='space-between'>
          <Text fontSize={16} color='blue.500' my='8px'>Name</Text>
          <CloseButton color='gray.600' onClick={(e) => (onClose(), e.stopPropagation())}/>
        </HStack>
        
        <SimpleGrid display='flex' flexWrap='wrap'>
          {baseAchieves.map((item, inx) => (
            <Box key={inx}
              onClick={() => onSelect(item.id)}> 
              <AchieveIcon
                image={item.image} 
                label={item.name}
                level={item.level}
                effect={item.effect}
              />
            </Box>
          ))}
        </SimpleGrid>
      </MenuList>
    </Menu>
  );
}
