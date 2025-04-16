import React, {forwardRef, useState, useRef, useEffect} from 'react';
import { FormControl, Input, ButtonGroup, Button, VStack, Image, HStack, Text } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody} from '@chakra-ui/react';
import { PopoverFooter, PopoverArrow, PopoverCloseButton, IconButton, NumberInput } from '@chakra-ui/react';
import { NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Student } from '../model'
import { Genders, StudentsIcons } from '../../../shared/constants';


interface IProps {
  id: string;
  label: string;
  value: string | undefined;
  placeholder: string;
  onChange: (e: any) => void
}
/*<FormLabel fontSize='sm' htmlFor={props.id}>{props.label}</FormLabel>*/
const TextInput = forwardRef((props: IProps, ref: React.Ref<HTMLInputElement> ) => {
  return (
    <FormControl>
      
      <Input ref={ref} {...props} />
    </FormControl>
  )
})

interface IPopover {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSave: (student: Partial<Student>) => void;
}

export function StudentPopover({isOpen, onOpen, onClose, onSave}: IPopover) {
  const firstFieldRef = useRef(null);
  const [isButtonsDisabled, setButtonsDisabled] = useState<boolean>(true);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<string>(Genders[0]);
  const [age, setAge] = useState<number>(10);

  useEffect(() => {
    setButtonsDisabled(firstName.length<2 || lastName.length<2 || age<3)
  }, [firstName, lastName, age]);

  function handleSave () {
    const student: Partial<Student> = { first_name: firstName, last_name: lastName, gender, age};
    onSave(student);
    clearState ()
    onClose();
  }

  function clearState () {
    setFirstName('');
    setLastName('');
    setGender(Genders[0]);
    setAge(10);
  }

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='auto-start'>
      <PopoverTrigger>
        <IconButton mt='40px' ml='16px' borderRadius={20} variant='outline' colorScheme='blue'
          aria-label='Add' icon={<AddIcon/>} />
      </PopoverTrigger>
      <PopoverContent w='336px' >
        <PopoverArrow bg='blue.200'  />
        <PopoverHeader bg='blue.200' color='red.500'>Create new student!</PopoverHeader>
        <PopoverCloseButton />

        <PopoverBody display='flex' justifyContent='flex-start'>
          <VStack w='140px'>
            <Image boxSize='92px' objectFit='cover' alt='Gender' p={1}
              src={`/images/${StudentsIcons[gender as keyof typeof StudentsIcons]}`}
            />
            <ButtonGroup size='sm' colorScheme='gray' display='flex' justifyContent='center'>
              <Button variant={ gender === Genders[0] ? 'outline' : 'solid' }
                  onClick={() => setGender(Genders[1])}>{Genders[1]}</Button>
              <Button variant={ gender === Genders[1] ? 'outline' : 'solid' }
                onClick={() => setGender(Genders[0])}>{Genders[0]}</Button>
            </ButtonGroup>
          </VStack>
          <VStack pl={2} spacing='8px'>
            <TextInput id='first-name' label='' placeholder='First name' ref={firstFieldRef}
              value={firstName} onChange={(e) => setFirstName(String(e.target.value))}   
            />
            <TextInput id='last-name' label='' placeholder='Last name'
              value={lastName} onChange={(e) => setLastName(String(e.target.value))}   
            />
            <HStack align='baseline'>
              <Text fontSize={15} fontWeight='lighter' ml={6} mr={1} pt={2}>Age:</Text>
              <NumberInput value={age} onChange={(value) => setAge(Number(value))} min={3} max={70}>
                <NumberInputField />
                <NumberInputStepper><NumberIncrementStepper/><NumberDecrementStepper/></NumberInputStepper>
              </NumberInput>
            </HStack>
          </VStack>
        </PopoverBody>

        <PopoverFooter display='flex' justifyContent='flex-end'>
            <Button size='sm' isDisabled={isButtonsDisabled} variant='outline' colorScheme='blue' mr={2}
              onClick={() => (onClose(), clearState())}>Cancel</Button>
            <Button size='sm' isDisabled={isButtonsDisabled} variant='solid' colorScheme='blue' px={5}
              onClick={handleSave}>Save</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
