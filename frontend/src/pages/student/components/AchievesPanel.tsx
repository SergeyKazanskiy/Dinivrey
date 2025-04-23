import { Text, Box, HStack, Container, Flex } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { AchieveIcon } from './AchieveIcon'
import { Achieve } from '../model'
import { AchievesPopover } from './AchievesPopover';
import { useStore } from "../store";


interface Props {
  title: string;
  category: string;
}

export const AchievesPanel: React.FC<Props> = ({ title, category }) => {
  const { studentAchieves, achieve_id, baseAchieves } = useStore();
  const { selectAchieve, loadBaseAchieves, attachAchieve } = useStore();

  return (
    <Container >
      <Text style={widgetStyles.text} fontWeight="medium">{title}</Text>
      <Box borderWidth={2} borderColor='gray.300' borderRadius={8} pl='2px' pt='6px' h='88px' w='100%'
        overflow='scroll' display='flex' flexWrap='wrap'>
       
        {studentAchieves.filter((item => item.category === category)).map((item, inx) => (
          <Box key={inx} bg={item.id === achieve_id ? 'gray.100' : 'unset'}>
            <AchieveIcon image={item.image} label={item.name} level={item.level}
              onClick={() => selectAchieve(item.id)}/>
          </Box>
        ))}
        
        <AchievesPopover baseAchieves={baseAchieves}
          onClick={() => loadBaseAchieves(category)} onSelect={attachAchieve}/>
      </Box>
    </Container>
  );
};
