import { useEffect } from 'react';
import { VStack, SimpleGrid, Text, Button, HStack, Spacer } from "@chakra-ui/react";
import { useStore } from './store';
import { MetricsView } from './views/MetricsView';
import { CampsFilter } from './components/CampsFilter';


export const MetricsPage: React.FC = () => {
    const { metrics, camps } = useStore();
    const { loadMetrics, loadCamps, addInitialMetrics, deleteInitialMetrics } = useStore();

    useEffect(() => {
        loadMetrics();
        loadCamps();
    }, [loadMetrics, loadCamps]);

    return (
        <VStack align='start'  overflow='scroll'>
            <HStack w='100%' h='36px' bg='gray.200' borderWidth={1} borderColor='gray.300'>
                <Text ml={6} pt={1} fontSize={16} color='gray.600' fontWeight='400'>
                    Reference tables for converting test completion time into points
                </Text>
                <Spacer/>
                {/* <CampsFilter/> */}
                {/* <Button onClick={addInitialMetrics} isDisabled={true}>Create all</Button>
                <Button onClick={deleteInitialMetrics} isDisabled={true}>Delete all</Button> */}
            </HStack>
            <SimpleGrid h='740px' p={3}  columns={3} spacing={6} >
                
                <MetricsView //1
                    test='Speed Test - 60 meters Run'
                    location=''
                    example='(07:00, meaning 07 seconds, 00 milliseconds)'
                    metrics={metrics.filter(el => el.test === 'Speed' && el.camp_id === 0)}
                    note='This Test applied the same way everywhere'
                />
                <MetricsView //2
                    test='Stamina Test - 200-400 meters run'
                    location='Location - Pardes Hanna - Pardes Hanna Agricultural High School'
                    example='(01:20:00, meaning 01=minuets, 20=seconds)'
                    metrics={metrics.filter(el => el.test === 'Stamina' && el.camp_id === 1)}
                    note='This Test applied only to a specific location'
                />
                <MetricsView //3
                    test='Endurance Test - 200-400 meters run'
                    location='Location - Hadera - Beit Eliezer High School'
                    example='(01:20:00, meaning 01=minuets, 20=seconds)'
                    metrics={metrics.filter(el => el.test === 'Stamina' && el.camp_id === 2)} //Endurance
                    note='This Test applied only to a specific location'
                />
                <MetricsView //4
                    test='Parkour test/climbing skills - Speed Run'
                    location='Location - Hadera - Beit Eliezer High School'
                    example='(07:00, meaning 07 seconds, 00 milliseconds)'
                    metrics={metrics.filter(el => el.test === 'Climbing' && el.camp_id === 1)}
                    note='This Test applied only to a specific location'
                />
                <MetricsView //5
                    test='Parkour test/climbing skills - Speed Run'
                    location='Location - Pardes Hanna - Pardes Hanna Agricultural High School'
                    example='(07:00, meaning 07 seconds, 00 milliseconds)'
                    metrics={metrics.filter(el => el.test === 'Climbing' && el.camp_id === 2)}
                    note='This Test applied only to a specific location'
                />  
            </SimpleGrid>
        </VStack>
    )
};

