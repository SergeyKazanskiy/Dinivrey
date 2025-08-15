import { Box, Text } from "@chakra-ui/react";
import { screenStyles } from '../../../shared/appStyles'
import { TestsTable } from '../components/TestsTable';
import { GamesTable } from '../components/GamesTable';
import { useStore } from "../store";
import { ExamModal } from '../components/ExamModal';
import { DeleteModal } from '../components/DeleteModal';


export const TablesView: React.FC = () => {
  const { isTestModal, isTestDelete } = useStore();
  const { closeTestModal, deleteTest } = useStore();

  return (
    <Box style={screenStyles.widget} h='450px' w='690px'>  
      {isTestModal && <ExamModal/>}
      
      {isTestDelete && <DeleteModal title='Clear test cells' isOpen={isTestDelete}
        onCancel={closeTestModal} onDelete={deleteTest}/>}

        <TestsTable/>
        <GamesTable/>
    </Box>
  );
};

