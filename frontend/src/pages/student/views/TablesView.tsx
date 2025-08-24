import { Box, Text } from "@chakra-ui/react";
import { screenStyles } from '../../../shared/appStyles'
import { TestsTable } from '../components/TestsTable';
import { GamesTable } from '../components/GamesTable';
import { useStore } from "../store";
import { ExamModal } from '../components/ExamModal';
import { DeleteModal } from '../components/DeleteModal';
import { GameModal } from '../components/GameModal';


export const TablesView: React.FC = () => {
  const { isTestModal, isTestDelete, isGameModal, gameColumn, gameValue } = useStore();
  const { closeTestModal, deleteTest, closeGameModal, updateGame } = useStore();

  return (
    <Box style={screenStyles.widget} h='450px' w='690px'>  
      {isTestModal && <ExamModal/>}

      {isTestDelete && <DeleteModal title='Clear test cells' isOpen={isTestDelete}
        onCancel={closeTestModal} onDelete={deleteTest}/>}

      <GameModal field={gameColumn} value={gameValue} isOpen={isGameModal} 
        onCancel={closeGameModal} onSave={updateGame}/>

      <TestsTable/>
      <GamesTable/>
    </Box>
  );
};

