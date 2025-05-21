import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { DrillLevels } from '../../../shared/constants';
import { MenuCell } from './MenuCell'
import { useStore } from "../store";
import { TimeMenu } from './TimeMenu';
import { LevelsMenu } from './LevelsMenu';
import { NamePopover } from './NamePopover';
import { widgetStyles } from "../../../shared/appStyles";


export function DrillModal() {
  const { name, time, level} = useStore();
  const { setName, setTime, setLevel, closeModal, addDrill} = useStore();
  const firstLevel: string = DrillLevels[0];
  
  return (
    <Box bg='white' p={4} pb={2} borderRadius='26px' >
      <Text pb={2} style={widgetStyles.title}>Add new drill</Text>

      <MenuCell title='Name' value={name}><NamePopover name={name} setName={setName}/></MenuCell>
      <MenuCell title='Time' value={time}><TimeMenu setTime={setTime}/></MenuCell>
      <MenuCell title='Level' value={level}><LevelsMenu level={firstLevel} setLevel={setLevel}/></MenuCell>
     
      <ButtonGroup size='sm' colorScheme='gray' display='flex' justifyContent='end' mt={1}>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={addDrill}>Add</Button>
      </ButtonGroup>
    </Box>
  );
}
