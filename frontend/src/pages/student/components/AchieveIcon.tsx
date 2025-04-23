import React, { useState } from "react";
import { EffectName, effects } from '../../../shared/constants'
import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";


interface AnimatedIconProps {
  image: string;
  label: string;
  level: string;
  onClick: () => void;
}

export const AchieveIcon: React.FC<AnimatedIconProps> = ({ image, label, level, onClick }) => {
  const frameSrc = `/achieves/frames/${level}.png`;
  const pngSrc = `/achieves/images/${image}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1, rotate: 720 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      <Box position="relative" display="inline-block" mx='8px'
        onClick={onClick}>
        <Image src={frameSrc} alt="Background" boxSize={level === 'Epic' ? "58px" : "58px"} objectFit='cover' />
        <Image src={pngSrc} alt="GIF" boxSize="46px" borderRadius='23px'
          position="absolute" top="29px" left="50%" transform="translate(-50%, -50%)"/>
        <Text fontSize={12} align='center' color='gray.400'>{label}</Text>
      </Box>
    </motion.div>
  );
};
