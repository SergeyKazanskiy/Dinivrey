import { Text, Box, HStack, Container, Flex } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { AchieveIcon } from './AchieveIcon'
import { Achieve } from '../model';

interface Props {
  title: string;
  categoryAchieves: Achieve[];
  achieve_id: number;
  selectAchieve: (achieve_id: number) => void;
  canSelect: boolean;
}

export const AchievesPanel: React.FC<Props> = (
  { title, categoryAchieves, achieve_id, selectAchieve, canSelect }) => {

  return (
    <Container>
      <Text style={widgetStyles.text} fontWeight="medium">{title}</Text>
      <Box borderWidth={2} borderColor='gray.300' borderRadius={8} pl='2px' h='102px' w='100%'
        overflow='scroll' display='flex' flexWrap='wrap' bg='gray.100'>
       
        {categoryAchieves.map((item, inx) => (
          <Box key={inx}  pt='6px' 
            bg={item.id === achieve_id && canSelect ? 'gray.300' : 'unset'} >

            <AchieveIcon image={item.image} label={item.name} level='Common' count={item.count}
              onClick={() => selectAchieve(item.id)}/>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
