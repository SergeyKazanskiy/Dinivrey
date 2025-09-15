import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AvatarWrapper } from '../../components/AvatarWrapper';
import { ExamBanner } from '../../components/ExamBanner';
import { ScoreBanner } from '../../components/ScoreBanner';
import { TeamPanel } from '../../components/TeamPanel';
import { useStore } from '../../store';
import { examColors, RuleTests } from '../../../../shared/constants';
import { TestFields } from '../../model';
import { ImagesPath } from '../../../../shared/constants';


export const HeaderView = () => { 
  const { student, last_test, level, percent, levelColor, group_name, currentExam } = useStore();
  const { average, selectTest } = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View style={{zIndex: 100}}>
          <AvatarWrapper
            avatar={{uri: `${ImagesPath}/avatars/${student.avatar}.png`}}
            level={level}
            percent={percent}
            levelColor={levelColor}
          />
        </View>
        <View style={{marginTop: -20, marginBottom: 10}}>
          <ScoreBanner average={average}/>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{student.first_name + ' ' + student.last_name}</Text>
        <TeamPanel w={152} teamName={group_name} fontS={14}/>

        <View style={styles.row}>
          {[last_test.speed, last_test.stamina, last_test.climbing, last_test.evasion, last_test.hiding].map((item, inx) => (
            <TouchableOpacity onPress={() => selectTest(TestFields[inx])}>
               <ExamBanner value={item?? 0} color={examColors[inx]} icon={RuleTests[inx]}
                isSelected={currentExam === TestFields[inx]}/>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#000",
    borderRadius: 60,
  },
  avatar: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 8
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    paddingBottom: 12
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
    gap: 6,
  },
});
