import { Container, HStack, VStack, Flex, Text, Button } from "@chakra-ui/react";
import { useStore } from '../store';
import { screenStyles, widgetStyles } from '../../../shared/appStyles'


export const GroupsTable = () => {
  const { groups } = useStore();
  return (
    <Container style={screenStyles.widget} h='172px' w='400px' pr={6}>                 
        <Flex justify="space-between" align='baseline' mb="3">
            <Text style={widgetStyles.title} >Groups</Text>
            <Text fontSize={15} color="blue.500" >Attendance</Text>
            <Text fontSize={15} color="blue.500">Tests</Text>
            <Text fontSize={15} color="blue.500">Games</Text>
        </Flex>
        <VStack align='start'>
            {groups.map((group, index) => (
                <HStack key={index}>
                    <Text style={widgetStyles.text} w='110px'>{group.name}</Text>
                    <Text style={widgetStyles.score} w='90px'>{group.attendance}</Text>
                    <Text style={widgetStyles.score} w='80px'>{group.tests}</Text>
                    <Text style={widgetStyles.score} w='80px'>{group.games}</Text>
                </HStack>
            ))}
            <Button size='sm' color="blue.500">+</Button>
        </VStack>      
    </Container>
  );
};