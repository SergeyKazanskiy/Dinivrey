import { StyleSheet, FlatList, Platform, ScrollView } from 'react-native';
import { useStore } from '../../store';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '../../../../../shared/components/ScreenWrapper';
import { CoachCell } from '../cells/CoachCell';


export function CoachesScreen() {
  const { coaches, isCoachesView } = useStore();
  const { hideCoachesView, selectNewCoach } = useStore();

  return (
     <ScreenWrapper visible={isCoachesView} title='Select other coach' onClose={hideCoachesView}>
      <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
        <ScrollView>
          <FlatList data={coaches}
            renderItem={({ item }) =>
              <CoachCell
                first_name={item.first_name}
                last_name={item.last_name}
                camp_name={item.camp_name}
                onSelect={() => selectNewCoach(item.id)}
              />
            } style={styles.list}
          />
        </ScrollView>
      </LinearGradient>
      </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
  },
    list: {
    borderRadius: 10,
    padding: 12
  },
});