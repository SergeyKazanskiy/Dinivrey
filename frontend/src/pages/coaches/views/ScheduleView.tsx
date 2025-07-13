import { Container } from "@chakra-ui/react";
import { useStore } from '../store';
import { screenStyles } from '../../../shared/appStyles'
import { SimpleTable } from '../components/SimpleTable';


interface Props {
  coach_id: number;
}

export const ScheduleView: React.FC<Props> = ({ coach_id }) => {
  const { schedules } = useStore();

  const coachSchedule = schedules.filter(el => el.coach_id === coach_id);

  const columns = [
    {name: 'weekday', title: 'Date', width: '40%'},
    {name: 'time', title: 'Time', width: '25%'},
    {name: 'group', title: 'Group', width: '35%'},
  ];

  return (
    <Container style={screenStyles.widget} h='174px' w='360px'>
      <SimpleTable columns={columns} data={coachSchedule}/>
    </Container>
  )
};