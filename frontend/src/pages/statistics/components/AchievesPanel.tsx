import { Text, Box, HStack, Container, Flex } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { AchieveIcon } from './AchieveIcon'
import { Achieve } from '../model';

interface Props {
  title: string;
  categoryAchieves: Achieve[];
  achieve_id: number;
  selectAchieve: (achieve_id: number) => void;
}

export const AchievesPanel: React.FC<Props> = ({ title, categoryAchieves, achieve_id, selectAchieve }) => {
  return (
    <Container>
      <Text style={widgetStyles.text} fontWeight="medium">{title}</Text>
      <Box borderWidth={2} borderColor='gray.300' borderRadius={8} pl='2px' pt='6px' h='102px' w='100%'
        overflow='scroll' display='flex' flexWrap='wrap' bg='gray.100'>
       
        {categoryAchieves.map((item, inx) => (
          <Box key={inx} bg={item.id === achieve_id ? 'gray.100' : 'unset'}>
            <AchieveIcon image={item.image} label={item.name} level='Common' count={item.count}
              onClick={() => selectAchieve(item.id)}/>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
