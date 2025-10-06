import { SimpleGrid, Box, Text, VStack, Image, useDisclosure} from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { StudentPopover } from '../components/StudentPopover';
import { BACKEND_APP_IMAGES_URL } from '../../../shared/constants';


export const StudentsView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { students, camp_name, group_name } = useStore();
  const { selectStudent, createStudent } = useStore();

  return (
      <SimpleGrid display='flex' flexWrap='wrap' h='580px'>
        {students.map((item, inx) => {
          const photoPath = item.photo === 'Student_boy.png' || item.photo === 'Student_girl.png' ?
            BACKEND_APP_IMAGES_URL + '/photos/' + item.photo :
            BACKEND_APP_IMAGES_URL + '/photos/' + camp_name + '/students/' + group_name + '/' + item.photo
          
          return (
            <Box key={inx} m={3} onClick={() => selectStudent(item.id)}>
              <Image src={`${photoPath}?t=${Date.now()}`} alt='Photo' borderRadius='full' boxSize='88px'mb={1}/>
              <VStack align='center'>
                <Text fontSize='sm' mb={-2} style={widgetStyles.text}>{item.first_name}</Text>
                <Text fontSize='sm' style={widgetStyles.text}>{item.last_name}</Text>
              </VStack>  
            </Box>
          )
        })}
        <StudentPopover isOpen={isOpen} onOpen={onOpen} onClose={onClose} onSave={createStudent}/>
      </SimpleGrid>
  );
};
