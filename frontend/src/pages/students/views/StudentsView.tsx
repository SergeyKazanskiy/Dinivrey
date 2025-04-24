import { SimpleGrid, Box, Text, VStack, Image, useDisclosure} from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { StudentPopover } from '../components/StudentPopover';


export const StudentsView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { students } = useStore();
  const { selectStudent, createStudent } = useStore();

  return (
      <SimpleGrid display='flex' flexWrap='wrap' h='580px'>
        {students.map((item, inx) => (
          <Box key={inx} m={3} onClick={() => selectStudent(item.id)}>
            <Image src={`/images/${item.photo}`} alt='Photo' borderRadius='full' boxSize='88px'mb={1}/>
            <VStack align='center'>
              <Text fontSize='sm' mb={-2} style={widgetStyles.text}>{item.first_name}</Text>
              <Text fontSize='sm' style={widgetStyles.text}>{item.last_name}</Text>
            </VStack>  
          </Box>
        ))}
        <StudentPopover isOpen={isOpen} onOpen={onOpen} onClose={onClose} onSave={createStudent}/>
      </SimpleGrid>
  );
};
