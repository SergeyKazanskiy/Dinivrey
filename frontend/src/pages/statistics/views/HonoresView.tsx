import { Box, Text, Image, Button, HStack, Spacer } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { SimpleIcon } from '../components/SimpleIcon';


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
  const { honores } = useStore();
  const {  } = useStore();

  return (
    <Box h='260px' overflow='scroll' pt={2}>    
      {honores.map((honored, inx) => (

        <HStack key={inx} m={1} align='center' cursor='pointer' py={1} bg='white'
          borderBottomWidth={1} borderBottomColor='gray.200'>

          <Image src={`/images/${honored.photo}`} alt='Photo' borderRadius='full' boxSize='44px' ml={1}/>
          <NameCell w='240px' title={honored.first_name +' ' +honored.last_name} />
          
          <HStack w='100%' borderLeftWidth={1} borderLeftColor='gray.400'>
            <Spacer/>
            {honored.achieves.map((achieve, inx) => (
              <SimpleIcon key={inx} image={achieve.image} level={achieve.level}/>
            ))}
          </HStack>
        </HStack>
      ))}
    </Box>
  );
};
