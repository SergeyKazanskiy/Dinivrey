import { Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { RulePopover } from './RulePopover';
import { Rule } from '../model';
import { getMetric } from '../../../shared/utils';
import { AchieveCategories } from '../../../shared/constants'


interface Props {
    rule: Rule;
    isSelected: boolean;
    category: typeof AchieveCategories[number];
    updateRule: (rule: Rule) => void;
    deleteRule: () => void;
}

export const RuleCell: React.FC<Props> = ({ rule, isSelected, category, updateRule, deleteRule }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        <Flex gap={3}>
            {rule.type === 'Total' && 
              <Text fontSize={16}>Total</Text>
            }
            <Text fontSize={16} color='blue.500'>{rule.parameter}</Text>
            <Text fontSize={16} >{rule.condition}</Text>
            {rule.type === 'Personal' && 
              <Text fontSize={16} color='red.500'>{rule.selection}<Text fontSize={16}>by</Text></Text>
            }
            <Text fontSize={16} color='red.500'>{rule.value}</Text>
            <Text fontSize={16} color='blue.500'>points</Text>
            <Spacer/>

            {isSelected && (<RulePopover isNew={false} isOpen={isOpen} onOpen={onOpen} onClose={onClose}
                rule={rule} category={category} onSave={updateRule} onDelete={deleteRule}/>)}
        </Flex>
        {rule.type !== 'Total' && <Text style={widgetStyles.value}>And</Text>}
    </>
  );
};
