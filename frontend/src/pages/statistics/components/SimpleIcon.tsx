import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BACKEND_APP_IMAGES_URL } from '../../../shared/constants';


interface Props {
  image: string;
  level: string;
}

export const SimpleIcon: React.FC<Props> = ({ image, level }) => {
  const frameSrc = BACKEND_APP_IMAGES_URL + `/achieves/frames/${level}.png`;
  const pngSrc = BACKEND_APP_IMAGES_URL + `/achieves/images/${image}.png`;

  return (
      <Box position="relative" display="inline-block" mx='8px'>

        <Image src={frameSrc} alt="Background" boxSize={level === 'Epic' ? "42px" : "42px"} objectFit='cover' />
        <Image src={pngSrc} alt="GIF" boxSize="32px" borderRadius='16px'
          position="absolute" top="21px" left="50%" transform="translate(-50%, -50%)"/>

        {/* <Text fontSize={12} align='center' color='gray.600'>{label}</Text> */}
      </Box>
  );
};
