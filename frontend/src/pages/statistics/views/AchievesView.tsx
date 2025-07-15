import { Box, HStack, Text, } from "@chakra-ui/react";
import { useStore } from "../store";
import { AchievesCard } from '../components/AchievesCard';
import { objectToJson } from "../../../shared/utils";


export const AchievesView: React.FC = () => {
  const { camps, camp_id2, achieve_id } = useStore();
  const { selectAchieve } = useStore();
 
  return (
    <HStack justifyContent='space-between' w='100%'>
      {camps.map((item) => (
        <Box>
          <HStack spacing={2} pl={4}>
            <Text color='#DB3939' fontSize={18} fontWeight={400}>{item.city},</Text>
            <Text color='#DB3939' fontSize={18} fontWeight={400}>{item.name}</Text>
          </HStack>  
         
            <AchievesCard
              camp_id={item.id}
              achieve_id={achieve_id}
              onAchieve={(achieve_id) => selectAchieve(item.id, achieve_id)}
              canSelect={item.id === camp_id2}
            />
        </Box>
       ))}
    </HStack>
  );
};

