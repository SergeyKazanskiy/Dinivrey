import { Box, Text, Image, Button, HStack, Spacer } from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';


export const LidersView: React.FC = () => {
  const { liders, test, testNames } = useStore();


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
//The fall Cody Johnson
  return (
      <Box mt={1}>
        {/* <HStack bg='white' mx={1}>
          <Text pl={2} color='blue.500' fontWeight='600' fontSize={16}>Students sorted by test scores</Text>
          <Spacer/>
          <Box>
            {testNames.map((item, inx) => {
              const label = item.charAt(0).toUpperCase() + item.slice(1);
              return (<Button key={inx} bg='unset' color='blue.500' fontWeight='middle' w='100px'
                    sx={item === test ? { textDecoration: "underline" } : {}}>
                    {label}
              </Button>)
            })}
          </Box>
        </HStack> */}

        <Box h='538px' overflow='scroll'>    
          {liders.map((lider, inx) => (
            <HStack key={inx} m={1} align='center' cursor='pointer' py={1} bg='white'>
              <Image src={`/images/${lider.photo}`} alt='Photo' borderRadius='full' boxSize='44px' ml={1}/>
              <NameCell w='136px' title={lider.first_name}/>
              <NameCell w='136px' title={lider.last_name}/>
              <NameCell w='136px' title={lider.gender + ' ( ' + lider.age + ' years )'}/>

              <TestCell title={lider.speed}/>
              <TestCell title={lider.stamina}/>
              <TestCell title={lider.climbing}/>
              <TestCell title={lider.evasion}/>
              <TestCell title={lider.hiding}/>
            </HStack>
          ))}
        </Box>
      </Box>
  );
};
