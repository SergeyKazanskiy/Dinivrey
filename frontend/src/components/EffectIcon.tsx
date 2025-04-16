import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { EffectName, effects } from '../shared/constants'


interface IconProps {
  selectedEffect: EffectName;
}

export const EffectIcon: React.FC<IconProps> = ({ selectedEffect }) => {
  const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({});
  const effect = effects.find((e) => e.name === selectedEffect);

  const handlePress = () => {
    if (!effect) return;
    setAnimationStyle(effect.apply(true));
    setTimeout(() => setAnimationStyle(effect.apply(false)), 900);
  };

  return (
    <Box textAlign="center" cursor="pointer" h='60px' w='60px' pt={1}
      onClick={handlePress}>
      <Box style={{ ...animationStyle }}>
        <StarIcon boxSize={8} color="yellow.400" />
      </Box>
      <Text fontSize={14}>{selectedEffect}</Text>
    </Box>
  );
};
