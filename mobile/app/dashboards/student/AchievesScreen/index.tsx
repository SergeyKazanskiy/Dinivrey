import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AchievesPanel } from './views/AchievesPanel';
import { useStore } from '../store';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderView } from './views/HeaderView';
import { CustomAlert } from './components/CustomAlert';
import { AchievesModal } from './components/AchievesModal';


export const AchievesScreen = () => {
  const { unlocked_achieves, locked_achieves, isAchievesModal, profile_place } = useStore();
  const { loadAchieves, selectAchieve, hideAchievesModal, selectPlace } = useStore();
  
  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadAchieves();
    }, [])
  );

  // function handleBackButton() {
  //   hideAchievesModal();
  //   router.back();
  // }

  function handleClickAchieve(id: number) {
    // if (isAchievesModal) {
    //   selectAchieve(id);
    //   router.back();
    // }
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >

      <CustomAlert visible={isAchievesModal} 
        title="Hall of fame"
        onClose={hideAchievesModal}>
        <AchievesModal
          profile_place ={profile_place}
          profileAchieves={unlocked_achieves}
          achieves={unlocked_achieves}
          onAchievement={selectAchieve}
          onPlace={selectPlace}
          />
      </CustomAlert>

      <ScrollView style={styles.container}>
        <HeaderView/>
        
        <View style={[{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20}, styles.line]}>
          <Text style={[styles.title]}>Unlocked</Text>
          <Ionicons name='lock-open' size={18} color="green" />
        </View>
        <AchievesPanel achieves={unlocked_achieves} onClick={handleClickAchieve}/>

        <View style={[{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 16}, styles.line]}>
          <Text style={[styles.title]}>Locked</Text>
          <Ionicons name='lock-closed' size={18} color="red" />
        </View>
         <AchievesPanel achieves={locked_achieves} onClick={()=>{}}/>
        
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
  },
  container: {
    flex: 1,
    paddingBottom: 48
  },
  title: {
    fontSize: 15,
    color: 'white',
    paddingRight: 8,
    paddingBottom: 2,
  },
  line: {
    width: '100%',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 8
  },
  summary: { 
    textAlign: 'center',   
    paddingTop: 80,
    //paddingBottom: 10
  },
});

export default AchievesScreen;