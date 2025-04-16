import { IconButton, Menu, MenuList, MenuItem, MenuButton, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { widgetStyles } from '../../../shared/appStyles'
import { eventTypes } from '../../../shared/constants';


interface Props {
  type: string;
  setType: (type: string) => void;
}

export function TypesMenu({type, setType}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleClick = (item: string) => {
    setType(item);
    onClose();
  };

  return (
    <Menu size='sm' placement="bottom" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <MenuButton>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList>
        {eventTypes.map((item, inx) => (
            <MenuItem key={inx} borderLeft="1px solid gray"
              fontWeight="bold" style={widgetStyles.text}
              bg={item === type ? 'gray.200' : 'unset'}
              onClick={() => handleClick(item)}>
              {item}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}
