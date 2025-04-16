import React, { useState } from "react";
import { EffectName, effects } from '../shared/constants'
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";


const levelColors = ["gold","silver","#cd7f32"]

interface AnimatedIconProps {
  uri: string;
  rare: boolean;
  level: number;
  label: string;
  effect: EffectName;
}

export const AchieveIcon: React.FC<AnimatedIconProps> = ({ uri, label, rare, level, effect: selectedEffect }) => {
  const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({});
  const effect = effects.find((e) => e.name === selectedEffect);

  const handlePress = () => {
    setAnimationStyle(effect!.apply(true));
    setTimeout(() => setAnimationStyle(effect!.apply(false)), 600);
  };

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.1 }}
    animate={{ opacity: 1, scale: 1, rotate: 720 }}
    transition={{ duration: 3, ease: "easeInOut" }}
  >
    <Box style={{ ...animationStyle }}>
    <svg viewBox="0 0 100 100" width="80" height="80" onClick={handlePress}>
      <image href={`/achieves/gifs/${uri}`} x="20" y="20" width="60" height="60" clipPath="circle(30px)" />
      <circle cx="50" cy="50" r="30" stroke={levelColors[level-1]} strokeWidth="8" fill="white" fill-opacity="1%" />

      {rare && <polygon points="17,60 10,50 6,30 15,40" fill="violet" strokeWidth='2px' stroke="red"/>}
      {rare && <polygon points="83,60 90,50 94,30 85,40" fill="violet" strokeWidth='2px' stroke="red" />}

      {(level === 1 || level === 3) && <circle cx="50" cy="18" r="5" fill="white"  strokeWidth='2px' stroke="red"/>}
      {level > 1 && <circle cx="40" cy="20" r="5" fill="white" strokeWidth='2px' stroke="green" />}
      {level > 1 && <circle cx="60" cy="20" r="5" fill="white" strokeWidth='2px' stroke="green"/>}

      
      <text x="50" y="98" textAnchor="middle" fontSize="16" fill="#F29F56" fontWeight="medium">{label}</text>
    </svg>
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