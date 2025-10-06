import { Box, Text, Image, Button, HStack, Spacer } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { SimpleIcon } from '../components/SimpleIcon';
import { BACKEND_APP_IMAGES_URL, RuleLevels } from '../../../shared/constants';


interface PropNameCell {
  title: string,
  w: string
}

function NameCell({title, w}: PropNameCell) {
  return(
    <Text w={w} pl={2} borderLeftWidth={1} borderLeftColor='gray.400' style={widgetStyles.alert}>{title}</Text>
  )
}

export const HonoresView: React.FC = () => {
  const { honores, camp_name, group_name } = useStore();
  const {  } = useStore();

  return (
    <Box h='260px' overflow='scroll' pt={2}>    
      {honores.map((item, inx) => {
        const photoPath = item.photo === 'Student_boy.png' || item.photo === 'Student_girl.png' ?
          BACKEND_APP_IMAGES_URL + '/photos/' + item.photo :
          BACKEND_APP_IMAGES_URL + '/photos/' + camp_name + '/students/' + group_name + '/' + item.photo

        return (
          <HStack key={inx} m={1} align='center' cursor='pointer' py={1} bg='white'
            borderBottomWidth={1} borderBottomColor='gray.200'>

            <Image src={photoPath} alt='Photo' borderRadius='full' boxSize='44px' ml={1}/>
            <NameCell w='240px' title={item.first_name +' ' +item.last_name} />
            
            <HStack w='100%' borderLeftWidth={1} borderLeftColor='gray.400'>
              <Spacer/>
              {item.achieves.map((achieve, inx) => (
                <SimpleIcon key={inx} image={achieve.image} level={RuleLevels[achieve.level - 1]}/>
              ))}
            </HStack>
          </HStack>
        )}
      )}
    </Box>
  );
};
