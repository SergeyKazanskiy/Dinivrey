import { Text, Box, SimpleGrid, Container, IconButton } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { AchieveIcon } from './AchieveIcon'
import { Achieve } from '../model'
import { AchievesPopover } from './AchievesPopover';


interface Props {
  title: string;
  achieves: Achieve[];
  category: string;
  onClick: (inx: number) => void;
  baseAchieves: Achieve[];
  onAdd: (id: number) => void;
}

export const AchievesPanel: React.FC<Props> =
  ({ title, achieves, category, onClick, baseAchieves, onAdd }) => {
  return (
    <Container>
      <Text style={widgetStyles.text} fontWeight="medium">{title}</Text>
      <Box borderWidth={2} borderColor='gray.300' borderRadius={8} p='8px' h='88px'>
        <SimpleGrid display='flex' flexWrap='wrap'>
          {achieves.filter(((item: Achieve) => item.category === category)).map((item, inx) => (

              <AchieveIcon image={item.image} label={item.name} level={item.level}
                onClick={() => onClick(item.id)}/>
          ))}
          
          <AchievesPopover baseAchieves={baseAchieves} onSelect={onAdd}/>
        </SimpleGrid>
      </Box>
    </Container>
  );
};
