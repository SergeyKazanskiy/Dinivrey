import { Text, Box, VStack, HStack, Spacer, Button, useDisclosure } from "@chakra-ui/react";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { AchievesPanel } from '../components/AchievesPanel'
import { AchievementsPanel } from '../components/AchievementsPanel'
import { DeletePopover } from '../../../components/DeletePopover';


export const AchievesView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { achieve_id, achievement_id, updateButtonTitle } = useStore();
  const { attachProfileAchieve, detachAchieve } = useStore();

  return (
    <Box style={screenStyles.widget} h='500px' w='400px'>
      <HStack px={4}>
        <Text style={widgetStyles.title} ml={4}>Achievements</Text>
        <Spacer/>
        <DeletePopover title='Delete' isDisabled={achieve_id === 0 && achievement_id === 0}
          isOpen={isOpen} onOpen={onOpen} onClose={onClose} onDelete={detachAchieve}/>
        <Button size='sm' colorScheme="blue" isDisabled={achieve_id === 0 && achievement_id === 0}
          onClick={attachProfileAchieve}>{updateButtonTitle}</Button>
      </HStack>               
       
      <VStack spacing='8px' pt='2px'>
        <AchievesPanel title="Test achievements" category='Test'/>
        <AchievesPanel title="Game achievements" category='Game'/>
        <AchievesPanel title="Participate achievements" category='Participate'/>
        <AchievementsPanel title="Profile achievements"/>
      </VStack>
    </Box>
  );
};
