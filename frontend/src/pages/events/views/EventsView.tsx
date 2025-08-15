import {useEffect, useState} from 'react';
import { Box, Button, Text } from "@chakra-ui/react";
import { useStore } from "../store";
import { TableView } from '../../../components/TableView';
import { ActionButton } from '../../../components/ActionButton';
import { DateMenu } from '../components/DateMenu';
import { TimeMenu } from '../components/TimeMenu';
import { TypesMenu } from '../components/TypesMenu';
import { DescMenu } from '../components/DescMenu';
import { GroupsMenu } from '../components/GroupsMenu';
import { getCurrentYear, getCurrentMonth,  } from '../../../shared/utils';


export const EventsView: React.FC = () => {
  const { year, month, setTimestamp } = useStore();
  const [ past, setPast ] = useState(false);

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  useEffect(() => {
    setPast(year < getCurrentYear() || month < getCurrentMonth());
  }, [ year, month ]);
 
  const columns = [
    {name: 'date', title: 'Date', width: '13%'},
    {name: 'time', title: 'Time', width: '12%'},
    {name: 'type', title: 'Type', width: '12%'},
    {name: 'desc', title: 'Description', width: '32%'},
    {name: 'group1', title: 'Group', width: '14%'},
    {name: 'group2', title: 'Extra', width: '14%'},
  ];

  const { formatedEvents, column, event_id } = useStore();
  const { openAddModal, openUpdateModal, openDeleteModal, selectCell } = useStore();
  
  const { timestamp, type, desc, group1_id, group2_id, groups } = useStore();
  const { updateTimestamp, updateType, updateDesc, updateGroup1, updateGroup2 } = useStore();

 
  return (
    <Box h='730px' overflow='scroll'>
      <TableView columns={columns} data={formatedEvents} selected={{id: event_id, column}}
        onClick={selectCell} onUpdate={openUpdateModal} onDelete={openDeleteModal}>

        {column === 'date' && !past && <DateMenu timestamp={timestamp} setDate={updateTimestamp}/>}
        {column === 'time' && !past && <TimeMenu timestamp={timestamp} setTime={updateTimestamp}/>}

        {column === 'type' && !past && <TypesMenu type={type} setType={updateType}/>}
        {column === 'desc' && <DescMenu desc={desc} setDesc={updateDesc}/>}
        
        {column === 'group1' && !past && <GroupsMenu groupId={group1_id} groups={groups} setGroup={updateGroup1}/>}
        {column === 'group2' && !past && <GroupsMenu groupId={group2_id} groups={groups} setGroup={updateGroup2}/>}
      </TableView>

      <ActionButton type="add"
        available={!past}
        onClick={openAddModal}/> 
    </Box>
  )
};