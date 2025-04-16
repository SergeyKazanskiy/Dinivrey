import { Text, Divider, Box, VStack } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';


export function StudentsView() {
  const { students } = useStore();

  return (
    <>
      {students.map((student, inx) => (
        <Box h ='28px'>
          <Text key={inx} fontSize='sm' mt='4px'  style={widgetStyles.text}>
              {student.first_name} {student.last_name}
          </Text>
          <Divider/>
        </Box>
      ))}
    </>
  );
};
