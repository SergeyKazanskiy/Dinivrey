import { useState, useEffect } from "react";
import { PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverHeader } from "@chakra-ui/react";
import { Popover, Box, Text, useDisclosure, IconButton} from "@chakra-ui/react";
import { PlusSquareIcon } from '@chakra-ui/icons';
import { FreeGroup } from '../model';
import { get_free_groups } from '../http';


interface Props {
  camp_id: number;
  onSelect: (group_id: number) => void;
}

export const GroupsPopover: React.FC<Props> = ({ camp_id, onSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ groups, setGroups] = useState<FreeGroup[]>([]);

  useEffect(()=> {
    get_free_groups((groups => {
      setGroups(groups);
    }));
  }, [isOpen, onOpen])

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='bottom-start'>
      <PopoverTrigger>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' color='gray.500' icon={<PlusSquareIcon />}/>
      </PopoverTrigger>
      <PopoverContent w="fit-content">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader color='blue.500' fontSize={17} fontWeight={400}>Select group</PopoverHeader>

        <PopoverBody  w={260}>
          <Box mt={4} bg='gray.100' p={2}>
            {groups.map((item) => (
              <Text key={item.id} color='gray.700' fontSize={15} cursor='pointer' my={2} 
                  onClick={() => (onSelect(item.id), onClose())}>

                  {item.name}  {item.desc}
              </Text>
            ))}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
