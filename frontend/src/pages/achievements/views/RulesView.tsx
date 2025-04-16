import { Tabs, TabList, Tab, TabPanels, TabPanel, Text, Checkbox, Box, useDisclosure, Container, Spacer, HStack, Button} from "@chakra-ui/react";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { useStore } from "../store";
import { RulePopover } from '../components/RulePopover';
import { Rule } from '../model';
import { RuleCell } from '../components/RuleCell';


export const RulesView: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { levels, rules, ruleInx, level, hasRules, achieveId } = useStore();
    const {setLevel, selectRule, updateRule, createRule, deleteRule, setHasRules } = useStore();

    function getEmptyRule(achieveId: number, level: string) {
        return {
            level: level,
            parameter: 'Speed',
            condition: '>',
            value: 5,
            isPersonal: false,
            selection: 'max',
            achieve_id: achieveId
        }
    }

    return (
        <Container>
            <Text mt={1} float='left' style={widgetStyles.text} fontWeight="medium">Rules</Text>
            <Checkbox  size='sm'  mt={2}  ml={2}  isChecked={hasRules} colorScheme="green"  borderColor='blue.400'
                onChange={(e) => setHasRules(e.target.checked)}/>
            <Box borderWidth={2} borderColor='gray.300' borderRadius={8} w='100%'  h='340px'>
                {hasRules && <Tabs variant='soft-rounded' style={screenStyles.tab} colorScheme='blue'>
                    <TabList pb={1} bg='gray.200'>
                        {levels.map((item, inx) => (
                            <Tab key={inx} onClick={()=>setLevel(item, inx)}>{item}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {levels.map((tab, index) => (
                            <TabPanel key={index}>
                                {rules.filter(((rule: Rule) => rule.level === level)).map((rule, inx) => (
                                    <Box cursor='pointer' mb={2} onClick={() => selectRule(inx)}>
                                        <RuleCell rule={rule} isSelected={inx === ruleInx}
                                            updateRule={updateRule} deleteRule={deleteRule}/>
                                    </Box>
                                ))}

                                <RulePopover isNew={true} isOpen={isOpen} onOpen={onOpen} onClose={onClose}
                                    rule={getEmptyRule(achieveId, level)} onSave={createRule} onDelete={deleteRule}/>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>}
            </Box>
        </Container>
    );
  }
