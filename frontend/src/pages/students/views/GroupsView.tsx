import { JSX } from "react/jsx-runtime";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Button, Box} from "@chakra-ui/react";
import { sidebarStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { Group } from '../model';
import { GroupPopover } from '../components/GroupPopover';


interface Props {
  children: JSX.Element[] | JSX.Element;
}

export function GroupsView({ children }: Props) {
    const { groups, group_id, groupInx } = useStore();
    const { selectGroup, createGroup, updateGroup, deleteGroup } = useStore();

    return (
        <Accordion allowToggle w='100%' defaultIndex={[groupInx]}>
            {groups.map((item: Group, inx) => (
                <AccordionItem key={inx} textAlign='left'>
                    <AccordionButton  bg="gray.200" _hover={sidebarStyles.linkHover}
                        borderWidth={1} borderColor='gray.300'
                        onClick={() => selectGroup(item.id, inx)}>

                        {item.name}
                        {item.id === group_id &&
                            <GroupPopover name={item.name} desc={item.description} 
                                onUpdate={updateGroup} onDelete={deleteGroup}/>}
                    </AccordionButton>

                    <AccordionPanel p={4}>
                        { children }
                    </AccordionPanel>
                </AccordionItem>
            ))}
            <Button h="20px" colorScheme='teal' variant='ghost' onClick={createGroup}>+</Button>
        </Accordion>
    );
};

/*
onClick={() => selectGroup(item.id, inx)}
 {item.id === group_id &&
                            <GroupPopover name={item.name} desc={item.desc} 
                                onUpdate={updateGroup} onDelete={deleteGroup}/>}
*/