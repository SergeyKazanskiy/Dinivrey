import { Text, Box, VStack, HStack, Editable, EditablePreview, EditableTextarea, Checkbox, Spacer, Container } from "@chakra-ui/react";
import { useStore } from "../store";
import { screenStyles, widgetStyles } from '../../../shared/appStyles'
import { AchieveIcon } from '../components/AchieveIcon'
import { AchieveCategories, AchieveTypes } from '../../../shared/constants';
import  ProfileCell from '../../../components/ProfileCell';
import { EnumSelect } from '../../../components/EnumSelect';


export const AchieveView: React.FC = () => {
  const { image, name, desc, category, trigger, effect, level } = useStore();
  const { setName, setDesc, setCategery, setTrigger } = useStore();

  return (
    <Container>
      <Text style={widgetStyles.text} fontWeight="medium">Info</Text>
      <Box borderWidth={2} borderColor='gray.300' borderRadius={8} pb='4px' h='142px' p={3}>
        <HStack align='start'>
          <Box mt={2} h='90px' w='90px'>
            <AchieveIcon level={level} image={image} label={name} effect={effect}/>
          </Box>
          <VStack ml={2}>
            <ProfileCell label="Name" value={name} maxLength={20} w1='72px' w2='130px'
              onChange={(value) => setName(String(value))}/>
            <EnumSelect label="Category" value={category} options={AchieveCategories} w1='72px' w2='130px'
              onChange={(value) => setCategery(String(value))}/>
            <EnumSelect label="Type" value={trigger} options={AchieveTypes} w1='72px' w2='130px'
              onChange={(value) => setTrigger(String(value))}/>
          </VStack>
        </HStack>  
      </Box>
      <Text mt={3} style={widgetStyles.text} fontWeight="medium">Description</Text>
      <Editable borderWidth={2} borderColor='gray.300' borderRadius={8} h='100px' overflowY="auto"
        value={desc} onChange={setDesc}> 
        <EditablePreview fontSize={15} color='gray.500' px={2}/>
        <EditableTextarea fontSize={15} h='100px' color='gray.500' px={2}/>
      </Editable>
    </Container>
  );
};

