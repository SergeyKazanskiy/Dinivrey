import { useEffect } from 'react';
import { HStack, VStack, SimpleGrid, Container, Text, Box } from "@chakra-ui/react";
import { screenStyles, widgetStyles } from '../../shared/appStyles';
import { useStore  } from './store';
import { CampsView } from './views/CampsView';
import { GroupsView } from './views/GroupsView';
import { DateFilter } from './components/DateFilter';
import { LidersView } from './views/LidersView';
import { ExamsFilter } from './components/ExamsFilter';
import { HeaderView } from './views/HeaderView';
import { AchievesView } from './views/AchievesView';
import { GroupsFilter } from './components/GroupsFilter';
import { HonoresView } from './views/HonoresView';

export const StatisticsPage: React.FC = () => {
    const { isStatictics } = useStore();
    const { loadCamps } = useStore();

    useEffect(() => {
        loadCamps();
    }, []);

    return (
        <VStack>
        <HeaderView/>

        {isStatictics &&
        <SimpleGrid  h='762px' display='flex' flexWrap='wrap' justifyContent='flex-start' overflow='scroll' py={3}>
            <VStack w='780px' spacing={4} >
                <Container style={screenStyles.widget} h='40%' >
                    <Text style={widgetStyles.title}>Summary</Text>
                    <CampsView/>
                </Container>

                <Container style={screenStyles.widget} h='60%'>
                    <HStack justifyContent='space-between' h='50px'>
                        <Text style={widgetStyles.title}>Top 10 students</Text>
                        <ExamsFilter/>
                    </HStack>
                    <LidersView/>
                </Container>
            </VStack>
            
            <Container style={screenStyles.widget} w='360px'>
                <HStack justifyContent='space-between' h='50px'>
                    <Text style={widgetStyles.title}>Charts</Text>
                    <DateFilter/>
                </HStack>
                <GroupsView/>
            </Container>
        </SimpleGrid>
        }
        {!isStatictics &&
            <VStack h='762px' w='1130px' spacing={4} mx={3} >
                <AchievesView/>

                <Box style={screenStyles.widget} h='40%' w='100%' px={3}>
                    <HStack justifyContent='space-between' >
                        <Text style={widgetStyles.title}>Students</Text>
                        <GroupsFilter/>
                    </HStack>

                    <HonoresView/>
                </Box>
            </VStack>
        }
        </VStack> 
    )
};
