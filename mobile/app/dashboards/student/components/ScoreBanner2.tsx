import React from "react";
import { Text, ImageBackground, StyleSheet } from "react-native";


type Props = {
  average: number;
};

export const ScoreBanner2: React.FC<Props> = ({ average }) => (
  <ImageBackground
    source={require("../../../../assets/images/totalScoreBanner.png")}
    style={styles.banner}
    resizeMode="contain"
  >
    <Text style={styles.label}>T.S.</Text>
    <Text style={styles.value}>{average}</Text>
  </ImageBackground>
);


const styles = StyleSheet.create({
  banner: {
    width: 43,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 6,
    fontWeight: "600",
    marginTop: 4,
    paddingLeft: 4
  },
  value: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
