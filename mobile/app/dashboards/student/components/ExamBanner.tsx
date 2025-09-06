import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";


export type ExamBannerProps = {
  value: number;
  color: string;
  icon: any;
};

export const ExamBanner: React.FC<ExamBannerProps> = ({ value, color, icon }) => (
  <View style={[styles.container, { backgroundColor: color }]}>
    <View style={styles.label}>
      <Text style={styles.value}>{value}</Text>
    </View>
    
    <Image source={icon} style={styles.icon} />
  </View>
);


const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 80,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "space-between",
    //paddingVertical: 6,
  },
  label: {
    backgroundColor: "#000",
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#000",
  },
});