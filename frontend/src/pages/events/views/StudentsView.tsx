import { Text, Divider, Box, Center } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';


export function StudentsView() {
  const { students } = useStore();

  return (
    <Box h='700px'>
      { students.length === 0 && <Center h='90%'>
        <Text fontSize='16' color='gray.400'>Empty group</Text>
      </Center>}

      { students.length > 0 && <Box h='100%' overflow='scroll'>
        {students.map((student, inx) => (
          <Box h ='28px'>
            <Text key={inx} fontSize='sm' mt='4px'  style={widgetStyles.text}>
                {student.first_name} {student.last_name}
            </Text>
            <Divider/>
          </Box>
        ))}
      </Box>}
    </Box>
  );
};
