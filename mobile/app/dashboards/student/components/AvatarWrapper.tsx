import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";


type Props = {
  avatar: any;
  size?: number;
  level: number;
  percent: number;
  levelColor: string;
};

export const AvatarWrapper: React.FC<Props> = ({ avatar, size = 120, level, percent, levelColor }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * percent;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle stroke="#222" fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth}/>
 
        <Circle stroke={`url(#grad)`} fill="none" cx={size / 2} cy={size / 2} r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress}, ${circumference-progress}`}
          strokeLinecap="round"
          transform={`rotate(${360 * (1 - percent) - 45}, ${size / 2}, ${size / 2})`}
        />
     
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor='#D1FF4D' stopOpacity="1" />
            <Stop offset="100%" stopColor='#D1FF4D' stopOpacity="0.2" />
          </LinearGradient>
        </Defs>
      </Svg>

      <View style={[styles.avatarWrapper, { width: size - 16, height: size - 16 }]}>
        <Image source={avatar} style={styles.avatar} resizeMode="cover" />
      </View>

      <View style={[styles.levelBadge, {borderColor: levelColor}]}>
        <Text style={styles.levelText}>{level}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  avatarWrapper: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  levelBadge: {
    position: "absolute",
    right: 4,
    backgroundColor: "#000",
    borderRadius: 15,
    height: 30,
    width: 30,
    borderWidth: 4,
  },
  levelText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    alignSelf: 'center',
    paddingTop: 2
  },
});
