import { IconButton, Menu, MenuList, Text, MenuButton, SimpleGrid, Button, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { widgetStyles } from '../../../shared/appStyles';


interface Props {
  timestamp: number;
  setTime: (timestamp: number) => void;
}

export function TimeMenu({ timestamp, setTime }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const dateTime = new Date(timestamp);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const handleTimeChange = (h: number, m: number) => {
    const newDate = new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate(),
      h, m
    );
    setTime(newDate.getTime());
    onClose();
  };

  return (
    <Menu size='sm' placement="bottom" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <MenuButton>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList p={2}>
        <Text fontWeight="bold" style={widgetStyles.text} mb={2}>Hours</Text>
        <SimpleGrid columns={6} gap={1} mb={4}>
          {Array.from({ length: 12 }, (_, i) => i + 8).map((h) => (
            <Button key={h} size="sm" w='30px' opacity={0.7} variant={hours === h ? "solid" : "outline"}
              onClick={() => handleTimeChange(h, minutes)}>
              {h}
            </Button>
          ))}
        </SimpleGrid>

        <Text fontWeight="bold" style={widgetStyles.text} mb={2}>Minutes</Text>
        <SimpleGrid columns={6} gap={1}>
          {Array.from({ length: 60 }, (_, i) => i).filter(m => m % 5 === 0).map((m) => (
            <Button key={m} size="sm" w='30px' opacity={0.7} variant="outline"
              onClick={() => handleTimeChange(hours, m)}>
              {m}
            </Button>
          ))}
        </SimpleGrid>
      </MenuList>
    </Menu>
  );
}
