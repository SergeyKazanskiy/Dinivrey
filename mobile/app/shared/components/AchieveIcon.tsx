import React, { useState } from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { BACKEND_APP_IMAGES_URL, RuleLevels } from '../constants';


interface AnimatedIconProps {
  onClick: () => void;
  image: string;
  label: string;
  level: number;
  size?: number;
  effect?: string; //'fade' | 'rotate' | 'pulse' | 'jump' | 'ripple';
  isGif?: boolean;
  isAnimate?: boolean;
}

const effectMapping: Record<string, Animatable.Animation> = {
  fade: 'fadeIn',
  rotate: 'rotate',
  pulse: 'pulse',
  jump: 'bounce', // change jump on bounce
  ripple: 'rubberBand', // ripple on rubberBand
};


export const AchieveIcon: React.FC<AnimatedIconProps> = ({ onClick, image, label, level, size = 80, effect: selectedEffect, isGif, isAnimate = true}) => {
  const frameSrc: ImageSourcePropType = { uri: `${BACKEND_APP_IMAGES_URL}/achieves/frames/${RuleLevels[level - 1]}.png` };
  const pngSrc: ImageSourcePropType = { uri: `${BACKEND_APP_IMAGES_URL}/achieves/images/${image}.png` };
  const gifSrc: ImageSourcePropType = { uri: `${BACKEND_APP_IMAGES_URL}/achieves/gifs/${image}.gif` };


  const [animation, setAnimation] = useState<Animatable.Animation | undefined>(undefined);

  const handlePress = () => {
    onClick();
    if (selectedEffect) {
      const mappedAnimation = effectMapping[selectedEffect];
      setAnimation(mappedAnimation);
      setTimeout(() => setAnimation(undefined), 600);
    }
  };

  const frameSize = level === 3 ? size * 0.975 : size; 
  const iconSize = size * 0.75;
  const iconOffset = frameSize / 2; // for center

  return (
    <Animatable.View
      animation="zoomIn"
      duration={isAnimate ? 2000 : 500}
      easing="ease-in-out"
      style={styles.container}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animatable.View animation={animation} duration={600} style={styles.innerContainer}>
          <Image source={frameSrc}
            style={[ styles.frameImage,{ width: frameSize, height: frameSize }]}
            resizeMode="cover"
          />
          <Image source={isGif ? gifSrc : pngSrc}
            style={[ styles.iconImage,
                { width: iconSize, height: iconSize, top: (frameSize - iconSize) / 2, marginLeft: -(iconSize / 2) } ]}
            resizeMode="cover"
          />
          <Text style={styles.label}>{label}</Text>
        </Animatable.View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  frameImage: {
    borderRadius: 9999, // for circle
  },
  iconImage: {
    position: 'absolute',
    left: '50%',
    borderRadius: 9999, //  for circle
  },
  label: {
    fontSize: 15,
    color: '#F8E187',
    textAlign: 'center',
    marginTop: 4,
  },
});
