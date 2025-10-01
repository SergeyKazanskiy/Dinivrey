import { IconButton, Menu, MenuList, MenuItem, MenuButton, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { widgetStyles } from '../../../shared/appStyles'
import { DrillLevels } from '../../../shared/constants';


interface Props {
  level: string;
  setLevel: (type: string) => void;
}

export function LevelsMenu({level, setLevel}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const handleClick = (item: string) => {
    setLevel(item);
    onClose();
  };

  return (
    <Menu size='sm' placement="bottom" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <MenuButton onClick={(e) => { e.stopPropagation()}}>
        <IconButton ml='4px' mb='2px' size='20px' aria-label='Edit' icon={<ChevronDownIcon />}/>
      </MenuButton>
      <MenuList>
        {DrillLevels.map((item, inx) => (
            <MenuItem key={inx} borderLeft="1px solid gray"
              fontWeight="bold" style={widgetStyles.text}
              bg={item === level ? 'gray.200' : 'unset'}
              onClick={() => handleClick(item)}>
              {item}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}
