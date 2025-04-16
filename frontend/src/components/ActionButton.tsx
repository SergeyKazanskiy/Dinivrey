import { IconButton, Button } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";


interface Props {
    type: "add" | "update" | "delete";
    available?: boolean;
    onClick: () => void;
}

export function ActionButton({ type, available = true, onClick }: Props) {
    return (
        <>
            {type === 'add' && <IconButton mx={2} size='sm' borderRadius={14} colorScheme='gray'
                isDisabled={!available}
                onClick={onClick} aria-label='Add' icon={<SmallAddIcon/>} />}
    
            {type === 'update' && <Button size='sm' variant='outline' colorScheme='blue' mx={2}
                onClick={onClick}>Update</Button>}

            {type === 'delete' && <Button size='sm' variant='solid' colorScheme='blue' mx={2}
                onClick={onClick}>Delete</Button>}
        </>
    );
};

