import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RuleTests, ExamIcons } from '../../../shared/constants';


export type ExamBannerProps = {
  value: number;
  color: string;
  icon: string;
};

export const ExamBanner2: React.FC<ExamBannerProps> = ({ value, color, icon }) => {

  return(
  <View style={[styles.container, { backgroundColor: color }]}>
    <View style={styles.labelWrapper}>
      <View style={styles.labelWrapper2}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
    <View style={styles.icon}>
      <Image source={ExamIcons[icon]} style={styles.image} />
    </View>
  </View>
)};


const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 40,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelWrapper: {
    width: '104%',
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "center",

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    // Android
    elevation: 5,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000'
  },
  labelWrapper2: {
    backgroundColor: "#000",
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    color: "#fff",
    fontSize: 7,
    fontWeight: "500",
  },
  icon: {
    top:1,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    height: 20,
    width: 20,
    backgroundColor: "#000",
  },
});