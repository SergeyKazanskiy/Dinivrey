import { Popover, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter } from "@chakra-ui/react";
import { PopoverCloseButton, PopoverTrigger, Text, IconButton, Button } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon, ChevronRightIcon } from "@chakra-ui/icons";


interface Props {
    deleteAction: () => void;
}

export function DeleteMenu({ deleteAction }: Props) {
    const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
    const { isOpen: isPopoverOpen, onOpen: onPopoverOpen, onClose: onPopoverClose } = useDisclosure();

    const handleMenuToggle = () => {
        if (isMenuOpen) {
            onMenuClose();
            onPopoverClose();
        } else {
            onMenuOpen();
        }
    };

    const handleClose = () => {
        onPopoverClose();
        onMenuClose();
    };

    const handleConfirm = () => {
        handleClose();
        deleteAction();
    };

    return (
        <Menu size='sm' isOpen={isMenuOpen} onClose={onMenuClose}>
            <Popover placement='bottom-start' isOpen={isPopoverOpen} onClose={handleClose}>
                
                <PopoverTrigger>
                    <MenuButton as={IconButton} size='sm' aria-label="Options" icon={<ChevronRightIcon />}
                        colorScheme='gray' opacity={0.7} variant="ghost" onClick={handleMenuToggle} h='26px' w='12px'/>
                </PopoverTrigger>
                <MenuList>
                    <MenuItem fontSize={15} icon={<DeleteIcon />}
                        onClick={() => onPopoverOpen()}>
                        Remove
                    </MenuItem>
                </MenuList>
                <PopoverContent w='252px'>
                    <PopoverCloseButton />
                    <PopoverHeader bg='red.700'>
                       "Confirmation"
                    </PopoverHeader>
                    <PopoverBody>
                        <Text align='center' my='7px' fontSize={15}>Действительно удалить?</Text>
                    </PopoverBody>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                        <Button size='sm' variant="ghost" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button size='sm' colorScheme="blue" variant="ghost"  ml={3} onClick={handleConfirm}>
                            Remove
                        </Button>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </Menu>
    );
};

