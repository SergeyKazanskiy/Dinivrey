import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text} from 'react-native';
import { useStore } from '../../store';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '../../../../../shared/components/ScreenWrapper';
import { AchievesWidget } from '../widgets/AchievesWidget';
import { get_group_achieves } from '../../http';
import { Achieve } from '../../model';


export const AchievesReport = () => {
  const { isAchievesScreen, group_id } = useStore();
  const { hideAchievesScreen } = useStore();

  const [achieves, setAchieves] = useState<Achieve[]>([]);
  const [summary, setSummary] = useState(0);

  useFocusEffect(
    useCallback(() => {
      get_group_achieves(group_id, (achieves => {
        setAchieves(achieves);
        setSummary(achieves.reduce((sum, item) => sum + (item.count ?? 0), 0))
      }));
    }, [])
  );

  return (
    <ScreenWrapper visible={isAchievesScreen} title='Group Achievements' onClose={hideAchievesScreen}>
      <LinearGradient colors={['#2E4A7C', '#152B52']}>
        <View style={styles.container}>
          
          <AchievesWidget title='Test achievements' achieves={achieves} category='Test' />
          <AchievesWidget title='Game achievements' achieves={achieves} category='Game' />
          <AchievesWidget title='Participate achievements' achieves={achieves} category='Participate' />

          <Text style={styles.summary}>Total achievements: 
            <Text style={styles.text}>{summary}</Text>
          </Text>
        </View>  
      </LinearGradient>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  summary: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: 'medium',
    marginTop: 40, 
    textAlign: 'left',
  },
  text: {
    color: 'gold',
    fontSize: 20,
    fontWeight: 'medium',
    paddingLeft: 8
  },
});