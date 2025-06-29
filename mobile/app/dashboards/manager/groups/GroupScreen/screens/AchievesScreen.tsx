import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView} from 'react-native';
import { useStore } from '../../store';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '../../../../../shared/components/ScreenWrapper';
import { AchievesPanel } from '../widgets/AchievesPanel';
import { get_group_achieves } from '../../http';
import { Achievement } from '../../model';


export default function AchievesScreen() {
  const { isAchievesScreen, group_id } = useStore();
  const { hideAchievesScreen } = useStore();

  const [achieves, setAchieves] = useState<Achievement[]>([]);

  
  useFocusEffect(
    useCallback(() => {
      get_group_achieves(group_id, (achieves => {
        setAchieves(achieves);
      }));
    }, [])
  );

  return (
    <ScreenWrapper visible={isAchievesScreen} title='Achieves report' onClose={hideAchievesScreen}>
      <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
        <ScrollView style={styles.container}>

          <AchievesPanel title='Test achievements' achieves={achieves} category='Test' />
          <AchievesPanel title='Test achievements' achieves={achieves} category='Game' />
          <AchievesPanel title='Test achievements' achieves={achieves} category='Participate' />
        </ScrollView>  
      </LinearGradient>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    // alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    // maxWidth: Platform.OS === 'web' ? 360 : undefined,
    // width: '100%',
  },
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});