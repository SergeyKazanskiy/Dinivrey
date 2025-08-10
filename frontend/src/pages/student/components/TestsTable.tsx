import { Box, Text, Modal, ModalContent } from "@chakra-ui/react";
import { useStore } from "../store";
import { TableView } from '../components/TableView';
import { ActionButton } from '../../../components/ActionButton';
import { getCurrentYear, getCurrentMonth } from '../../../shared/utils';


export const TestsTable: React.FC = () => {
  const { tests, test_id, testColumn, year, month } = useStore();
  const { selectTestCell, openUpdateTest, openDeleteTest, addTest } = useStore();

  const testColumns = [
    {name: 'date', title: 'Date', width: '16%'},
    {name: 'speed', title: 'Speed', width: '18%'},
    {name: 'stamina', title: 'Stamina', width: '20%'},
    {name: 'climbing', title: 'Climbing', width: '18%'},
    {name: 'evasion', title: 'Evasion', width: '14%'},
    {name: 'hiding', title: 'Hiding', width: '14%'},
  ];

  return (
    <Box> 
      <Text fontSize={18} color='blue.500' align='center'>Tests table</Text>

      <Box h='200px' overflow='scroll'> 
        <TableView columns={testColumns} data={tests} selected={{id: test_id, column: testColumn}}
          onClick={selectTestCell} onUpdate={openUpdateTest} onDelete={openDeleteTest}/>

        <ActionButton type="add"
          available={getCurrentYear() === year && getCurrentMonth() === month}
          onClick={addTest}/>   
      </Box>
    </Box>
  );
};