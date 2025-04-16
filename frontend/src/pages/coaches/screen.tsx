import { HStack, VStack, SimpleGrid, Image, Tabs, TabPanels, TabPanel, TabList, Tab } from "@chakra-ui/react";
import { screenStyles } from '../../shared/appStyles'
import { ProfileView } from './views/ProfileView'
import { GroupsTable } from './views/GroupsTable'
import { EventsTable } from './views/EventsTable'
import { useStore } from '../students/store';


export const CoachesPage: React.FC = () => {
    const { camps } = useStore();
    const { selectCamp } = useStore();

    return (
        <Tabs variant='soft-rounded' style={screenStyles.tab} colorScheme='cyan'>
            <TabList pb={1} bg='gray.200'>
                {camps.map((item, inx) => (
                    <Tab key={inx} onClick={() => selectCamp(item.id)} >
                        {item.name}
                    </Tab>
                ))}
            </TabList>

            <TabPanels>
                {camps.map((tab, index) => (
                    <TabPanel p='-4px' key={index} w='1200px' h='760px'>
                        <VStack align='start' spacing='16px' mt={3}>
                            <SimpleGrid pl={3} mt={1} display='flex' flexWrap='wrap'
                                justifyContent='flex-start' gap={4}>
                                <HStack align='top' justifyContent='space-between'>
                                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' boxSize='100px' m={3}/>
                                    <ProfileView />
                                    <GroupsTable />
                                    <EventsTable />
                                </HStack>
                            </SimpleGrid>

                            <SimpleGrid pl={3} mt={1} display='flex' flexWrap='wrap' justifyContent='flex-start' gap={4}>
                                <HStack align='top' justifyContent='space-between'>
                                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' boxSize='100px' m={3} />
                                    <ProfileView />
                                    <GroupsTable />
                                    <EventsTable />
                                </HStack>
                            </SimpleGrid>
                        </VStack>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
};
