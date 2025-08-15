import { Text, HStack, Container } from "@chakra-ui/react";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { LabelText } from '../components/LabelText';

export const AttendanceView: React.FC = () => {
  const { trainingsAttendance, testsAttendance, gamesAttendance, totalAttendance } = useStore();

  return (
    <Container style={screenStyles.widget} h='46px'>                
      <HStack justifyContent='space-around' pt='8px'>
        <Text style={widgetStyles.title} pb={1} mr={8}>
          Attendance
        </Text>
        <LabelText label="Trainings" value={trainingsAttendance} w1='72px' w2='40px'/>
        <LabelText label="Tests" value={testsAttendance} w1='44px' w2='40px'/>
        <LabelText label="Games" value={gamesAttendance} w1='56px' w2='40px'/>
        <LabelText label="Total" value={totalAttendance} w1='44px' w2='40px'/>
      </HStack>
    </Container>
  );
};
