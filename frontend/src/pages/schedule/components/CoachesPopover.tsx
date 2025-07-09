import { useState, useEffect } from "react";
import { PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverHeader } from "@chakra-ui/react";
import { Popover, Box, HStack, Text, useDisclosure, IconButton} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Camp, CoachShort } from '../model';
import { get_coaches } from '../http';

interface Props {
  camps: Camp[];
  camp_id: number
  onSelect: (campId: number, coach_id: number) => void;
}

export const CoachesPopover: React.FC<Props> = ({ camps, camp_id, onSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ campId, setCampId] = useState(camp_id);
  const [ coaches, setCoaches] = useState<CoachShort[]>([]);

  useEffect(()=> {
    loadCoaches(camp_id);
  }, [])

  function loadCoaches(campId: number) {
    setCampId(campId);

    get_coaches(campId, (coaches => {
      setCoaches(coaches);
    }))
  }

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='bottom-end'>
      <PopoverTrigger>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </PopoverTrigger>
      <PopoverContent w="fit-content">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader color='blue.500' fontSize={17} fontWeight={400}>Select other coach</PopoverHeader>

        <PopoverBody  w={260}>
          <HStack align='start' alignItems='baseline' spacing='16px'>
            {camps.map((item) => (
              <Text as={item.id === campId ? 'u' : 'abbr'} key={item.id} color='gray.600' fontSize={14}
                  cursor='pointer' mr={2} onClick={() => loadCoaches(item.id)}>

                  {item.name}
              </Text>
            ))}
          </HStack>

          <Box mt={4} bg='gray.100' p={2}>
            {coaches.map((item) => (
              <Text key={item.id} color='gray.700' fontSize={15} cursor='pointer' my={2} 
                  onClick={() => (onSelect(campId, item.id), onClose())}>

                  {item.first_name}  {item.last_name}
              </Text>
            ))}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
