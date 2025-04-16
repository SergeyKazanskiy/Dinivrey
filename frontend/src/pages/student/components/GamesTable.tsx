import { Box, Text, Modal, ModalContent } from "@chakra-ui/react";
import { useStore } from "../store";
import { TableView } from '../../../components/TableView';
import { NumberPopover } from './NumberPopover';
import { DescMenu } from './DescMenu';
import { ActionButton } from '../../../components/ActionButton';
import { getCurrentYear, getCurrentMonth } from '../../../shared/utils';


export const GamesTable: React.FC = () => {
  const { games, game_id, gameColumn, gameValue, gameDesc, isGamePopover, isGameDesc, year, month } = useStore();
  const { selectGameCell, updateGameCell, updateGameDesc, openUpdateGame, openDeleteGame, addGame } = useStore();

  const gameColumns = [
    {name: 'date', title: 'Date', width: '20%'},
    {name: 'caughted', title: 'Caughted', width: '15%'},
    {name: 'freeded', title: 'Freeded', width: '15%'},
    {name: 'description', title: 'Description', width: '45%'},
  ];

  return (
    <Box> 
      <Text fontSize={18} color='blue.500' align='center'>Games table</Text>

      <Box h='200px' overflow='scroll'> 
        <TableView columns={gameColumns} data={games} selected={{id: game_id, column: gameColumn}}
          onClick={selectGameCell} onUpdate={openUpdateGame} onDelete={openDeleteGame}>

            {isGamePopover && <NumberPopover value={gameValue} onUpdate={updateGameCell}/>}
            {isGameDesc && <DescMenu desc={gameDesc} setDesc={updateGameDesc}/>}
        </TableView>

        <ActionButton type="add"
          available={getCurrentYear() === year && getCurrentMonth() === month}
          onClick={addGame}/>  
      </Box>
    </Box>
  );
};