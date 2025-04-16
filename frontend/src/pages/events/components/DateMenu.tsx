import { IconButton, Menu, MenuList, Button, MenuButton, SimpleGrid, Text, Box, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { daysOfWeek } from '../../../shared/constants';


interface Props {
  timestamp: number;
  setDate: (timestamp: number) => void;
}

export function DateMenu({ timestamp, setDate }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dateTime = new Date(timestamp);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day, dateTime.getHours(), dateTime.getMinutes());
    setDate(newDate.getTime());
    onClose();
  };

  return (
    <Menu size='sm' placement="bottom" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <MenuButton>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList p={1}>
        <SimpleGrid columns={7} spacing={1} my={2} ml={1}>
          {daysOfWeek.map((day) => (
            <Text key={day} fontSize={13} w='30px' textAlign="center" fontWeight="bold" color='teal.500'>
              {day}
            </Text>
          ))}
        </SimpleGrid>
        
        <SimpleGrid columns={7} spacing={1}>
          {Array.from({ length: adjustedFirstDay }).map((_, i) => (
            <Box key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <Button key={day} size="sm" w='20px' variant={ dateTime.getDate() === day ? "solid" : "outline"}
              colorScheme={ dateTime.getDate() === day ? "green" : "gray"} opacity={0.7}
              isDisabled={day <dateTime.getDate()}
              onClick={() => handleDateClick(day)}>
              {day}
            </Button>
          ))}
        </SimpleGrid>
      </MenuList>
    </Menu>
  );
}