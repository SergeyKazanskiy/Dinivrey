import { Box, Text, Modal, ModalContent } from "@chakra-ui/react";
import { useStore } from "../store";
import { TableView } from '../../../components/TableView';
import { ActionButton } from '../../../components/ActionButton';
import { NumberPopover } from './NumberPopover';
import { getCurrentYear, getCurrentMonth } from '../../../shared/utils';


export const TestsTable: React.FC = () => {
  const { tests, test_id, isTestPopover, testColumn, testValue, year, month } = useStore();
  const { selectTestCell, updateTestCell, openUpdateTest, openDeleteTest, addTest } = useStore();

  const testColumns = [
    {name: 'date', title: 'Date', width: '16%'},
    {name: 'speed', title: 'Speed', width: '16%'},
    {name: 'stamina', title: 'Stamina', width: '16%'},
    {name: 'climbing', title: 'Climbing', width: '16%'},
    {name: 'evasion', title: 'Evasion', width: '16%'},
    {name: 'hiding', title: 'Hiding', width: '16%'},
  ];

  return (
    <Box> 
      <Text fontSize={18} color='blue.500' align='center'>Tests table</Text>

      <Box h='200px' overflow='scroll'> 
        <TableView columns={testColumns} data={tests} selected={{id: test_id, column: testColumn}}
          onClick={selectTestCell} onUpdate={openUpdateTest} onDelete={openDeleteTest}>

            {isTestPopover && <NumberPopover value={testValue} onUpdate={updateTestCell}/>}
        </TableView>

        <ActionButton type="add"
          available={getCurrentYear() === year && getCurrentMonth() === month}
          onClick={addTest}/>   
      </Box>
    </Box>
  );
};