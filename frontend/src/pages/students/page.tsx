import { useEffect } from 'react';
import { Box, ScaleFade, VStack } from "@chakra-ui/react";
import { CampsView } from './views/CampsView';
import { GroupsView } from './views/GroupsView';
import { StudentsView } from './views/StudentsView';
import { useStore } from './store';
import { StudentPage } from '../student/page';


export function StudentsPage() {
    const { isStudentOpen } = useStore();
    const { loadCamps  } = useStore();

    useEffect(() => {
        loadCamps();
    }, [loadCamps]);

    return (
        <>
            {isStudentOpen &&
            <ScaleFade initialScale={0.9} in={isStudentOpen}>
                <StudentPage />
            </ScaleFade>}

            {!isStudentOpen && 
                <VStack w='100%' spacing={0}>
                    <CampsView/>
                    <GroupsView>
                        <StudentsView />
                    </GroupsView>
                </VStack>
            }
        </>
    )
};

