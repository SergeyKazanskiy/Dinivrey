import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widgetStyles } from '../styles/appStyles';


export type Props = {
  label: string;
  value: string;
};
  
export const AddressCell1: React.FC<Props> = ({label, value}) => {
  return (
    <View style={styles.container}>
        <Text style={[widgetStyles.label, styles.address]}>{label}</Text>
        <Text style={widgetStyles.input}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingLeft: 4,
    width: '100%'
  },
  address: {
    width: 80
  },
});



/*
import React from "react";
import { View, Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withRepeat } from "react-native-reanimated";

interface IconEffect {
  uri: string;
  effects: (keyof typeof effects)[];
  duration: number;
}

const effects = {
  scale: (value: number, duration: number) => withTiming(value ? 1.2 : 1, { duration }),
  pulse: (value: number, duration: number) => withRepeat(withTiming(1.2, { duration: duration / 2 }), 2, true),
  fade: (value: number, duration: number) => withTiming(value ? 0.5 : 1, { duration }),
  rotate: (value: number, duration: number) => withTiming(value ? 15 : 0, { duration }),
  jump: (value: number, duration: number) => withSequence(withTiming(-10, { duration: duration / 2 }), withTiming(0, { duration: duration / 2 })),
  color: (value: number, duration: number) => withTiming(value ? 0 : 1, { duration }),
  ripple: (value: number, duration: number) => withRepeat(withTiming(1.3, { duration: duration / 2 }), 2, true),
};

interface AnimatedIconProps {
  uri: string;
  appliedEffects: (keyof typeof effects)[];
  duration: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ uri, appliedEffects, duration }) => {
  const animationValues = appliedEffects.reduce<Record<string, Animated.SharedValue<number>>>((acc, effect) => {
    acc[effect] = useSharedValue(0);
    return acc;
  }, {});

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: animationValues.scale?.value || 1 },
        { rotate: `${animationValues.rotate?.value || 0}deg` },
        { translateY: animationValues.jump?.value || 0 },
      ],
      opacity: animationValues.fade?.value || 1,
    };
  });

  const handlePress = () => {
    appliedEffects.forEach(effect => {
      if (effects[effect]) {
        animationValues[effect].value = effects[effect](1, duration);
      }
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <FastImage source={{ uri }} style={{ width: 50, height: 50 }} resizeMode={FastImage.resizeMode.contain} />
      </Animated.View>
    </Pressable>
  );
};

const icons: IconEffect[] = [
  { uri: "https://example.com/icon1.gif", effects: ["scale", "rotate"], duration: 500 },
  { uri: "https://example.com/icon2.gif", effects: ["pulse"], duration: 800 },
  { uri: "https://example.com/icon3.gif", effects: ["fade", "jump"], duration: 600 },
];

const IconList: React.FC = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 50 }}>
      {icons.map((icon, index) => (
        <AnimatedIcon key={index} uri={icon.uri} appliedEffects={icon.effects} duration={icon.duration} />
      ))}
    </View>
  );
};

export default IconList; */
