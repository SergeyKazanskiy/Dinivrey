import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { formatDateTime } from '../../../shared/utils';
import { MenuCell } from '../components/MenuCell'
import { useStore } from "../store";
import { DateMenu } from '../components/DateMenu';
import { TimeMenu } from '../components/TimeMenu';
import { TypesMenu } from '../components/TypesMenu';
import { DescMenu } from '../components/DescMenu';
import { GroupsMenu } from '../components/GroupsMenu';
import { widgetStyles } from "../../../shared/appStyles";


interface Props {
  isNew?: boolean;
}

export function EventView({isNew}: Props) {
  const { timestamp, type, desc, group1_id, group2_id, groups } = useStore();
  const { setTimestamp, setType, setDesc, setGroup1, setGroup2, closeModal, addEvent, updateEvent} = useStore();

  function getGroupName(groupId: number) {
    const group = groups.find(group => group.id === groupId)
    return group?.name || ''
  }

  function handleSave() {
    if (isNew) {
      addEvent();
    } else {
      updateEvent();
    }
  }

  return (
    <Box bg='white' p={4} pb={2} borderRadius='26px' >
      <Text pb={2} style={widgetStyles.title}>Add new event</Text>

      <MenuCell title='Date' value={formatDateTime(timestamp).date}>
        <DateMenu timestamp={timestamp} setDate={setTimestamp}/></MenuCell>
      <MenuCell title='Time' value={formatDateTime(timestamp).time}>
        <TimeMenu timestamp={timestamp} setTime={setTimestamp}/></MenuCell>

      <MenuCell title='Type' value={type}><TypesMenu type={type} setType={setType}/></MenuCell>
      <MenuCell title='Desc' value={desc}><DescMenu desc={desc} setDesc={setDesc}/></MenuCell>

      <MenuCell title='Group' value={getGroupName(group1_id)}>
        <GroupsMenu groupId={group1_id} groups={groups} setGroup={setGroup1}/></MenuCell>
      <MenuCell title='Extra' value={getGroupName(group2_id)}>
        <GroupsMenu groupId={group1_id} groups={groups} setGroup={setGroup2}/></MenuCell>

      <ButtonGroup size='sm' colorScheme='gray' display='flex' justifyContent='end' mt={1}>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleSave}>{ isNew ? 'Add' : 'Update' }</Button>
      </ButtonGroup>
    </Box>
  );
}
