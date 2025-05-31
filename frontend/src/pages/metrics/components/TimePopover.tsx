import React, { useState } from "react";
import { PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverFooter, PopoverCloseButton } from "@chakra-ui/react";
import { Popover, Button, NumberInput, NumberInputField, HStack, VStack, useDisclosure} from "@chakra-ui/react";


interface Props {
  seconds: number;
  onChange: (seconds: number) => void;
}

export const TimePopover: React.FC<Props> = ({ seconds, onChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toMin = Math.floor(seconds / 60);
  const toSec = seconds % 60;

  const [minutes, setMinutes] = useState(toMin.toString());
  const [secs, setSecs] = useState(toSec.toString());

  const pad2 = (val: string | number): string =>
    val.toString().padStart(2, "0");

  const handleBlur = (val: string, setter: (v: string) => void) => {
    let num = parseInt(val, 10);
    if (isNaN(num) || num < 0) num = 0;
    if (num > 59) num = 59;
    setter(pad2(num));
  };

  const handleSave = () => {
    const min = parseInt(minutes, 10) || 0;
    const sec = parseInt(secs, 10) || 0;
    onChange(min * 60 + sec);
    onClose();
  };

  const handleCancel = () => {
    setMinutes(toMin.toString());
    setSecs(toSec.toString());
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} >
      <PopoverTrigger>
        <Button size='sm' h='28px'  w='64px' bg='white' >{`${pad2(toMin)}:${pad2(toSec)}`}</Button>
      </PopoverTrigger>
      <PopoverContent w="fit-content">
        <PopoverArrow />

        <PopoverBody>
          <VStack spacing={4}>
            <HStack spacing={2}>
              <NumberInput size='sm'
                value={minutes}
                onChange={(v) => setMinutes(v)}
                onBlur={() => handleBlur(minutes, setMinutes)}
                min={0}
                max={59}
                maxW="70px"
              >
                <NumberInputField placeholder="00" />
              </NumberInput>

              <NumberInput size='sm'
                value={secs}
                onChange={(v) => setSecs(v)}
                onBlur={() => handleBlur(secs, setSecs)}
                min={0}
                max={59}
                maxW="70px"
              >
                <NumberInputField placeholder="00" />
              </NumberInput>
            </HStack>
          </VStack>
        </PopoverBody>

        <PopoverFooter display="flex" justifyContent="flex-end" gap={2}>
          <Button size='sm' variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size='sm' colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};