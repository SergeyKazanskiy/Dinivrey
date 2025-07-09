import { useEffect } from 'react';
import { Box } from "@chakra-ui/react";
import { useStore } from "../store";
import { TableView } from '../components/TableView';
import { CoachesPopover } from '../components/CoachesPopover';


export function SchedulesView({ day, weekday }: {day: number, weekday: string}) {
  const { schedules, schedule_id, camps, camp_id } = useStore();
  const { selectSchedule, selectNewCoach } = useStore();

  const daySchedules = schedules.filter(el => el.weekday === day);

  useEffect(() => {
    //setTimestamp(Date.now());
  }, []);
 
  const columns = [
    {name: 'time', title: 'Time', width: '20%'},
    {name: 'group', title: 'Group', width: '25%'},
    {name: 'coach', title: 'Coach', width: '55%'},
  ];
 
  return (
    <TableView columns={columns} data={daySchedules} selected={{id: schedule_id, column: 'coach'}}
      onClick={selectSchedule}>
        <></>
      <CoachesPopover camps={camps} camp_id={camp_id} onSelect={selectNewCoach}/>
    </TableView>
  )
};