import React from "react";
import { Box, SimpleGrid, HStack, VStack, Text, } from "@chakra-ui/react";
import { Test, Game } from "../model";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { RadarChart } from '../components/RadarChart';
import { StatsIndicators } from '../components/StatsIndicators';
import { LineChart } from '../../../components/LineChart';
import { objectToJson } from "../../../shared/utils";


export const CampsView: React.FC = () => {
  const { camps, last_test, games } = useStore();
  //alert(objectToJson(camps))
  return (
    <HStack px={2}>
      {camps.map((item) => (
        <Box h='260px' w='224px' bg='gray.300' key={item.id} p={2} >
          <Text color='gray.700' fontSize={16}>{item.city}</Text>
          <Text color='gray.700' fontSize={16}>{item.name}</Text>
         
        <HStack >
          <RadarChart test={last_test} onExam={(exam)=>{}}/>
          <StatsIndicators stats={[last_test.climbing, last_test.stamina, last_test.speed, last_test.evasion, last_test.hiding]}/>  
        </HStack>

        
        </Box>
       ))}
    </HStack>
  );
};

//"Number of players caught"
//Number of players freed  {/* <RadarChart labels={testLabels} values={lastTestValues}/> */}