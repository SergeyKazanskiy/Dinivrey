import { Box, Text, Image, HStack } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';


interface PropNameCell {
  title: string,
  w: string
}

function NameCell({title, w}: PropNameCell) {
  return(
    <Text w={w} pl={2} borderLeftWidth={1} borderLeftColor='gray.400' style={widgetStyles.alert}>
      {title}
    </Text>
  )
}

function TestCell({title}: {title: number}) {
  return(
    <Text w='64px' borderLeftWidth={1} borderLeftColor='gray.400' style={widgetStyles.alert} align='center'>
      {title}
    </Text>
  )
}

export const LidersView: React.FC = () => {
  const { liders } = useStore();

  return (
    <Box h='300px' overflow='scroll'>    
      {liders.map((lider, inx) => (

        <HStack key={inx} m={1} align='center' cursor='pointer' bg='white'
           borderBottomWidth={1} borderBottomColor='gray.200'>

          <Image src={`/images/${lider.photo}`} alt='Photo' borderRadius='full' boxSize='44px' ml={1}/>
          <NameCell w='120px' title={lider.first_name +' ' +lider.last_name} />
          <NameCell w='140px' title={lider.group_name}/>

          <TestCell title={lider.speed}/>
          <TestCell title={lider.stamina}/>
          <TestCell title={lider.climbing}/>
          <TestCell title={lider.evasion}/>
          <TestCell title={lider.hiding}/>
        </HStack>
      ))}
    </Box>
  );
};
