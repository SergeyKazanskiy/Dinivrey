import { Box, Text, Image, Button, HStack, Spacer } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { AchieveIcon } from '../components/AchieveIcon';
import { BACKEND_APP_IMAGES_URL } from '../../../shared/constants';
import { PasswordDialog } from '../components/PasswordDialog';


interface PropNameCell {
  title: string,
  w: string
}

function NameCell({title, w}: PropNameCell) {
  return(
    <Text w={w} pl={2} borderLeftWidth={1} borderLeftColor='gray.400' style={widgetStyles.alert}>{title}</Text>
  )
}

function TestCell({title}: {title: number}) {
  return(
    <Text w='92px' borderLeftWidth={1} borderLeftColor='gray.400' style={widgetStyles.alert} align='center'>{title}</Text>
  )
}


export const LidersView: React.FC = () => {
  const { liders, test, tests, camp_name, group_name } = useStore();
  const { isPasswordDialog, student_name, student_password} = useStore();
  const { selectTest, selectStudent, showPasswordDialog, updatePassword, hidePasswordDialog } = useStore();

  return (
      <Box mt={1}>
        <PasswordDialog isOpen={isPasswordDialog} name={student_name} password={student_password}
          onUpdate={updatePassword} onCancel={hidePasswordDialog}/>

        <HStack bg='white' mx={1}>
          <Text pl={2} color='blue.500' fontWeight='600' fontSize={16}>Students sorted by test scores</Text>
          <Box ml='156px'>
            {tests.map((item, inx) => {
              const label = item.charAt(0).toUpperCase() + item.slice(1);

              return (<Button key={inx} bg='unset' color='blue.500' fontWeight='middle' w='98px'
                    sx={item === test ? { textDecoration: "underline" } : {}}
                    onClick={() => selectTest(item)}>
                    {label}
              </Button>)
            })}
          </Box>
          <Text pl={2} color='blue.500' fontWeight='600' fontSize={16}>Password</Text>
        </HStack>

        <Box h='538px' overflow='scroll'>    
          {liders.map((item, inx) => {
            const photoPath = item.photo === 'Student_boy.png' || item.photo === 'Student_girl.png' ?
              BACKEND_APP_IMAGES_URL + '/photos/' + item.photo :
              BACKEND_APP_IMAGES_URL + '/photos/' + camp_name + '/students/' + group_name + '/' + item.photo

            return (
            <HStack key={inx} m={1} align='center'  py={1}  bg='white'>
              <Image src={photoPath} alt='Photo' borderRadius='full' boxSize='44px' ml={1}/>
              <Box cursor='pointer' onClick={() => selectStudent(item.id)}>
                <NameCell w='200px' title={item.first_name + ' ' + item.last_name}/>
              </Box>
              <NameCell w='136px' title={item.gender + ' ( ' + item.age + ' years )'}/>
              <TestCell title={item.speed}/>
              <TestCell title={item.stamina}/>
              <TestCell title={item.climbing}/>
              <TestCell title={item.evasion}/>
              <TestCell title={item.hiding}/>
              <Box cursor='pointer' w='280px' h='40px'
                onClick={() => showPasswordDialog(item.id)}>
                <NameCell w='260px' title={item.password}/>
              </Box>
            </HStack>
          )})}
        </Box>
      </Box>
  );
};


{/* <HStack w='210px' h='26px' justifyContent='center' borderLeftWidth={1} borderLeftColor='gray.400'>
  {lider.achieves.map((achieve, inx) => (
    <AchieveIcon key={inx} image={achieve.image} label={achieve.name} level={achieve.level}/>
  ))}
</HStack> */}