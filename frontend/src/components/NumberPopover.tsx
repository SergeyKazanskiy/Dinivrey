import React, { useRef, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, IconButton, useDisclosure } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";


interface Props {
  value: number;
  onUpdate: (value: number) => void;
}

export const NumberPopover: React.FC<Props> = ({ value, onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newValue, setNewValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpen = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation()
    onOpen();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    onUpdate(Number(newValue));
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement='left' closeOnBlur={false}>
      <PopoverTrigger>
        <IconButton ml='4px' mb='2px' size='20px' aria-label="Open number input" icon={<ChevronLeftIcon />} onClick={handleOpen}/>
      </PopoverTrigger>
      <PopoverContent w="64px">
          <NumberInput size='sm' w="64px" value={newValue}
            defaultValue={5} precision={1} step={0.1} min={0} max={10}
            onChange={(valStr, valNum) => setNewValue(valNum)}>
            <NumberInputField ref={inputRef} onBlur={handleBlur}/>
            <NumberInputStepper >
              <NumberIncrementStepper children='+' onClick={(e) => { e.stopPropagation()}}/>
              <NumberDecrementStepper children='-' onClick={(e) => { e.stopPropagation()}}/>
            </NumberInputStepper>
          </NumberInput>
      </PopoverContent>
    </Popover>  
  );
};
