import React from "react";
import { Box, SimpleGrid, HStack, VStack, Text, } from "@chakra-ui/react";
import { Test, Game } from "../model";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { RadarChart } from '../../../components/RadarChart';
import { LineChart } from '../../../components/LineChart';
import { formatDateTime, objectToJson } from '../../../shared/utils';

export const ChartsView: React.FC = () => {
  const { tests, games } = useStore();

  let lastTestValues: number[] = [];

  if (tests.length > 0) {
    const lastTest = tests[tests.length - 1];
    lastTestValues = [lastTest.speed, lastTest.stamina,
      lastTest.climbing, lastTest.evasion, lastTest.hiding];
  }

  const testLabels: string[] = ["speed", "stamina", "climbing", "evasion", "hiding"];
  const testsDatasets = testLabels.map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    labels: tests.map(el => formatDateTime(el.timestamp).date),
    values: tests.map(el => Number(el[key as keyof Test])),
  }));

  const gameLabels: string[] = ["caught", "freeded", "is_survived"];
  const gamesDatasets = gameLabels.map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    labels: games.map(el => formatDateTime(el.timestamp).date),
    values: games.map(el => Number(el[key as keyof Game])),
  }));

  return (
    <HStack px={2}>
      <SimpleGrid columns={2} spacing={2} h='450px' w='450px' mt={4}>
        <Box mt='-30px'pl={4} h='190px'  >
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
      </Box>
    </HStack>
  );
};

//"Number of players caught"
//Number of players freed