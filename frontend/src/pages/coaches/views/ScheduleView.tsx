import { Container, HStack, VStack, Flex, Text, Button } from "@chakra-ui/react";
import { useStore } from '../store';
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { TableView } from '../components/TableView';
import { GroupsPopover } from '../components/GroupsPopover';


interface Props {
  coach_id: number;
}

export const ScheduleView: React.FC<Props> = ({ coach_id }) => {
  const { schedules } = useStore();

  const coachSchedule = schedules.filter(el => el.coach_id === coach_id);

  const columns = [
    {name: 'weekday', title: 'Date', width: '25%'},
    {name: 'groups', title: 'Groups', width: '75%'},
  ];

  return (
    <TableView columns={columns} data={coachSchedule} selected={{id: 0, column: 'weekday'}} onClick={()=>{}}>
    </TableView>
  )
};