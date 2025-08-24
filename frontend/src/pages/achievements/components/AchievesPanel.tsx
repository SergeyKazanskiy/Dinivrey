// src/components/ProfileCell.tsx
import { Text, Box, SimpleGrid, Container, IconButton } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
//import { AchieveIcon } from '../../../components/AchieveIcon'
import { AchieveImage } from '../../../components/AchieveImage'
import { AchieveShort } from '../model'
import { AddIcon } from '@chakra-ui/icons'


interface Props {
  title: string;
  achieves: AchieveShort[];
  category: string;
  achieveId: number;
  onClick: (id: number, category: string) => void;
  onAddClick: () => void;
}

export const AchievesPanel: React.FC<Props> = ({ title, achieves, category, achieveId, onClick, onAddClick }) => {
  return (
    <Box p={3} my={-4}>
      <Text style={widgetStyles.text} fontWeight="medium">{title}</Text>
      <Box borderWidth={2} borderColor='gray.300' borderRadius={8} pb='4px' h='160px' w='100%'>
        <SimpleGrid display='flex' flexWrap='wrap'>
          {achieves.filter(((item: AchieveShort) => item.category === category)).map((item, inx) => (
            <Box key={inx} bg={item.id === achieveId ? 'gray.100' : 'unset'}
              onClick={() => onClick(item.id, category)}>
              <AchieveImage
                uri={item.image} 
                label={item.name}/>
            </Box>
          ))}
          {achieveId === 0 && <IconButton my='20px' ml='10px' borderRadius={20} variant='outline' colorScheme='blue'
            aria-label='Add' icon={<AddIcon/>} onClick={onAddClick}
          />}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
