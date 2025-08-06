import { useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthState } from '../../shared/http/state';
import { useStore } from './store';
import { LinearGradient } from 'expo-linear-gradient';
import { DinivreyHeader } from '../../shared/components/DinivreyHeader';


export function DrawerHeader(props: any) {  
  const { logoutUser } = useAuthState();
  const { student } = useStore();

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <DinivreyHeader title='Welcome!'
        onExit={()=>(router.replace('/'), logoutUser('student'))}/>
      
      <Image style={[styles.image, {padding: 16}]}
          source={require('../../../assets/images/DinivreyCompany.png')} />
          
      <ScrollView style={styles.container}>
        <DrawerItemList {...props} />
      </ScrollView>
    </LinearGradient> 
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 16
  },
  image: { 
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '72%',
    height: '30%',
    paddingHorizontal: 16
  },
})
