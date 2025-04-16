import { Checkbox, Text, Box, Divider, Flex } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';


export function AttendancesView() {
  const { attendances, attendance_id } = useStore();
  const { checkStudent } = useStore();

  return (
    <>
      {attendances.map((attendance, inx) => (
        <Box>
          <Flex key={inx} justifyContent='space-between' h ='28px' align='center'>
            <Text fontSize='sm' style={widgetStyles.text}>
                {attendance.first_name} {attendance.last_name}
            </Text>
            <Checkbox size='md' pr={3} isChecked={attendance.present} colorScheme="gray" opacity={0.7}
              onChange={(e) => checkStudent(attendance.id)}/>
          </Flex>
          <Divider/>
        </Box>
      ))}
    </>
  );
};
