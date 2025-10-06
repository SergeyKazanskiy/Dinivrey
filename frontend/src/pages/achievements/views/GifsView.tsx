import { SimpleGrid, Box, IconButton, Text, VStack, Image, useDisclosure} from "@chakra-ui/react";
import { widgetStyles } from '../../../shared/appStyles'
import { useStore } from '../store';
import { AddIcon } from '@chakra-ui/icons'
import { BACKEND_APP_IMAGES_URL } from '../../../shared/constants'


export function GifsView() {
  const { gifs, image } = useStore();
  const { setImage, addGif, removeGif } = useStore();

  function onAddClick() {
    addGif()  
  }
 
  return (
      <VStack h='700px' align='start'>
        <Text style={widgetStyles.text} fontWeight="medium" mb='-8px'>Gifs</Text>
        <VStack w='76px' align='start' overflow='scroll'>
          {gifs.map((item, index) => (
            <Box borderColor='gray.400' borderWidth={1} borderRadius={8}
              bg={item === image ? 'gray.200' : 'unset' }
              onClick={() => setImage(item)}>
              <Image src={BACKEND_APP_IMAGES_URL + `/achieves/images/${item}.png`} alt='GIF' borderRadius='full' boxSize='60px'mb={1} objectFit='cover'/>
            </Box>
          ))}
          <IconButton my='20px' ml='4px' borderRadius={20} variant='outline' colorScheme='blue'
            aria-label='Add' icon={<AddIcon/>} onClick={onAddClick}
          />
        </VStack>
      </VStack>
  );
};

/*
 style={inx === gifInx ? widgetStyles.selected : 'unset'}
 */