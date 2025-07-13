import { useState, useEffect } from "react";
import { PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverHeader, Flex } from "@chakra-ui/react";
import { Popover, Box, Text, useDisclosure, IconButton} from "@chakra-ui/react";
import { PlusSquareIcon } from '@chakra-ui/icons';
import { FreeGroup } from '../model';
import { get_free_groups } from '../http';


interface Props {
  camp_id: number;
  onSelect: (group_id: number, name: string, desc: string) => void;
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

        <PopoverBody  w={340}>
          <Box mt={4} bg='gray.100' p={2}>
            {groups.map((item) => (
              <Flex key={item.id} >
                <Text color='red.700' fontSize={15} cursor='pointer' my={2} w='100px'
                  onClick={() => (onSelect(item.id, item.name, item.desc), onClose())}>
                  {item.name}
                </Text>
                <Text color='gray.700' fontSize={15} my={2}  w='240px'>
                  {item.desc}
                </Text>
              </Flex>
            ))}
            {groups.length === 0 && <Text align='center' color='gray.600' fontSize={15}>No free groups</Text>}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
