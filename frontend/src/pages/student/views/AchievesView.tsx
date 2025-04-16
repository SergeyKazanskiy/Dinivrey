import { Text, Box, VStack, HStack, Spacer, Button, useDisclosure } from "@chakra-ui/react";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { AchievesPanel } from '../components/AchievesPanel'
import { DeletePopover } from '../../../components/DeletePopover';


export const AchievesView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { studentAchieves, baseAchieves, canUpdate, canDelete } = useStore();
  const {selectAchieve, updateAchieves, detachAchieve, attachAchieve } = useStore();

  return (
    <Box style={screenStyles.widget} h='500px' w='400px'>
      <HStack px={4}>
        <Text style={widgetStyles.title} ml={4}>Achievements</Text>
        <Spacer/>
        <DeletePopover title='Delete'
          isOpen={isOpen} onOpen={onOpen} onClose={onClose} onDelete={detachAchieve}/>
        <Button size='sm' colorScheme="blue" isDisabled={!canUpdate}
          onClick={updateAchieves}>Update</Button>
      </HStack>               
       

      <VStack spacing='8px' pt='2px'>

        <AchievesPanel title="Test achievements" achieves={studentAchieves} category='Test'
          onClick={selectAchieve} baseAchieves={baseAchieves} onAdd={attachAchieve}/>
        <AchievesPanel title="Game achievements" achieves={studentAchieves} category='Game' 
          onClick={selectAchieve} baseAchieves={baseAchieves} onAdd={attachAchieve}/>
        <AchievesPanel title="Participate achievements" achieves={studentAchieves} category='Participate'
          onClick={selectAchieve} baseAchieves={baseAchieves} onAdd={attachAchieve}/>
        <AchievesPanel title="Additional rewards" achieves={studentAchieves} category='Additional'
          onClick={selectAchieve} baseAchieves={baseAchieves} onAdd={attachAchieve}/>
      </VStack>
    </Box>
  );
};
