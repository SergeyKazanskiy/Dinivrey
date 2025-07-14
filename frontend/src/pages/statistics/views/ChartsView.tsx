import React from "react";
import { Box, SimpleGrid, HStack, Text, VStack, } from "@chakra-ui/react";
import { GroupTest } from "../model";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { LineChart } from '../../../components/LineChart';
import { formatDateTime } from '../../../shared/utils'


interface Props {
  tests: GroupTest[];
}

export const ChartsView: React.FC<Props> = ({tests}) => {
  const testLabels: string[] = ["speed", "stamina", "climbing", "evasion", "hiding"];

  const testsDatasets = testLabels.map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    labels: tests.map(m => formatDateTime(m.timestamp).date),
    values: tests.map(m => Number(m[key as keyof GroupTest])),
  }));

  return (
    <Box>
        {testsDatasets.map((dataset, index) => (
          
          <Box key={index} bg="white" shadow="md" borderRadius="md" pb={1} px={1} m={1}>
            <Text style={widgetStyles.text} >{dataset.title}</Text>

            <LineChart labels={dataset.labels} values={dataset.values}/>
          </Box>
        ))}
    </Box>
  );
};

