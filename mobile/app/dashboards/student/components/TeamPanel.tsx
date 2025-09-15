import React from "react";
import { Text, ImageBackground, StyleSheet } from "react-native";


type Props = {
  w: number;
  h?: number;
  teamName: string;
  fontS?: number;
};

export const TeamPanel: React.FC<Props> = ({ w, h, teamName, fontS = 12 }) => (
  <ImageBackground
    source={require("../../../../assets/images/studentTeam-Back.png")}
    style={[styles.background, {width: w}, {height: h}]}
    resizeMode='stretch'
  >
    <Text style={[styles.text, {fontSize:fontS}]}>{teamName}</Text>
  </ImageBackground>
);


const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
  },
});
