import React, { useState } from "react";
import { EffectName, effects } from '../../../shared/constants'
import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ImagesPath } from '../../../shared/constants';


interface Props {
  image: string;
  label: string;
  level: string;
  effect: EffectName;
  onClick: () => void;
}

export const AchievementIcon: React.FC<Props> = ({ image, label, level, effect: selectedEffect, onClick }) => {
  const frameSrc = ImagesPath + `/achieves/frames/${level}.png`;
  const gifSrc = ImagesPath + `/achieves/gifs/${image}.gif`;
  
  const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({});
  const effect = effects.find((e) => e.name === selectedEffect);

  const handlePress = () => {
    setAnimationStyle(effect!.apply(true));
    setTimeout(() => setAnimationStyle(effect!.apply(false)), 600);
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1, rotate: 720 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      <Box style={{ ...animationStyle }} position="relative" display="inline-block" mx='8px'
        onClick={handlePress}>
        <Image src={frameSrc} alt="Background" boxSize={level === 'Epic' ? "58px" : "58px"} objectFit='cover' />
        <Image src={gifSrc} alt="GIF" boxSize="46px" borderRadius='23px'
          position="absolute" top="29px" left="50%" transform="translate(-50%, -50%)"/>
        <Text fontSize={12} align='center' color='gray.400'>{label}</Text>
      </Box>
    </motion.div>
  );
};

/*
setAnimationStyle(
      selectedEffects.reduce<React.CSSProperties>((acc, effectName) => {
        const effect = effects.find((e) => e.name === effectName);
        return effect ? { ...acc, ...effect.apply(true) } : acc;
      }, {})
    );

    setTimeout(() => {
      setAnimationStyle(
        selectedEffects.reduce<React.CSSProperties>((acc, effectName) => {
          const effect = effects.find((e) => e.name === effectName);
          return effect ? { ...acc, ...effect.apply(false) } : acc;
        }, {})
      );
    }, 800);
    */