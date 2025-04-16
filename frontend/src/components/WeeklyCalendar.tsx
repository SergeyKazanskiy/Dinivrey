import React, { useState } from 'react';
import { Flex, Button, Text, IconButton, useColorModeValue, VStack, HStack, Spacer, Box} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';


const daysOfWeek = [
  { short: 'Пн', full: 'Понедельник' },
  { short: 'Вт', full: 'Вторник' },
  { short: 'Ср', full: 'Среда' },
  { short: 'Чт', full: 'Четверг' },
  { short: 'Пт', full: 'Пятница' },
  { short: 'Сб', full: 'Суббота' },
  { short: 'Вс', full: 'Воскресенье' },
];

type Props = {
  clickDate: (date: Date) => void;
};

export function WeeklyCalendar({ clickDate }: Props) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedDay, setSelectedDay] = useState<number>(today.getDay() === 0 ? 6 : today.getDay() - 1); // Adjust for Sunday
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1));

  const handleWeekChange = (direction: 'previous' | 'next') => {
    const newDate = new Date(selectedDate);//currentDate
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));//currentDate

    setCurrentDate(newDate);
    //setSelectedDay(0); // Reset to Monday of the new week
    setSelectedDate(newDate);
  };

  const handleDaySelect = async (dayIndex: number) => {
    setSelectedDay(dayIndex);

    const selectedDate = new Date(startOfWeek);
    selectedDate.setDate(startOfWeek.getDate() + dayIndex);
    setSelectedDate(selectedDate);
    clickDate(selectedDate)
  };

  return (
    <VStack w="250px" h="60px" spacing='0px' borderColor='gray.600' borderWidth={0.2}>
      
      <HStack width="100%" justify="space-between">
        <IconButton aria-label="Previous week" icon={<ArrowLeftIcon boxSize={3} />} size="sm" variant="ghost"
          onClick={() => handleWeekChange('previous')} />
        <Text fontSize={15} >
          {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
        </Text>
        <IconButton aria-label="Next week" icon={<ArrowRightIcon boxSize={3} />} size="sm" variant="ghost"
          onClick={() => handleWeekChange('next')}
        />
      </HStack>

      <Flex justify="space-between" width="100%">
        {daysOfWeek.map((day, index) => {
          const dayDate = new Date(startOfWeek);
          dayDate.setDate(startOfWeek.getDate() + index);
          const isSelected = index === selectedDay;

          return (
            <Button key={day.short} size="xs" variant="ghost"
              bg={isSelected ? 'gray.600' : 'transparent'} color={isSelected ? 'blue.100' : 'blue.200'}
              onClick={() => handleDaySelect(index)}
              textDecoration={ dayDate.toDateString() === today.toDateString() ? 'underline' : undefined}
              _hover={{ bg: 'gray.500', color: 'white' }}
            >
              {day.short}
            </Button>
          );
        })}
      </Flex>
    </VStack>
  );
};

/*
fontWeight="bold" 
*/