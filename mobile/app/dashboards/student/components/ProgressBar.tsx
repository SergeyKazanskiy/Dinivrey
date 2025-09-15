import React from "react";
import { View, StyleSheet } from "react-native";


type Props = {
  percent: number;
  height?: number;
  bg?: string;
  fillColor?: string;
};

export const ProgressBar: React.FC<Props> = ({percent, height=16, bg="#222", fillColor="#ddd"}) => {
  return (
    <View style={[styles.container, {height, borderRadius: height / 2, backgroundColor: bg}]}>
      <View style={{
          width: `${percent}%`,
          height: "100%",
          borderTopLeftRadius: height / 2,
          borderBottomLeftRadius: height / 2,
          backgroundColor: fillColor,
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
});
