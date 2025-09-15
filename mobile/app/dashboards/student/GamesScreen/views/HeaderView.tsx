import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { AvatarWrapper } from '../../components/AvatarWrapper';
import { ScoreBanner } from '../../components/ScoreBanner';
import { TeamPanel } from '../../components/TeamPanel';
import { useStore } from '../../store';
import { ImagesPath } from '../../../../shared/constants';
import { AchieveIcon } from '../../../../shared/components/AchieveIcon';


export const HeaderView = () => { 
  const { student, level, percent, levelColor, profile_achievement, group_name, average } = useStore();

  return (
    <View style={styles.container}>
      <AvatarWrapper
        avatar={{uri: `${ImagesPath}/avatars/${student.avatar}.png`}}
        level={level}
        percent={percent}
        levelColor={levelColor}
      />

      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text style={styles.name}>{student.first_name + ' ' + student.last_name}</Text>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>

          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <View style={{zIndex:100}}>
              <TeamPanel teamName={group_name} w={104} h={16}/>
            </View>
            
            <ScoreBanner average={average}/>
          </View>

          { profile_achievement ? 
            <AchieveIcon onClick={() => {}}
              size={60}
              image={profile_achievement.image}
              label={''}
              level={profile_achievement.level}
              effect={profile_achievement.effect}
              isGif={true}
            /> :
            <Image source={require("../../../../../assets/images/achievementTest.png")}
              style={{width: 63, height: 52, marginRight: 12}}
            />
          }
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#000",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 42,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 42,
    marginBottom: 12
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    paddingTop: 8,
    paddingBottom: 8,
  },
});
