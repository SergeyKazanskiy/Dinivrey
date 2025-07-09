import { useEffect } from 'react';
import { VStack, HStack, Box, Text } from "@chakra-ui/react";
import { screenStyles,  } from '../../shared/appStyles'
import { useStore } from './store';
import { CampsView } from './views/CampsView';
import { SchedulesView } from './views/SchedulesView';


export const SchedulePage: React.FC = () => {
    const { days } = useStore();
    const { loadCamps } = useStore();

    useEffect(() => {
        loadCamps();
    }, [loadCamps]);

    return (
        <VStack >
            <CampsView/>

            <Box h='740px' w='1120px' display='flex' flexDirection='column' flexWrap='wrap' pl={2} gap={4}>
                {days.length > 0 &&
                    <> 
                        {days.map(day => (
                            <Box style={screenStyles.widget} w='546px' h='230px'>
                                <Box bg='gray.200' borderWidth={1} borderColor='gray.300' py={2} pl={4} w='100%'>
                                    <Text key={day.day} color='gray.700' fontSize={16} fontWeight={400}>
                                        {day.weekday}
                                    </Text>
                                </Box>
                                
                                <SchedulesView key={day.day} day={day.day} weekday={day.weekday}/>
                            </Box>
                        ))}
                    </>
                }
            </Box>
        </VStack>
    )
};

