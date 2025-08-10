import { Container, HStack, VStack, Flex, Text, Button } from "@chakra-ui/react";
import { useStore } from '../store';
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { SimpleTable } from '../../../components/SimpleTable';
import { GroupsPopover } from '../components/GroupsPopover';


interface Props {
  coach_id: number;
}

export const EventsView: React.FC<Props> = ({ coach_id }) => {
  const { events, coachGroups } = useStore();

  function checkIsGroup(coach_id: number, group_id: number): boolean {
    const coachGroup = coachGroups.find(el => (el.coache_id === coach_id && el.group_id === group_id))
    
    return coachGroup ? true : false
  }

  const coachEvents = events.filter(el => (checkIsGroup(coach_id, el.group1_id) || checkIsGroup(coach_id, el.group2_id)));

  const columns = [
    {name: 'date', title: 'Date', width: '20%'},
    {name: 'time', title: 'Time', width: '20%'},
    {name: 'group1', title: 'Group 1', width: '30%'},
    {name: 'group2', title: 'Group 2', width: '30%'},
    //{name: 'desc', title: 'Description', width: '20%'},
  ];

  return (
    <Container style={screenStyles.widget} h='174px' w='360px'>
      <SimpleTable columns={columns} data={coachEvents}/>
    </Container>
  )
};