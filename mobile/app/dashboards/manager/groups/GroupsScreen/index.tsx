import { useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useStore } from '../store';
import { CampsView } from './views/CampsView';
import { GroupsView } from './views/GroupsView';
import { AddGroupAlert } from './alerts/AddGroupAlert';
import { LinearGradient } from 'expo-linear-gradient';


export default function GroupsScreen() {
  const {  } = useStore();
  const { loadCamps, updateGroup } = useStore();

  useEffect(() => {
    loadCamps();
  }, [updateGroup]);

  // useFocusEffect(
  //   useCallback(() => {
  //     loadCamps();
  //   }, [])
  // );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <AddGroupAlert/>
      
      <CampsView/>
      <GroupsView/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    padding: 16,
  },
});