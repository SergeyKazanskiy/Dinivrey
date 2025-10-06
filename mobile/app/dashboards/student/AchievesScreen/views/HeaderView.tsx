import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import { AvatarWrapper } from '../../components/AvatarWrapper';
import { ExamBanner } from '../../components/ExamBanner';
import { ProgressBar } from '../../components/ProgressBar';
import { TeamPanel } from '../../components/TeamPanel';
import { useStore } from '../../store';
import { examColors, RuleTests } from '../../../../shared/constants';
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';
import { BACKEND_APP_IMAGES_URL } from '../../../../shared/constants';


export const HeaderView = () => { 
  const { student, profile_achievements, level, percent, levelColor, unlocked_achieves, locked_achieves } = useStore();
  const { showAchievesModal  } = useStore();

  const unlocked_length = unlocked_achieves.length;
  const all_achives_length = unlocked_achieves.length + locked_achieves.length;
  const precent = parseFloat((unlocked_length / all_achives_length).toFixed(2)) * 100

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <AvatarWrapper size={104}
          avatar={{uri: `${BACKEND_APP_IMAGES_URL}/avatars/${student.avatar}.png`}}
          level={level}
          percent={percent}
          levelColor={levelColor}
        />

        <View style={styles.info}>
          <Text style={styles.title}>Hall of fame</Text>
          <FlatList data={profile_achievements} horizontal
            keyExtractor={(achieve) => achieve.image}
            contentContainerStyle={{ justifyContent: 'space-between', marginTop: 4}}
            renderItem={({ item }) =>
              <AchieveIcon onClick={() => {}}
                  size={52}
                  image={item.image}
                  label={''}
                  level={item.level?? 0}
                  effect={item.effect}
                  isGif={true}
              />
            }
          />
        </View>

        <TouchableOpacity style={{paddingTop: 8, paddingRight: 8}} onPress={showAchievesModal}>
          <Image source={require("../../../../../assets/images/edit-contained.png")} />
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: 8, paddingBottom: 8, marginTop: -8, alignItems: 'center'}}>
        <Text style={styles.name}>Achievement Progress</Text>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.name}>{precent}%</Text>
          <Text style={styles.name}>{unlocked_length}/{all_achives_length}</Text>
          <Text style={styles.name}>Achievements</Text>
        </View>
        <ProgressBar percent={precent}/>
      </View>     
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "#000",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  info: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
    //paddingRight: 8,
  },
  image: {
    height: 38,
    width: 38,
    borderRadius: 19,
    marginTop: 4,
    marginLeft: 4
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  name: {
    color: "#ddd",
    fontSize: 16,
    fontWeight: "300",
    paddingBottom: 4
  },
  section: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    gap: 16,
  },
});
