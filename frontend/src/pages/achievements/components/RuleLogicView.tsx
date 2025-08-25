import { useState } from 'react';
import { Text, Flex, Spacer, Checkbox, Box } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';


interface Props {
    isAnd: boolean;
    onAnd: (selected: boolean) => void;
}

export const RuleLogicView: React.FC<Props> = ({ isAnd, onAnd }) => {
  const [isExplanation, setIsExplanation] = useState(false);

  return (
    <Box p={1} borderWidth={1} borderBottomColor='gray.200'>
      <Flex gap={3}>
        <ChevronDownIcon onClick={()=>setIsExplanation(!isExplanation)}/>
        <Text fontSize={15} color='blue.500'>Select logic</Text>
        <Spacer/>

        <Text fontSize={15} color='blue.500'>AND</Text>
        <Checkbox size='sm' isChecked={isAnd} colorScheme="gray" pr={2}
            onChange={(e) => onAnd(e.target.checked)}/>

        <Text fontSize={15} color='blue.500'>OR</Text>    
        <Checkbox size='sm' isChecked={!isAnd} colorScheme="gray" pr={2}
            onChange={(e) => onAnd(!e.target.checked)}/>
      </Flex>

       {isExplanation &&<Text fontSize={14} color='red.500' align='center'>
        { isAnd ? 'All rules must be followed!' : 'At least one rule must be followed!'}
       </Text>}
    </Box>
  );
};
