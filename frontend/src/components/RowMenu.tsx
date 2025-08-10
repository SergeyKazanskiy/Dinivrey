import { IconButton, Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons';


interface Props {
  onUpdate: () => void;
  onDelete: () => void;
}

export function RowMenu({ onUpdate, onDelete }: Props) {
  return (
    <Menu size='sm' placement="right">
      <MenuButton>
        <IconButton size='10px' aria-label='Edit' icon={<ChevronRightIcon />}/>
      </MenuButton>
      <MenuList fontSize={15} color='blue.500'>
        <MenuItem onClick={onUpdate}>Update</MenuItem>
        <MenuItem onClick={onDelete}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
