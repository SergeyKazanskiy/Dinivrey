import { Box, Text } from "@chakra-ui/react";
import { screenStyles } from '../../../shared/appStyles'
import { TestsTable } from '../components/TestsTable';
import { GamesTable } from '../components/GamesTable';
import { useStore } from "../store";
import { TestModal } from '../components/TestModal';
import { GameModal } from '../components/GameModal';
import { DeleteModal } from '../components/DeleteModal';


export const TablesView: React.FC = () => {
  const { isTestModal, isGameModal, isTestDelete, isGameDelete } = useStore();
  const { closeTestModal, closeGameModal, deleteTest, deleteGame } = useStore();

  return (
    <Box style={screenStyles.widget} h='450px' w='650px'>  
      {isTestModal && <TestModal/>}
      {isGameModal && <GameModal/>}
      
      {isTestDelete && <DeleteModal title='Clear test cells' isOpen={isTestDelete}
        onCancel={closeTestModal} onDelete={deleteTest}/>} 
      {isGameDelete && <DeleteModal title='Clear game cells' isOpen={isGameDelete}
        onCancel={closeGameModal} onDelete={deleteGame}/>} 

        <TestsTable/>
        <GamesTable/>
    </Box>
  );
};

