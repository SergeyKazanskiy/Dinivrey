import React from "react";
import { Text, ImageBackground, StyleSheet } from "react-native";


type Props = {
  average: number;
};

export const ScoreBanner: React.FC<Props> = ({ average }) => (
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
    width: 77,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "600",
    marginTop: 4,
    paddingLeft: 4
  },
  value: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
