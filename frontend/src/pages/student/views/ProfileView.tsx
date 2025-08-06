import { useEffect } from 'react';
import { Flex, Text, Select, Checkbox, HStack, Container, NumberInput, Box } from "@chakra-ui/react";
import { NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { useStore } from "../store";
import ProfileCell from "../../../components/ProfileCell";
import { ProfileSelect } from "../../../components/ProfileSelect";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'


export const ProfileView: React.FC = () => {
  const { active, first_name, last_name, phone, gender, age } = useStore();
  const {setFirstName, setLastName, setPhone, setGender, setAge, setIsActive, checkProfile} = useStore();

    useEffect(() => {
      checkProfile();
    }, [active, first_name, last_name, phone, gender, age ]);

  return (
    <Container style={screenStyles.widget} h='172px' w='320px'>                 
      <Flex justify="space-between" align="center" mb="2">
        <Text style={widgetStyles.title}>Personal information</Text>
        
        <Flex pt={1}>
            <Text fontSize="sm" color="blue.500">Active:</Text>
            <Checkbox size='sm' isChecked={active} colorScheme="gray" px={1}
                onChange={(e) => setIsActive(e.target.checked)}/>
        </Flex>     
      </Flex>

      <Flex direction="column" gap="0.5">
        <ProfileCell label="First name" value={first_name} maxLength={20} w1='92px' w2='200px' isRequired
          onChange={(value) => setFirstName(String(value))}/>
        <ProfileCell label="Last name" value={last_name} maxLength={20} w1='92px' w2='200px' isRequired
          onChange={(value) => setLastName(String(value))}/>
        <ProfileCell label="Phone" value={phone} maxLength={16} w1='92px' w2='200px'
          onChange={(value) => setPhone(String(value))}/>

        <Box display='flex' alignItems='baseline'>
          <Text style={widgetStyles.text} mr='39px'>Gender:</Text>
          <Select size='sm' w='80px' value={gender} style={widgetStyles.value}
            onChange={(e) => setGender(e.target.value)}>
            <option value="Boy">Boy</option><option value="Girl">Girl</option>
          </Select>

          <Text style={widgetStyles.text} ml='12px' mr='4px'>Age:</Text>
          <NumberInput size='sm' w='70px' value={age} color="#F29F56"
            onChange={(value) => setAge(Number(value))} min={3} max={70}>
            <NumberInputField />
            <NumberInputStepper><NumberIncrementStepper/><NumberDecrementStepper/></NumberInputStepper>
          </NumberInput>
        </Box>
      </Flex>
    </Container>
  );
};

