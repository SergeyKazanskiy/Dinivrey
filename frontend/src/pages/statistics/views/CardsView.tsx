import React from "react";
import { Box, SimpleGrid, HStack, VStack, Text, } from "@chakra-ui/react";
import { Test, Game } from "../model";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { RadarChart } from '../../../components/RadarChart';
import { LineChart } from '../../../components/LineChart';


export const CardsView: React.FC = () => {
  const { tests, games } = useStore();

  const lastTest = tests[tests.length - 1];
  const lastTestValues: number[] = [lastTest.speed, lastTest.stamina,
    lastTest.climbing, lastTest.evasion, lastTest.hiding];

  const testLabels: string[] = ["speed", "stamina", "climbing", "evasion", "hiding"];
  const testsDatasets = testLabels.map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    labels: tests.map(m => m.date),
    values: tests.map(m => Number(m[key as keyof Test])),
  }));

  const gameLabels: string[] = ["caughted", "freeded"];
  const gamesDatasets = gameLabels.map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    labels: games.map(m => m.date),
    values: games.map(m => Number(m[key as keyof Game])),
  }));

  return (
    <HStack px={2}>
      <SimpleGrid columns={2} spacing={2} h='450px' w='450px' mt={4}>
        <Box mt='-20px'pl={4} h='180px' overflow='scroll' >
          <RadarChart labels={testLabels} values={lastTestValues}/>
        </Box>
        {testsDatasets.map((dataset, index) => (
          <Box key={index} bg="white" shadow="md" borderRadius="md" pb={1} px={1} m={1}>
            <Text style={widgetStyles.text} >{dataset.title}</Text>
            <LineChart labels={dataset.labels} values={dataset.values}/>
          </Box>
        ))}
      </SimpleGrid>

      <Box w='220px'>
        {gamesDatasets.map((dataset, index) => (
          <Box key={index} bg="white" shadow="md" borderRadius="md" pb={4} px={1} m={1} mb={3}>
            <Text style={widgetStyles.text} >{dataset.title}</Text>
            <LineChart labels={dataset.labels} values={dataset.values}/>
          </Box>
        ))}
        <Text style={widgetStyles.text} mt={4} >Description</Text>
         <Box h='100px' bg='gray.200'>

         </Box>
      </Box>
    </HStack>
  );
};

//"Number of players caught"
//Number of players freed