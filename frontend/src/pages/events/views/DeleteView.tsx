import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { formatDateTime } from '../../../shared/utils';
import { useStore } from "../store";
import { widgetStyles } from "../../../shared/appStyles";


export function DeleteView() {
  const { events, event_id } = useStore();
  const { closeModal, deleteEvent } = useStore();

  const event = events.find((el) => el.id === event_id)!;

  return (
    <Box bg='white' p={4} pb={2} borderRadius='26px' >
      <Text pb={2} style={widgetStyles.title}>
        Delete event
      </Text>

      <Text pt={2} style={widgetStyles.alert} align='center'>
        Do you really want to delete the {event.type}?
      </Text>

      <Text pb={4} style={widgetStyles.text} align='center'>
        {formatDateTime(event.timestamp).date}, {formatDateTime(event.timestamp).time}
      </Text>

      <ButtonGroup size='sm' colorScheme='gray' display='flex' justifyContent='end' mt={1}>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={deleteEvent}>Delete</Button>
      </ButtonGroup>
    </Box>
  );
}
