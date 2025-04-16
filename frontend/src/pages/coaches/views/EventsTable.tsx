import { Container, HStack, VStack, Flex, Text, Button, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';


export const EventsTable = () => {
  const { month, setMonth, events } = useStore();

  return (
    <Container style={screenStyles.widget} h='172px' w='310px' pr={2}>                 
        <Flex justify="space-between" align='baseline' mb="2">
            <Text style={widgetStyles.title} mr={8} >Events</Text>
            <IconButton aria-label="Previous" icon={<ChevronLeftIcon />} size="sm" color='gray.400'
                onClick={() => setMonth("January")}/>
            <Text fontSize={15} color="blue.500">{month}</Text>
            <IconButton aria-label="Next" icon={<ChevronRightIcon />} size="sm" color='gray.400'
                onClick={() => setMonth("March")}/>
                
        </Flex>
        <VStack align='start'>
            {events.map((event, index) => (
                <HStack key={index}>
                    <Text style={widgetStyles.text} w='200px'>{event.name}</Text>
                    <Text style={widgetStyles.score} w='80px'>{event.date}</Text>
                </HStack>
            ))}
            <Button size='sm' color="blue.500">+</Button>
        </VStack>      
    </Container>
  );
};
