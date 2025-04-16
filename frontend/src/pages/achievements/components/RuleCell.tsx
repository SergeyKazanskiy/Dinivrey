import { Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { RulePopover } from './RulePopover';
import { Rule } from '../model';
import { getMetric } from '../../../shared/utils';


interface Props {
    rule: Rule;
    isSelected: boolean;
    updateRule: (rule: Rule) => void;
    deleteRule: () => void;
}

export const RuleCell: React.FC<Props> = ({ rule, isSelected, updateRule, deleteRule }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        <Flex gap={3}>
            <Text fontSize={16} color='blue.500'>{rule.parameter}</Text>
            <Text fontSize={16} >{rule.condition}</Text>
            {rule.isPersonal && <Text fontSize={16} color='red.500'>{rule.selection}</Text>}
            {rule.isPersonal && <Text fontSize={16}>by</Text>}
            <Text fontSize={16} color='red.500'>{rule.value}</Text>
            <Text fontSize={16} color='blue.500'>{getMetric(rule.parameter)}</Text>
            <Spacer/>

            {isSelected && (<RulePopover isNew={false} isOpen={isOpen} onOpen={onOpen} onClose={onClose}
                rule={rule} onSave={updateRule} onDelete={deleteRule}/>)}
        </Flex>
        <Text style={widgetStyles.value}>And</Text>
    </>
  );
};
