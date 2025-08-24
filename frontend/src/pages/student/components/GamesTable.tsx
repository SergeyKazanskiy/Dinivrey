import { Box, Text, Flex } from "@chakra-ui/react";
import { useStore } from "../store";
import { TableView } from '../components/TableView';
import { SimpleTable } from '../../../components/SimpleTable';
import { ActionButton } from '../../../components/ActionButton';
import { getCurrentYear, getCurrentMonth } from '../../../shared/utils';
import { RepeatIcon } from "@chakra-ui/icons";


export const GamesTable: React.FC = () => {
  const { games, year, month, game_id, gameColumn, isTestGames } = useStore();
  const { togleTestGames, selectGameCell, openUpdateGame, deleteGame, addGame } = useStore();

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
      <Flex align="center" justify="center">
        <Text fontSize={18} color='blue.500' align='center'>
          {isTestGames ? "Games table for test achievements" : "Games table" }
        </Text>
        <RepeatIcon ml={4} color='blue.500' onClick={togleTestGames} />
      </Flex>  

      <Box h='200px' overflow='scroll' ml={4}>
        { !isTestGames ? <SimpleTable columns={gameColumns} data={games}/> :
          <>
            <TableView columns={gameColumns} data={games} selected={{id: game_id, column: gameColumn}}
              onClick={selectGameCell} onUpdate={openUpdateGame} onDelete={deleteGame}/>

            <ActionButton type="add"
              available={getCurrentYear() === year && getCurrentMonth() === month}
              onClick={addGame}/>
          </>
        }
      </Box>
    </Box>
  );
};