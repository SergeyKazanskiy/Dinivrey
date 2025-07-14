import { JSX } from "react/jsx-runtime";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box} from "@chakra-ui/react";
import { sidebarStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { Group } from '../model';
import { ChartsView } from './ChartsView';


export function GroupsView() {
    const { groups, tests } = useStore();

    return (
        <Accordion allowMultiple w='100%' h='600px' overflow='scroll'>
            {groups.map((item: Group, inx) => (
                <AccordionItem key={inx} textAlign='left'>
                    <AccordionButton  bg="gray.200" _hover={sidebarStyles.linkHover}
                       color='gray.700' borderWidth={1} borderColor='gray.300'>

                        {item.name}
                    </AccordionButton>

                    <AccordionPanel px={4}>
                        {/* <Box h='200px' w='200px' bg='gray.200'> </Box> */}
                        <ChartsView tests={tests.filter(el => el.group_id === item.id)}/>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
