import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ImagesPath } from '../../../shared/constants';


interface AnimatedIconProps {
  image: string;
  label: string;
  level: string;
  count: number;
  onClick: () => void;
}

export const AchieveIcon: React.FC<AnimatedIconProps> = ({ image, label, level, count, onClick }) => {
  const frameSrc = ImagesPath + `/achieves/frames/${level}.png`;
  const pngSrc = ImagesPath + `/achieves/images/${image}.png`;

  return (
      <Box position="relative" display="inline-block" mx='8px'
        onClick={onClick}>

        <Image src={frameSrc} alt="Background" boxSize={level === 'Epic' ? "58px" : "58px"} objectFit='cover' />
        <Image src={pngSrc} alt="GIF" boxSize="46px" borderRadius='23px'
          position="absolute" top="29px" left="50%" transform="translate(-50%, -50%)"/>

        <Text fontSize={12} align='center' color='gray.600'>{label}</Text>
        <Text fontSize={12} align='center' color='gray.600'>x{count}</Text>
      </Box>
  );
};
