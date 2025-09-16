import React from "react";
import { StyleSheet, FlatList, Image, View, Text } from "react-native";
import { useStore } from '../../store';
import { LiderCell } from '../../../../shared/components/LiderCell';
import { ExamBanner2 } from '../../components/ExamBanner2';
import { examColors, RuleTests, ImagesPath } from '../../../../shared/constants';
import { ScoreBanner2 } from '../../components/ScoreBanner2';
import { objectToJson } from "@/app/shared/utils";
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';
import { getAttendanceLevel } from "../../ProfileScreen/state";


export const LidersView = () => {
  const { liders, query } = useStore();

  const filtered = liders.filter((lider) => {
      const fullName = `${lider.first_name} ${lider.last_name}`.toLowerCase();

      return (
        lider.first_name.toLowerCase().includes(query.toLowerCase()) ||
        lider.last_name.toLowerCase().includes(query.toLowerCase()) ||
        fullName.includes(query.toLowerCase())
      );
    });
  
  return (
    <FlatList data={filtered} contentContainerStyle={{paddingBottom: 32}}
      keyExtractor={(index) => index.toString()}
      renderItem={({ item, index }) => {
      const average=(item.speed + item.stamina + item.climbing + item.evasion + item.hiding) / 5
      const attandanceLevel = getAttendanceLevel(item.events_attended).level

      return (
        <View style={[styles.cell, styles.item]}>
          <View style={{flexDirection: "row"}}>
             <View style={{position: "relative"}}>
              <Image style={styles.image} source={{uri: `${ImagesPath}/avatars/${item.avatar}.png`}} />

              <View style={[styles.badgeWrapper, {position:'absolute'}]}>
                <Text style={[styles.badge]}>{attandanceLevel}</Text>
              </View>
             </View>
          
            <View style={{flexDirection: 'column', justifyContent: 'center', gap: 3}}>
              <Text style={styles.name}>{item.first_name}</Text> 
              <Text style={styles.name}>{item.last_name}</Text>               
            </View>
          </View>
          
          <View style={{flexDirection: "row", borderLeftWidth: 2, borderLeftColor: '#444'}}>
            { item.achieves.length > 0 ? 
              <AchieveIcon onClick={() => {}}
                size={38}
                image={item.achieves[0].image}
                label={''}
                level={item.achieves[0].level}
              /> :
              <Image source={require("../../../../../assets/images/achievementTest.png")}
                style={{width: 40, height: 38, marginHorizontal: 4, marginTop: 3}}
              />
            }

            <View style={styles.row}>
              {[item.speed, item.stamina, item.climbing, item.evasion, item.hiding].map((item, inx) => (
                <ExamBanner2 value={item?? 0} color={examColors[inx]} icon={RuleTests[inx]} />
              ))}
            </View>

            <ScoreBanner2 average={average}/>
          </View>
        </View>
      )}
    }/>
  );
};

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#000",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingRight: 4,
    paddingBottom:4,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ddd'
  },
  row: {
    flexDirection: "row",
    marginTop: 6,
    gap: 6,
    marginHorizontal: 4
  },
  image: {
    height: 38,
    width: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#D1FF4D',
    marginTop: 4,
    marginLeft: 4,
  },
  name: {
    color: "#fff",
    fontSize: 11,
    paddingHorizontal: 4
  },
  item: {
    marginVertical: 4
  },
  itemSelected: {
    marginVertical: 4,
    backgroundColor: "#555"
  },
  badgeWrapper: {
    height: 16,
    width: 16,
    backgroundColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center'
  },
  badge: {
    color: "#fff",
    fontSize: 8,
    alignSelf:'center',
  }
});


/*
  const renderItem = ({ student }) => { // filter
    if (searchPhrase === "") {
      return <LiderCell name={item.name} details={item.details} />;
    }
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.details} />;
    }
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Item name={item.name} details={item.details} />;
    }
  };
*/