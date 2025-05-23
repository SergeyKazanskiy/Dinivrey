import { useEffect } from 'react';
import { IconButton, Menu, MenuList, Text, MenuButton, CloseButton, Flex } from "@chakra-ui/react";
import { Input, Button, ButtonGroup, useDisclosure, HStack } from "@chakra-ui/react";
import { CalendarIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { useStore } from '../store';
import { weekDays } from '../../../shared/constants';
import { TimeMenu } from './TimeMenu';


export function SchedulePopover() {
  const { isOpen, onClose, onOpen} = useDisclosure();

  const { group_id, schedules, weekday, hour, minute } = useStore();
  const { loadSchedule, selectSchedule, createSchedule, deleteSchedule, setTime } = useStore();

  useEffect(() => {
    loadSchedule(group_id);
  }, [loadSchedule]);

  return (
    <Menu size='sm' isOpen={isOpen} onOpen={onOpen} placement="bottom">
      <MenuButton  onClick={(e) => { e.stopPropagation() }}>
        <IconButton mx={3} mb='2px' size='20px' aria-label='Edit' bg='unset' color='gray.600'
          icon={<CalendarIcon />}/>
      </MenuButton>
      <MenuList px={2} w='270px'>
        <HStack justifyContent='space-between'>
          <Text fontSize={16} color='blue.500' my='8px'>Schedule</Text>
          <CloseButton color='gray.600' onClick={(e) => (onClose(), e.stopPropagation())}/>
        </HStack>
        { weekDays.map((item, inx) => {
          const schedule = schedules.find(el => el.weekday === inx + 1)
          return (
            <Flex justifyContent='flex-start' gap={1} my='2px' bg={weekday === inx + 1 ? 'gray.200' : 'unset'}
              onClick={(e) => (selectSchedule(schedule?.id || 0, inx), e.stopPropagation())}>
              <Text w='100px' align='start'>{item}</Text>
              <Text w='80px'>{schedule ? schedule.hour + ' : ' + schedule.minute : ''}</Text>


              {weekday === inx + 1 && schedule && <TimeMenu hour={hour} minute={minute} setTime={setTime}/>}
              {weekday !== inx + 1 && <Text w='20px'></Text>}
              {weekday === inx + 1 && schedule && <IconButton mx={3} mb='2px' size='20px' aria-label='Del' bg='unset' color='gray.600'
                icon={<DeleteIcon onClick={deleteSchedule} />}/>}
              {weekday === inx + 1 && !schedule && <IconButton mx={3} mb='2px' size='20px' aria-label='Add' bg='unset' color='gray.600'
                icon={<AddIcon ml={8} onClick={createSchedule} />}/>}
            </Flex>
          )
        })}
      </MenuList>
    </Menu>
  );
}
