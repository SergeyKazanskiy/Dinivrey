import { useEffect, useState } from 'react';
import { HStack, VStack, SimpleGrid, Image, CloseButton, Spacer, Text } from "@chakra-ui/react";
import { ProfileView } from './views/ProfileView'
import { CampView } from './views/CampView'
import { ParentsView } from './views/ParentsView'
import { AddressView } from './views/AddressView'
import { AttendanceView } from './views/AttendanceView'
import { GroupsView } from './views/GroupsView'
import { EventsView } from './views/EventsView'
import { AchievesView } from './views/AchievesView'
import { useStore as useStudentsStore } from '../students/store';
import { useStore  } from './store';
import { BackAlert } from '../../components/BackAlert';
import { PhotoUploader } from '../../components/PhotoUploader';
import { ImagesPath } from '../../shared/constants';


export const StudentPage: React.FC = () => {
    const { studentId, camps, camp_id, group_id, groups, camp_name, group_name } = useStudentsStore();
    const { closeStudent, updateStudents } = useStudentsStore();
    const { photo, first_name, last_name } = useStore();
    const { isProfileChanged, isParentsChanged, isAddressChanged, isGroupsChanged } = useStore();
    const { loadStudent, updateStudent, setPhoto, uploadPhoto } = useStore();

    const camp = camps.find(el => el.id === camp_id)!;
    const group = groups.find(el => el.id === group_id)!;
    const breadcrumb: string = camp.name + ' / ' + group.name;
    const fileName = first_name + '_' + last_name + '_' + studentId
    const photoPath = photo === 'Student_boy.png' || photo === 'Student_girl.png' ?
        ImagesPath + '/photos/' + photo :
        ImagesPath + '/photos/' + camp_name + '/students/' + group_name + '/' + photo
                  
    useEffect(() => {
        loadStudent(studentId, camp_id);
    }, [loadStudent ]);

    const [isBackAlert, setIsBackAlert] = useState(false);

    function handleClose() {
        if (camp_id === 0 || group_id === 0 || first_name === '' || last_name === '') {
            alert('Not all required fields are filled in');
        } else if (isProfileChanged || isParentsChanged || isAddressChanged || isGroupsChanged) {
            setIsBackAlert(true);
        } else {
            closeStudent();
        }
    }

    return (
        <VStack >
            <BackAlert isOpen={isBackAlert} onCancel={() => setIsBackAlert(false)}
                onYes={() => updateStudent(student => {
                    updateStudents(student);
                    closeStudent();
                })}
                onNo={closeStudent}
            />
            <HStack w='100%' h='36px' bg='gray.200' borderWidth={1} borderColor='gray.300'>
                <Text pl={4} color='gray.500' fontWeight='medium'>{breadcrumb}</Text>
                <Spacer/>
                <CloseButton pr={2} size='md' color='gray.500' onClick={handleClose}/>
            </HStack>
            <SimpleGrid pl={3}  display='flex' flexWrap='wrap' justifyContent='flex-start' gap={4}>
                <VStack minW='452px' spacing={4} >
                    <HStack align='top' justifyContent='space-between'>
                        <VStack spacing={1}>

                            <PhotoUploader
                                photoSrc={`${photoPath}?t=${Date.now()}`}
                                onUpload={(file: File, ext) => uploadPhoto(studentId, file, fileName + '.' + ext)}
                                size={108}
                            />

                            <CampView/>
                        </VStack>
                        <ProfileView/>
                    </HStack>
                    <GroupsView/>
                </VStack>
                <VStack minW='636px' w='50%' spacing={4}>
                    <ParentsView/>
                    <AddressView/>
                    <AttendanceView/>
                </VStack>
            </SimpleGrid>
            <SimpleGrid  pl={3} mt={2} display='flex' flexWrap='wrap' gap={4}>
                <EventsView/>
                <AchievesView/>
            </SimpleGrid>
        </VStack>
    )
};

//<Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' boxSize='100px' m={3} />