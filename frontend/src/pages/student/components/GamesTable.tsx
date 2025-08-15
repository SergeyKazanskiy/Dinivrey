import { Box, Text, Modal, ModalContent } from "@chakra-ui/react";
import { useStore } from "../store";
import { SimpleTable } from '../../../components/SimpleTable';
import { NumberPopover } from '../../../components/NumberPopover';
import { DescMenu } from './DescMenu';
import { ActionButton } from '../../../components/ActionButton';
import { getCurrentYear, getCurrentMonth } from '../../../shared/utils';


export const GamesTable: React.FC = () => {
  const { games, year, month } = useStore();
  const { } = useStore();

  const gameColumns = [
    {name: 'date', title: 'Date', width: '20%'},
    {name: 'caught', title: 'Caught', width: '16%'},
    {name: 'freeded', title: 'Freeded', width: '16%'},
    {name: 'is_survived', title: 'Curvived', width: '16%'},
    {name: 'team', title: 'Team', width: '16%'},
    {name: 'won', title: 'Won', width: '16%'},
  ];

  return (
    <Box> 
      <Text fontSize={18} color='blue.500' align='center'>Games table</Text>

      <Box h='200px' overflow='scroll' ml={4}> 
        <SimpleTable columns={gameColumns} data={games}/>
      </Box>
    </Box>
  );
};