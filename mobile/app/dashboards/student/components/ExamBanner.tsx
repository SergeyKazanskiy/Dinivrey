import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RuleTests, ExamIcons } from '../../../shared/constants';


export type ExamBannerProps = {
  value: number;
  color: string;
  icon: string;
  isSelected?: boolean
};

export const ExamBanner: React.FC<ExamBannerProps> = ({ value, color, icon, isSelected }) => {

  return(
  <View style={[styles.container, { backgroundColor: color }]}>
    <View style={styles.labelWrapper}>
      <View style={styles.labelWrapper2}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
    <View style={styles.icon}>
      <Image source={ExamIcons[icon]} style={[styles.image, isSelected && {backgroundColor: '#fff'}]} />
    </View>
  </View>
)};


const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 80,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelWrapper: {
    width: '104%',
    paddingBottom: 3,
    alignItems: "center",
    justifyContent: "center",

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    // Android
    elevation: 5,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000'
  },
  labelWrapper2: {
    backgroundColor: "#000",
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    height: 40,
    width: 40,
    backgroundColor: "#000",
  },
});