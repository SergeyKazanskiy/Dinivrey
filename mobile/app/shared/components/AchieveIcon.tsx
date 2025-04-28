import React, { useState } from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ImagesPath } from '../constants';


interface AnimatedIconProps {
  image: string;
  label: string;
  level: string;
  size?: number;
  effect?: string; //'fade' | 'rotate' | 'pulse' | 'jump' | 'ripple';
  isGif?: boolean;
}

const effectMapping: Record<string, Animatable.Animation> = {
  fade: 'fadeIn',
  rotate: 'rotate',
  pulse: 'pulse',
  jump: 'bounce', // change jump on bounce
  ripple: 'rubberBand', // ripple on rubberBand
};


export const AchieveIcon: React.FC<AnimatedIconProps> = ({ image, label, level, size = 80, effect: selectedEffect, isGif}) => {
  const frameSrc: ImageSourcePropType = { uri: `${ImagesPath}/achieves/frames/${level}.png` };
  const pngSrc: ImageSourcePropType = { uri: `${ImagesPath}/achieves/images/${image}.png` };
  const gifSrc: ImageSourcePropType = { uri: `${ImagesPath}/achieves/gifs/${image}.gif` };


  const [animation, setAnimation] = useState<Animatable.Animation | undefined>(undefined);

  const handlePress = () => {
    if (selectedEffect) {
      const mappedAnimation = effectMapping[selectedEffect];
      setAnimation(mappedAnimation);
      setTimeout(() => setAnimation(undefined), 600);
    }
  };

  const frameSize = level === 'Epic' ? size * 0.975 : size; 
  const iconSize = size * 0.75;
  const iconOffset = frameSize / 2; // for center

  return (
    <Animatable.View
      animation="zoomIn"
      duration={3000}
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
                { width: iconSize, height: iconSize, top: frameSize / 2, marginLeft: -(iconSize / 2) } ]}
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
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  },
});
