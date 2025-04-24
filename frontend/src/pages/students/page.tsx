import { useEffect } from 'react';
import { useDisclosure, ScaleFade, VStack, HStack, Text } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { widgetStyles } from '../../shared/appStyles'
import { CampsView } from './views/CampsView';
import { GroupsView } from './views/GroupsView';
import { StudentsView } from './views/StudentsView';
import { useStore } from './store';
import { StudentPage } from '../student/page';
import { LidersView } from './views/LidersView';

export function StudentsPage() {
    const { isOpen, onToggle } = useDisclosure();
    const { isStudentOpen, group_id } = useStore();
    const { loadCamps, loadLiders  } = useStore();

    useEffect(() => {
        loadCamps();
    }, [loadCamps]);

    useEffect(() => {
        if ( isOpen && group_id > 0) {
            loadLiders(group_id);
        }
    }, [isOpen, onToggle]);

    return (
        <>
            {!isStudentOpen && 
            <VStack w='100%' spacing={0}>
                <CampsView/>
                <GroupsView>
                    <HStack justifyContent='right' w='100%'>
                        <Text style={widgetStyles.title}>{ isOpen ? 'Liders' : 'Grid'}</Text> :
                        <RepeatIcon onClick={onToggle} />
                    </HStack>
                    {isOpen ? <LidersView /> : <StudentsView />}
                </GroupsView>
            </VStack>}

            {isStudentOpen &&
            <ScaleFade initialScale={0.9} in={isStudentOpen}>
                <StudentPage />
            </ScaleFade>}
        </>
    )
};

