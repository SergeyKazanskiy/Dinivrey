import { Text, Box, Textarea, Flex, Input } from "@chakra-ui/react";
import { widgetStyles, screenStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import YouTubePlayer from '../../../components/YouTubePlayer';


export function DrillView() {
  const { link, desc } = useStore();
  const { setLink, setDesc, updateDrill, setColumn } = useStore();

  return (
    <Box px='12px' pt='2px' style={screenStyles.widget} h='700px'>
      <Text pb={3} mr={8} style={widgetStyles.title} mt={1}>Selected drill</Text>
      <YouTubePlayer videoId={link}/>

      <Flex alignItems='center'>
        <Text color='red.400' fontSize={15} mr={1} fontWeight="medium">Link:</Text>
        <Input size="sm" style={widgetStyles.text}
          value={link} type='text'
          borderColor={link === '' ? 'red.400' : 'gray.200'}
          onFocus={() => setColumn('link')}
          onChange={(e) => setLink(e.target.value)}
          onBlur={() => { if (link !== '') updateDrill(link) }}
        />
      </Flex>

      <Text mt={4} color='red.400' fontSize={15} mb='4px' fontWeight="medium">Description</Text>
      <Textarea value={desc} size='sm' h='200px' style={widgetStyles.text} 
          onFocus={() => setColumn('desc')}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={() => { if (desc !== '') updateDrill(desc) }}
      />
    </Box>
  );
};

/*
<HStack>
          
          <Spacer/>
          <Button mb={2} colorScheme='blue' size='sm' onClick={() => updateDrill(link)}>Save</Button>
        </HStack>
        */