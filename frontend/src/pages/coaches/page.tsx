import { useEffect } from 'react';
import { VStack, HStack, Box, SimpleGrid, Image, IconButton } from "@chakra-ui/react";
import { useStore } from './store';
import { CampsView } from './views/CampsView';
import { ProfileView } from './views/ProfileView'
import { GroupsView } from './views/GroupsView'
import { EventsView } from './views/EventsView'
import { ScheduleView } from './views/ScheduleView'
import { AddIcon } from '@chakra-ui/icons';
import { objectToJson, getCurrentYear } from '../../shared/utils';


export const CoachesPage: React.FC = () => {
    const { coaches, isSchedule, camp_id } = useStore();
    const { loadCamps, addCoach } = useStore();

    useEffect(() => {
        loadCamps();
    }, [loadCamps]);

   // alert(objectToJson(coaches))

    return (
        <VStack >
            <CampsView/>

            <Box h='740px' w='1120px' overflow='scroll' gap={4}>
                    <Box h={(coaches.length + 3) * 180}> 
                        {coaches.map((item, inx) => (
                            <SimpleGrid pl={3} mt={1} display='flex' flexWrap='wrap'
                                justifyContent='flex-start' gap={4}>
                                <HStack align='top' justifyContent='space-between'>
                                    <ProfileView coach_id={item.id}/>
                                    <GroupsView coach_id={item.id}/>

                                    {isSchedule && <ScheduleView coach_id={item.id}/>}
                                    {!isSchedule && <EventsView coach_id={item.id}/>}                   
                                </HStack>
                            </SimpleGrid>
                        ))}
                        <IconButton mt='16px' ml='16px'
                            borderRadius={20} variant='outline' colorScheme='blue'
                            aria-label='Add' icon={<AddIcon/>}
                            onClick={() => addCoach(camp_id)}
                        />
                    </Box>
            </Box>
        </VStack>
    )
};

