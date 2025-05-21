import { IconButton, Menu, MenuList, Text, MenuButton, SimpleGrid, Button, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { widgetStyles } from '../../../shared/appStyles';


interface Props {
  setTime: (time: string) => void;
}

export function TimeMenu({ setTime }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Menu size='sm' placement="bottom" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <MenuButton>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList p={2}>
        <Text fontWeight="bold" style={widgetStyles.text} mb={2}>Minutes</Text>
        <SimpleGrid columns={6} gap={1}>
          {Array.from({ length: 60 }, (_, i) => i).filter(m => m % 5 === 0).map((m) => (
            <Button key={m} size="sm" w='30px' opacity={0.7} variant="outline"
              onClick={() => {setTime(m + ' min'); onClose()}}>
              {m}
            </Button>
          ))}
        </SimpleGrid>
      </MenuList>
    </Menu>
  );
}
