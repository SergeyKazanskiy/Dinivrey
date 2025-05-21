import {useEffect, useState} from 'react';
import { Box, Button, Text } from "@chakra-ui/react";
import { useStore } from "../store";
import { TableView } from '../../../components/TableView';
import { ActionButton } from '../../../components/ActionButton';
import { NamePopover } from '../components/NamePopover';
import { TimeMenu } from '../components/TimeMenu';
import { LevelsMenu } from '../components/LevelsMenu';
import { objectToJson } from '../../../shared/utils';


export const DrillsView: React.FC = () => {
  const columns = [
    {name: 'name', title: 'Name', width: '60%'},
    {name: 'time', title: 'Time', width: '20%'},
    {name: 'level', title: 'Level', width: '20%'},
  ];

  const { drills, column, drill_id, name, time, level } = useStore();
  const { openAddModal, openDeleteModal, selectDrill, updateDrill } = useStore();
  
  return (
    <Box h='730px' overflow='scroll'>
      <TableView columns={columns} data={drills} selected={{id: drill_id, column}}
        onClick={selectDrill} onUpdate={() => {}} onDelete={openDeleteModal}>

        {column === 'name' && <NamePopover name={name} setName={updateDrill}/>}
        {column === 'time' && <TimeMenu setTime={updateDrill}/>}
        {column === 'level' && <LevelsMenu level={level} setLevel={updateDrill}/>}
      </TableView>

      <ActionButton type="add"
        available={true}
        onClick={openAddModal}/> 
    </Box>
  )
};