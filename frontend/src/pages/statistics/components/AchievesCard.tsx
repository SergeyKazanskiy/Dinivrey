import { useEffect, useState } from 'react';
import { Box, VStack } from "@chakra-ui/react";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { AchievesPanel } from './AchievesPanel';
import { get_camp_achieves } from '../http';
import { Achieve } from '../model';


interface Props {
  camp_id: number;
  achieve_id: number;
  onAchieve: (achieve_id: number) => void;
}

export function AchievesCard({ camp_id, achieve_id, onAchieve }: Props) {
  const [achieves, setAchieves] = useState<Achieve[]>([])

  useEffect(() => {
      get_camp_achieves(camp_id, (achieves => {
        setAchieves(achieves);
      }));
  }, []);

  return (
    <Box style={screenStyles.widget} h='400px' w='360px' borderWidth={1} borderColor='gray.300' >          
      <VStack spacing='8px' pt='2px' >

        <AchievesPanel
          title="Test achievements"
          achieve_id={achieve_id}
          categoryAchieves={achieves.filter(el => el.category === 'Test')}
          selectAchieve={onAchieve}
        />
        <AchievesPanel
          title="Game achievements"
          achieve_id={achieve_id}
          categoryAchieves={achieves.filter(el => el.category === 'Game')}
          selectAchieve={onAchieve}
        />
        <AchievesPanel
          title="Participate achievements"
          achieve_id={achieve_id}
          categoryAchieves={achieves.filter(el => el.category === 'Participate')}
          selectAchieve={onAchieve}
        />
      </VStack>
    </Box>
  );
}
