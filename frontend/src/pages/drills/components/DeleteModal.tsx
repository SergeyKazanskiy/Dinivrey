import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useStore } from "../store";
import { widgetStyles } from "../../../shared/appStyles";


export function DeleteModal() {
  const { drills, drill_id } = useStore();
  const { closeModal, deleteDrill } = useStore();

  const drill = drills.find((el) => el.id === drill_id)!;

  return (
    <Box bg='white' p={4} pb={2} borderRadius='26px' >
      <Text pb={2} style={widgetStyles.title}>
        Delete drill
      </Text>

      <Text py={2} style={widgetStyles.alert} align='center'>
        Do you really want to delete the {drill.name}?
      </Text>

      <ButtonGroup size='sm' colorScheme='gray' display='flex' justifyContent='end' mt={1}>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={deleteDrill}>Delete</Button>
      </ButtonGroup>
    </Box>
  );
}
