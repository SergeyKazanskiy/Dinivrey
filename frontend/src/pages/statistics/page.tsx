import { useEffect, useState } from 'react';
import { HStack, VStack, SimpleGrid, Image, CloseButton, Spacer, Text } from "@chakra-ui/react";
import { useStore as useStudentsStore } from '../students/store';
import { useStore  } from './store';


export const StudentPage: React.FC = () => {
    const { studentId, camps, camp_id, group_id, groups } = useStudentsStore();
    const { closeStudent, updateStudents } = useStudentsStore();
    // const { photo, first_name, last_name } = useStore();
    // const { isProfileChanged, isParentsChanged, isAddressChanged, isGroupsChanged } = useStore();
    // const { loadStudent, updateStudent, setPhoto } = useStore();

    // const camp = camps.find(el => el.id === camp_id)!;
    // const group = groups.find(el => el.id === group_id)!;
    // const breadcrumb: string = camp.name + ' / ' + group.name;

    // useEffect(() => {
    //     loadStudent(studentId, camp_id);
    // }, [loadStudent ]);

    // const [isBackAlert, setIsBackAlert] = useState(false);

    // function handleClose() {
    //     if (camp_id === 0 || group_id === 0 || first_name === '' || last_name === '') {
    //         alert('Not all required fields are filled in');
    //     } else if (isProfileChanged || isParentsChanged || isAddressChanged || isGroupsChanged) {
    //         setIsBackAlert(true);
    //     } else {
    //         closeStudent();
    //     }
    // }

    return (
        <VStack >
            <HStack w='100%' h='36px' bg='gray.200' borderWidth={1} borderColor='gray.300'>
                
            </HStack>
            <SimpleGrid pl={3}  display='flex' flexWrap='wrap' justifyContent='flex-start' gap={4}>
                <VStack minW='452px' spacing={4} >
                    
                </VStack>
                <VStack minW='636px' w='50%' spacing={4}>

                </VStack>
            </SimpleGrid>
            <SimpleGrid  pl={3} mt={2} display='flex' flexWrap='wrap' gap={4}>

            </SimpleGrid>
        </VStack>
    )
};

//<Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' boxSize='100px' m={3} />