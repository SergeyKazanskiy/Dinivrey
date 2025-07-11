import { IconButton, Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons';


interface Props {
  onDelete: () => void;
}

export function DeleteMenu({ onDelete }: Props) {
  return (
    <Menu size='sm' placement="right">
      <MenuButton>
        <IconButton size='10px' aria-label='Edit' icon={<ChevronRightIcon />}/>
      </MenuButton>
      <MenuList fontSize={15} color='blue.500'>
        <MenuItem onClick={onDelete}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
