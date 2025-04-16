import { IconButton, Menu, MenuList, MenuItem, MenuButton, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Group } from "../model";
import { widgetStyles } from '../../../shared/appStyles'


interface Props {
  groupId: number;
  groups: Group[];
  setGroup: (groupId: number) => void;
}

export function GroupsMenu({ groupId, groups, setGroup }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleClick = (groupId: number) => {
    setGroup(groupId);
    onClose();
  };

  return (
    <Menu size='sm' placement="bottom" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <MenuButton>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList>
        <MenuItem key={0} borderLeft="1px solid gray"
              fontWeight="bold" style={widgetStyles.text} fontStyle='italic'
              onClick={() => handleClick(0)}>
              Select
          </MenuItem>
        {groups.map((group) => (
            <MenuItem key={group.id} borderLeft="1px solid gray"
              fontWeight="bold" style={widgetStyles.text}
              bg={group.id === groupId ? 'gray.200' : 'unset'}
              onClick={() => handleClick(group.id)}>
              {group.name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}
