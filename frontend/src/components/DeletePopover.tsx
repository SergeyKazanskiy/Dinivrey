import { Button, Text } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody} from '@chakra-ui/react';
import { PopoverFooter, PopoverArrow, PopoverCloseButton, IconButton } from '@chakra-ui/react';


interface IPopover {
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: () => void;
}

export function DeletePopover({title, isOpen, onOpen, onClose, onDelete}: IPopover) {

  function handleCancel () {
    onClose();
  }
  
  function handleDelete () {
    onDelete();
    onClose();
  }

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='bottom-start'>
      <PopoverTrigger>
        <Button colorScheme='blue' size='sm' variant='outline'>Delete</Button>
      </PopoverTrigger>
      <PopoverContent w='300px' >
        <PopoverArrow bg='blue.200'  />
        <PopoverHeader bg='blue.200' color='white'>{title}</PopoverHeader>
        <PopoverCloseButton />

        <PopoverBody >
            <Text fontSize={18} color='red.400' align='center'>Do you really want to delete?</Text>
        </PopoverBody>

        <PopoverFooter display='flex' justifyContent='flex-end' gap={2}>
            <Button size='sm' variant='solid' colorScheme='gray'
              onClick={handleCancel}>Cancel</Button>
            <Button size='sm' variant='outline' colorScheme='gray'
              onClick={handleDelete}>Delete</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
