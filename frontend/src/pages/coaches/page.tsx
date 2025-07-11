import { useEffect } from 'react';
import { VStack, HStack, Box, SimpleGrid, Image } from "@chakra-ui/react";
import { useStore } from './store';
import { CampsView } from './views/CampsView';
import { ProfileView } from './views/ProfileView'
import { GroupsView } from './views/GroupsView'
import { EventsView } from './views/EventsView'
import { ScheduleView } from './views/ScheduleView'


export const CoachesPage: React.FC = () => {
    const { coaches, isSchedule } = useStore();
    const { loadCamps } = useStore();

    useEffect(() => {
        loadCamps();
    }, [loadCamps]);

    return (
        <VStack >
            <CampsView/>

            <Box h='740px' w='1120px' overflow='scroll' gap={4}>
                {coaches.length > 0 &&
                    <> 
                        {coaches.map((item, inx) => (
                            <SimpleGrid pl={3} mt={1} display='flex' flexWrap='wrap'
                                justifyContent='flex-start' gap={4}>
                                <HStack align='top' justifyContent='space-between'>
                                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' boxSize='100px' m={1}/>
                                    <ProfileView coach_id={item.id} coach_inx={inx}/>
                                    <GroupsView coach_id={item.id}/>

                                    {/* {isSchedule && <ScheduleView coach_id={item.id}/>}
                                    {!isSchedule && <EventsView coach_id={item.id}/>}                    */}
                                </HStack>
                            </SimpleGrid>
                        ))}
                    </>
                }
            </Box>
        </VStack>
    )
};

