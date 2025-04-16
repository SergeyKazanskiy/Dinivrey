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
  const gifSrc = `/achieves/gifs/${image}.gif`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1, rotate: 720 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      <Box position="relative" display="inline-block"
        onClick={onClick}>
        <Image src={frameSrc} alt="Background" boxSize={level === 'Epic' ? "56px" : "56px"} objectFit='cover' />
        <Image src={gifSrc} alt="GIF" boxSize="48px" borderRadius='24px'
          position="absolute" top="40px" left="50%" transform="translate(-50%, -50%)"/>
        <Text fontSize={12} align='center' color='gray.400'>{label}</Text>
      </Box>
    </motion.div>
  );
};
