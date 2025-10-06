import React, { useState } from 'react';
import { Image, Text, StyleSheet, TouchableOpacity, ImageSourcePropType, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { BACKEND_APP_IMAGES_URL, RuleLevels, AchieveGradientColors } from '../../../../shared/constants';
import { LinearGradient } from 'expo-linear-gradient';


interface AnimatedIconProps {
  onClick: () => void;
  image: string;
  label: string;
  level: number;
  percent: number;
  size: number;
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


export const AchieveIcon: React.FC<AnimatedIconProps> = ({ onClick, image, label, level, percent, size,
  effect: selectedEffect, isGif, isAnimate = true}) => {

  const frameSrc: ImageSourcePropType = { uri: `${BACKEND_APP_IMAGES_URL}/achieves/frames/${RuleLevels[level - 1]}.png` };
  const pngSrc: ImageSourcePropType = { uri: `${BACKEND_APP_IMAGES_URL}/achieves/images/${image}.png` };
  const gifSrc: ImageSourcePropType = { uri: `${BACKEND_APP_IMAGES_URL}/achieves/gifs/${image}.gif` };

  const colors = AchieveGradientColors[level - 1]  ;
  const [animation, setAnimation] = useState<Animatable.Animation | undefined>(undefined);

  const handlePress = () => {
    onClick();
    if (selectedEffect) {
      const mappedAnimation = effectMapping[selectedEffect];
      setAnimation(mappedAnimation);
      setTimeout(() => setAnimation(undefined), 600);
    }
  };

  const frameSize = size; 
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
          <ImageBackground source={require('../../../../../assets/images/BackAchieve.png')}
            style={styles.backgroundImage}>
                
            <Text style={[styles.label, {marginVertical: 4}]}>{label}</Text>
            <ImageBackground source={frameSrc}
              style={[ styles.frameImage,{ width: frameSize, height: frameSize }]}
              resizeMode="cover"
            >
              <Image source={isGif ? gifSrc : pngSrc}
                style={[ styles.iconImage,
                    { width: iconSize, height: iconSize, top: (frameSize - iconSize) / 2, marginLeft: -(iconSize / 2) } ]}
                resizeMode="cover"
              />
            </ImageBackground>

            <LinearGradient
              colors={[colors[1], '#222']}
              start={{ x: 0, y: 0 }}
              end={{ x: percent, y: 0 }}
              locations={[percent, percent + 0.2]}
              style={[{ width: 'auto', height: 20, marginVertical: 6, borderRadius: 10,
                borderWidth: 2, borderColor: colors[0]
              }]}
            >
              <Text style={[styles.percent, {color: level > 1 ? '#fff' : percent === 0 ?'#ddd' : '#222'}]}>{percent * 100}%</Text>
            </LinearGradient>
          </ImageBackground>
        </Animatable.View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    //marginHorizontal: 8,
    marginBottom: 4
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
    fontSize: 10,
    fontWeight: 800,
    color: '#bbb',
    textAlign: 'center',
  },
  percent: {
    fontSize: 13,
    fontWeight: 400,
    textAlign: 'center',
  },
  backgroundImage: {
    //backgroundColor: '#444444',
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  }
});
