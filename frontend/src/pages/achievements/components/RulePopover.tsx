import { useState } from 'react';
import { ButtonGroup, Button, Flex, Input, Text } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody} from '@chakra-ui/react';
import { PopoverFooter, PopoverArrow, PopoverCloseButton, IconButton } from '@chakra-ui/react';
import { EditIcon, AddIcon } from '@chakra-ui/icons';
import { Rule } from '../model';
import { SimpleSelect } from '../../../components/SimpleSelect';
import { RuleTests, RuleConditions, RuleSelections, RuleSelection } from '../../../shared/constants'
import { AchieveCategories, RuleGames, eventTypes } from '../../../shared/constants'
import { ChevronDownIcon } from '@chakra-ui/icons';


interface IPopover {
  isNew: boolean;
  rule: Rule;
  isOpen: boolean;
  category: typeof AchieveCategories[number];
  onOpen: () => void;
  onClose: () => void;
  onSave: (rule: Rule) => void;
  onDelete: () => void;
}

export function RulePopover({isNew, rule, isOpen, category, onOpen, onClose, onSave, onDelete}: IPopover) {
  const [parameter, setParameter] = useState<string>(rule.parameter);
  const [condition, setCondition] = useState<string>(rule.condition);
  const [selection, setSelection] = useState<string>(rule.selection);
  const [value, setValue] = useState<number>(rule.value);
  const [isExplanation, setIsExplanation] = useState(false);

  const parameters = category === 'Test' ? RuleTests : category === 'Game' ? RuleGames : eventTypes;
  const explanation =
    selection === RuleSelection.Current ? 'Comparison with the current result' :
    selection === RuleSelection.Max ? 'Comparison with the maximum result obtained previously' :
    selection === RuleSelection.Sum ? 'Comparison with accumulated results obtained previously' :
    'Comparison with total number of visits';

  function handleDelete () {
    onDelete();
    onClose();
  }

  function handleSave () {
    const newRule: Rule = { parameter, condition, selection, type: rule.type,
      value, level: rule.level, achieve_id: rule.achieve_id};
    onSave(newRule);
    onClose();
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
        const numericValue = parseInt(inputValue, 10) || 0;
        setValue(numericValue);
    };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='bottom-end'>
      <PopoverTrigger>
        <IconButton size='20px' colorScheme='green' aria-label='Edit'
          icon={isNew ? <AddIcon /> : <EditIcon />}/>
      </PopoverTrigger>
      <PopoverContent w={ selection === RuleSelection.Max ? '380px' : selection === RuleSelection.Count ? '340px' : '300px' }>
        <PopoverArrow bg='blue.200'/>
        <PopoverHeader bg='blue.200' color='white'>
          {isNew ? 'Create new rule' : 'Update rule'}
        </PopoverHeader>
        <PopoverCloseButton />

        <PopoverBody >
            <ButtonGroup size='sm' colorScheme='gray' display='flex' justifyContent='start'>
              <ChevronDownIcon onClick={()=>setIsExplanation(!isExplanation)}/>

              {(category === 'Test' || category === 'Game') &&
                <Button variant={ selection === RuleSelection.Current ? 'solid' : 'outline' }
                  onClick={() => setSelection( RuleSelection.Current)}>Current</Button>}
              {category === 'Test' &&
                <Button variant={ selection === RuleSelection.Max ? 'solid' : 'outline' }
                  onClick={() => setSelection(RuleSelection.Max)}>Max</Button>}
              {category === 'Game' &&
                <Button variant={ selection === RuleSelection.Sum ? 'solid' : 'outline' }
                  onClick={() => setSelection(RuleSelection.Sum )}>Sum</Button>}
              {category === 'Participate' &&
                <Button variant={ selection === RuleSelection.Count ? 'solid' : 'outline' }
                  onClick={() => setSelection(RuleSelection.Count)}>Count</Button>}
            </ButtonGroup>
            
            {isExplanation &&<Text fontSize={14} color='red.500' align='center'>{explanation}</Text>}

            <Flex gap={3} my={4}>
              {selection === RuleSelection.Count &&
                <Text fontSize={15} fontWeight='500' color='blue.600' pt={1} pl='2px' pr={0}>Visit</Text>}

              {selection === RuleSelection.Sum &&
                <Text fontSize={15} fontWeight='500' color='blue.600' pt={1} pl='2px' pr={0}>Total</Text>}  

                <SimpleSelect value={parameter} options={parameters} w1='110px'
                    onChange={(value) => setParameter(String(value))}/>
                <SimpleSelect value={condition} options={RuleConditions} w1='70px'
                    onChange={(value) => setCondition(String(value))}/>

                {selection === RuleSelection.Max && <>
                  <SimpleSelect value={selection} options={RuleSelections} w1='90px'
                    onChange={(value) => setSelection(String(value))}/>
                  <Text>by</Text>
                </>}

                <Input size="sm" fontWeight="medium" w='52px' color='red.500'
                        value={value} type='number' borderColor='gray.200'
                        onChange={handleInputChange}/>
            </Flex>
        </PopoverBody>

        <PopoverFooter display='flex' justifyContent='flex-end'>
            {!isNew && <Button size='sm' variant='outline' colorScheme='blue' mr={2}
              onClick={handleDelete}>Delete</Button>}
            <Button size='sm' variant='solid' colorScheme='blue' px={5}
              onClick={handleSave}>Save</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
/*
if (type === "number") {
      const numericValue = parseInt(inputValue, 10) || 0;
*/
