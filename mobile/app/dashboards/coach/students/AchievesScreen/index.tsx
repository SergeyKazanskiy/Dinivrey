import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView, Text, Platform, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { screenStyles } from '../../../../shared/styles/appStyles';
import { AchievesSection } from './views/AchievesSection';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomNavbar } from '../../../../shared/components/CustomNavbar';
import { CustomAlert } from '../../../../shared/components/CustomAlert';


export const AchievesScreen = () => {
  const { achievement_id, student } = useStore();
  const { loadStudentAchieves, detachAchieve, setAchievesSummary } = useStore();
 // alert(student.summary_achievements + "fff")
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStudentAchieves();
    }, [])
  );

  const [isSummaryInput, setIsSummaryInput] = useState<boolean>(false);
  const [summaryText, setSummaryText] = useState<string>(student.summary_achievements);
  
  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Achievements' onClick={() => router.push("/dashboards/coach")}>
        <Ionicons name='trash-outline' size={20} color={achievement_id === 0 ? 'gray' :'#D1FF4D'}
          onPress={detachAchieve}
        />
      </CustomNavbar>

      <CustomAlert visible={isSummaryInput} 
        title="Summary for student!"
        buttonText='Save'
        handleYes={() => {setAchievesSummary(summaryText); setIsSummaryInput(false)}}
        onClose={() => setIsSummaryInput(false)}>
          <TextInput
              style={styles.dialogInput}
              onChangeText={setSummaryText}
              value={summaryText}
              placeholder="Enter summary"
              keyboardType='default'
          />
      </CustomAlert>

      <ScrollView style={styles.container}>
        <AchievesSection title='Test achievements' category='Test' />
        <AchievesSection title='Game achievements' category='Game' />
        <AchievesSection title='Participate achievements' category='Participate' />
      </ScrollView>
      
      <Text style={[screenStyles.gold, styles.summary]}
        onPress={() => setIsSummaryInput(true)}>
          {summaryText === '' ? 'Enter summary' : summaryText}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 8
  },
  summary: { 
    marginTop: 'auto', 
    textAlign: 'center',
    paddingBottom: 20
  },
  dialogInput: {
    fontSize: 15,
    padding: 8,
    backgroundColor: '#FFFACD',
  },
});

export default AchievesScreen;

