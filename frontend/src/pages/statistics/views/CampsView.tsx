import { useEffect, useState } from 'react';
import { Box, SimpleGrid, HStack, VStack, Text, } from "@chakra-ui/react";
import { Test, Game } from "../model";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { StatisticCard } from '../components/StatisticCard';
import { objectToJson } from "../../../shared/utils";


export const CampsView: React.FC = () => {
  const { camps, campId } = useStore();
  const { selectCamp, selectExam } = useStore();


  return (
    <HStack px={1} justifyContent='space-between'>
      {camps.map((item) => (

        <Box h='260px' w='224px' bg='gray.300' key={item.id} p={2} borderRadius={8}
          borderWidth={item.id === campId ? 2 : 0} borderColor='red.300'
          onClick={() => selectCamp(item.id)}>

          <Text color='gray.700' fontSize={16} cursor='pointer'>{item.city}</Text>
          <Text color='gray.700' fontSize={16} cursor='pointer'>{item.name}</Text>
         
          <StatisticCard camp_id={item.id} onExam={() => {}}/>
        </Box>
       ))}
    </HStack>
  );
};

//"Number of players caught"
//Number of players freed  {/* <RadarChart labels={testLabels} values={lastTestValues}/> */}