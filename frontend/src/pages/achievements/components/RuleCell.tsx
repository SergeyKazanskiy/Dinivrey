import { Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { RulePopover } from './RulePopover';
import { Rule } from '../model';
import { getMetric } from '../../../shared/utils';
import { AchieveCategories, RuleSelection } from '../../../shared/constants'


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
            {rule.selection === RuleSelection.Count && 
              <Text fontSize={16} color='blue.500'>Attended</Text>
            }
            {rule.selection === RuleSelection.Sum && 
              <Text fontSize={16} color='blue.500'>Total</Text>
            }

            <Text fontSize={16} color='red.500'>{rule.parameter}</Text>

            <Text fontSize={16} >{rule.condition}</Text>
            {rule.selection === RuleSelection.Max &&
              <>
                <Text fontSize={16} color='red.500'>{rule.selection}</Text>
                <Text fontSize={16} color='blue.500'>by</Text>
              </>
            }

            <Text fontSize={16} color='red.500'>{rule.value}</Text>
            <Text fontSize={16} color='blue.500'>
              {rule.selection === RuleSelection.Count ? "times" :
                rule.selection === RuleSelection.Sum ? "players" :
                "points"}
            </Text>
            <Spacer/>

            {isSelected && (<RulePopover isNew={false} isOpen={isOpen} onOpen={onOpen} onClose={onClose}
                rule={rule} category={category} onSave={updateRule} onDelete={deleteRule}/>)}
        </Flex>
    </>
  );
};
