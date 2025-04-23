import { Text, Box, Container } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { AchievementIcon } from './AchievementIcon'
import { useStore } from "../store";


interface Props {
  title: string;
}

export const AchievementsPanel: React.FC<Props> = ({ title }) => {
  const { studentAchieves, achievement_id } = useStore();
  const { selectAchievement } = useStore();

  return (
    <Container>
      <Text style={widgetStyles.text} fontWeight="medium">{title}</Text>
      <Box borderWidth={2} borderColor='gray.300' borderRadius={8} pl='2px' pt='6px' h='88px' w='100%'
        overflow='scroll' display='flex' flexWrap='wrap'>
       
        {studentAchieves.filter((item => item.in_profile === true)).map((item, inx) => (
          <Box key={inx} bg={item.id === achievement_id ? 'gray.100' : 'unset'}>
            <AchievementIcon image={item.image} label={item.name} level={item.level} effect={item.effect}
              onClick={() => selectAchievement(item.id)}/>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
