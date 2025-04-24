import { Box, Image, Text } from "@chakra-ui/react";


interface Props {
  image: string;
  label: string;
  level: string;
}

export const AchieveIcon: React.FC<Props> = ({ image, label, level }) => {
  const frameSrc = `/achieves/frames/${level}.png`;
  const pngSrc = `/achieves/images/${image}.png`;

  return (
      <Box position="relative" display="inline-block" mx='6px'>
        <Image src={frameSrc} alt="Background" boxSize={level === 'Epic' ? "48px" : "48px"} objectFit='cover' />
        <Image src={pngSrc} alt="GIF" boxSize="36px" borderRadius='18px'
          position="absolute" top="24px" left="50%" transform="translate(-50%, -50%)"/>
      </Box>
  );
};

// <Text fontSize={12} align='center' color='gray.400'>{label}</Text>