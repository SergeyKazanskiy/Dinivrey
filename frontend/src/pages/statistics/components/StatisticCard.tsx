import { useEffect, useState } from 'react';
import { Text, HStack } from "@chakra-ui/react";
import { RadarChart } from './RadarChart';
import { StatsIndicators } from './StatsIndicators';
import { get_camp_last_statistics } from '../http';
import { CampTest } from '../model';


interface Props {
  camp_id: number;
  onExam: (exam: string) => void;
}

export function StatisticCard({ camp_id, onExam }: Props) {
  const [campTest, setCampTest] = useState<CampTest>({climbing: 0, stamina: 0, speed: 0, evasion: 0, hiding: 0})

  useEffect(() => {
      get_camp_last_statistics(camp_id, (test => {
        setCampTest(test);
      }));
  }, []);


  return (
    <HStack pl={2}>
      <RadarChart test={campTest} onExam={onExam}/>
      {/* <StatsIndicators stats={[campTest.climbing, campTest.stamina, campTest.speed, campTest.evasion, campTest.hiding]}/>   */}
    </HStack>
  );
}
