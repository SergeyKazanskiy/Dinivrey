import { useEffect, useState } from 'react';
import { HStack, VStack, SimpleGrid, Image, Container, Box, Text } from "@chakra-ui/react";
import { screenStyles, widgetStyles } from '../../shared/appStyles';
import { useStore  } from './store';
import { CampsView } from './views/CampsView';

export const StatisticsPage: React.FC = () => {
    // const { studentId, camps, camp_id, group_id, groups } = useStudentsStore();
    const { loadCamps } = useStore();

    useEffect(() => {
        loadCamps();
    }, []);

    return (
        <SimpleGrid  h='800px' display='flex' flexWrap='wrap' justifyContent='flex-start' overflow='scroll' p={3}>
            <VStack w='780px' spacing={4}>
                <Container style={screenStyles.widget} h='40%'>
                    <Text style={widgetStyles.title}>Summary</Text>
                    <CampsView/>
                </Container>

                <Container style={screenStyles.widget} h='60%'>
                    <Text style={widgetStyles.title}>Liders</Text>
                    <Box bg='gray.200'></Box>
                </Container>
            </VStack>
            
            <Container style={screenStyles.widget} w='360px'>
                <Text style={widgetStyles.title}>Charts</Text>
                <Box bg='gray.200'></Box>
            </Container>
        </SimpleGrid>
    )
};
