import React, { useState } from "react";
import { EffectName, effects, ImagesPath } from '../../../shared/constants'
import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";


interface AnimatedIconProps {
  image: string;
  label: string;
  level: string;
  effect?: EffectName;
}

export const AchieveIcon: React.FC<AnimatedIconProps> = ({ image, label, level, effect: selectedEffect }) => {
  const frameSrc = ImagesPath + `/achieves/frames/${level}.png`;
  //const pngSrc = ImagesPath + `/achieves/images/${image}.png`;
  const gifSrc = ImagesPath + `/achieves/gifs/${image}.gif`;
  
  const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({});
  const effect = effects.find((e) => e.name === selectedEffect);

  const handlePress = () => {
    if (effect) {
      setAnimationStyle(effect.apply(true));
      setTimeout(() => setAnimationStyle(effect!.apply(false)), 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1, rotate: 720 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      <Box style={{ ...animationStyle }} position="relative" display="inline-block"
        onClick={handlePress}>
        <Image src={frameSrc} alt="Background" boxSize={level === 'Epic' ? "78px" : "80px"} objectFit='cover' />
        <Image src={gifSrc} alt="GIF" boxSize="60px" borderRadius='30px'
          position="absolute" top="40px" left="50%" transform="translate(-50%, -50%)"/>
        <Text fontSize={12} align='center' color='gray.400'>{label}</Text>
      </Box>
    </motion.div>
  );
};