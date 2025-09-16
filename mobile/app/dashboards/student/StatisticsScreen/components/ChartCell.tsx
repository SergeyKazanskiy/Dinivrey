import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Metric } from '../../model';
import { RuleTests, ExamIcons } from '../../../../shared/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StepChart } from './StepChart';
import { formatDate, formatDateTime } from '../../../../shared/utils';
import { Ionicons } from '@expo/vector-icons';


export type Props = {
  exam: string;
  metrics: Metric[];
  colors: string[];
  onShow: () => void;
};

export const ChartCell: React.FC<Props> = ({ exam, metrics, colors, onShow }) => {
  const lastMetric = metrics[metrics.length - 1]
  const points = metrics.map(el => ({'x': formatDateTime(el.timestamp).date, 'y': el.score}))
  const time = lastMetric ? lastMetric.time + ' ' +lastMetric.unit : ''

  return(
    <LinearGradient colors={[colors[0], colors[1]]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={{width: 144}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <View style={styles.icon}>
              <Image source={ExamIcons[exam]} style={styles.image} />
            </View>
            <Text style={styles.title}>{exam}</Text>
          </View>
        
          <TouchableOpacity style={{top: -4, right: -8}} onPress={onShow}>
            <Ionicons name="arrow-down-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={[styles.widget, {padding: 4}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around',
            borderBottomWidth: 1, borderColor: 'orange', paddingBottom: 2}}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{time}</Text>
            </View>
            <View style={{borderLeftWidth: 1, borderColor: 'orange'}}></View>
             <View style={{alignItems: 'center'}}>
              <Text style={styles.label}>Points</Text>
              <Text style={styles.value}>{lastMetric ? lastMetric.score : ''}</Text>
             </View>
          </View>
        
          <Text style={styles.date}>{lastMetric ? formatDate(lastMetric.timestamp) : ''}</Text> 
        </View>
      </View>    

       <View style={styles.widget}>
          <StepChart data={points} width={152} height={100}/>
       </View>
   </LinearGradient>
  )
};


const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16
  },
  widget: {
    flex: 1,
    borderRadius: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#444',
    backgroundColor: '#fff'
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
   // paddingBottom: 6,
    //paddingLeft: 8
  },
  label: {
    color: "#000",
    fontSize: 13,
    fontWeight: "300",
    paddingBottom: 2
  },
  value: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
  },
  date: {
    color: "#000",
    fontSize: 20,
    fontWeight: "200",
    alignSelf: 'center',
    paddingTop: 2
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    top: - 8,
    left: - 8,
  },
  image: {
    height: 36,
    width: 36,
   // backgroundColor: "#000",
  },
});